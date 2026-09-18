import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const NOISE_GLSL = `
  vec3 mod289(vec3 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec2 mod289(vec2 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
`

const TERRAIN_VERTEX = `
  uniform float uTime;
  uniform float uAmplitude;
  varying float vElevation;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  ${NOISE_GLSL}

  float elevationAt(vec2 p) {
    float n1 = snoise(vec2(p.x * 0.14 + uTime * 0.14, p.y * 0.17 - uTime * 0.1));
    float n2 = snoise(vec2(p.x * 0.32 - uTime * 0.22, p.y * 0.3 + uTime * 0.18)) * 0.45;
    return (n1 + n2) * uAmplitude;
  }

  void main() {
    vec3 pos = position;
    float elevation = elevationAt(pos.xy);
    pos.z += elevation;

    float e = 0.5;
    float hL = elevationAt(pos.xy - vec2(e, 0.0));
    float hR = elevationAt(pos.xy + vec2(e, 0.0));
    float hD = elevationAt(pos.xy - vec2(0.0, e));
    float hU = elevationAt(pos.xy + vec2(0.0, e));
    vec3 tangent = normalize(vec3(2.0 * e, 0.0, hR - hL));
    vec3 bitangent = normalize(vec3(0.0, 2.0 * e, hU - hD));
    vec3 n = normalize(cross(tangent, bitangent));

    vElevation = elevation;
    vUv = uv;
    vNormal = normalize(normalMatrix * n);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const TERRAIN_FRAGMENT = `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uGlow;
  uniform float uOpacity;
  uniform float uTime;
  varying float vElevation;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewDir);
    float fresnel = pow(1.0 - clamp(dot(normal, viewDir), 0.0, 1.0), 2.2);
    float sheen = smoothstep(0.05, 0.65, vElevation);

    vec3 base = mix(uColorA, uColorB, clamp(vUv.y * 0.7 + vElevation * 0.35 + 0.15, 0.0, 1.0));
    vec3 color = base + uGlow * sheen * 0.9 + uGlow * fresnel * 0.7;

    float swell = 1.0 - smoothstep(0.0, 0.65, abs(fract(vUv.y - uTime * 0.06) - 0.5) * 2.0 - 0.1);
    color += uGlow * swell * 0.4;

    float edgeFade = smoothstep(0.0, 0.22, vUv.y) * smoothstep(1.0, 0.72, vUv.y);
    float alpha = (0.32 + sheen * 0.4 + fresnel * 0.35 + swell * 0.2) * uOpacity * edgeFade;

    gl_FragColor = vec4(color, alpha);
  }
`

const PARTICLE_VERTEX = `
  uniform float uTime;
  attribute float aPhase;
  attribute float aSize;
  varying float vTwinkle;

  void main() {
    vec3 pos = position;
    pos.y += sin(uTime * 0.3 + aPhase) * 0.35;
    pos.x += cos(uTime * 0.18 + aPhase) * 0.2;
    vTwinkle = 0.4 + 0.6 * (0.5 + 0.5 * sin(uTime * 1.6 + aPhase * 2.0));
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (80.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const PARTICLE_FRAGMENT = `
  uniform vec3 uColor;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.0, d) * vTwinkle;
    gl_FragColor = vec4(uColor, alpha * 0.85);
  }
`

function lighten(hex, amt) {
  const c = new THREE.Color(hex)
  const white = new THREE.Color(0xffffff)
  return c.lerp(white, amt)
}

export default function WaveBackground({
  colorA = '#319c3a',
  colorB = '#5ed66e',
  opacity = 0.55,
  speed = 1,
  amplitude = 0.5,
  tilt = 0.62,
  particles = 70,
  className = '',
}) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 60)
    const basePos = new THREE.Vector3(0, 2.6, 6.4)
    camera.position.copy(basePos)
    camera.lookAt(0, -0.3, -2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const width = 30
    const depth = 16
    const geometry = new THREE.PlaneGeometry(width, depth, 90, 48)

    const near = new THREE.Color(colorA)
    const far = new THREE.Color(colorB)
    const glow = lighten(colorB, 0.55)

    const terrainMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorA: { value: near },
        uColorB: { value: far },
        uGlow: { value: glow },
        uOpacity: { value: opacity },
      },
      vertexShader: TERRAIN_VERTEX,
      fragmentShader: TERRAIN_FRAGMENT,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    })
    const terrain = new THREE.Mesh(geometry, terrainMat)

    const particleCount = particles
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const phases = new Float32Array(particleCount)
    const sizes = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * width * 0.9
      positions[i * 3 + 1] = Math.random() * 3.2 - 0.3
      positions[i * 3 + 2] = (Math.random() - 0.5) * depth
      phases[i] = Math.random() * Math.PI * 2
      sizes[i] = Math.random() * 1.6 + 0.5
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
    particleGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

    const particleMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: glow },
      },
      vertexShader: PARTICLE_VERTEX,
      fragmentShader: PARTICLE_FRAGMENT,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const points = new THREE.Points(particleGeo, particleMat)

    const group = new THREE.Group()
    group.add(terrain, points)
    group.rotation.x = -Math.PI / 2 + tilt
    group.position.set(0, -2.1, -2.4)
    scene.add(group)

    scene.fog = new THREE.Fog(0x07070a, 4, 12)

    const pointer = { x: 0, y: 0 }
    const targetPointer = { x: 0, y: 0 }
    const onPointerMove = (e) => {
      const rect = mount.getBoundingClientRect()
      if (e.clientY < rect.top - 200 || e.clientY > rect.bottom + 200) return
      targetPointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      targetPointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    }
    window.addEventListener('pointermove', onPointerMove)

    const clock = new THREE.Clock()
    let frameId = null
    let visible = true

    const renderFrame = () => {
      const t = clock.getElapsedTime() * speed
      if (!reduceMotion) {
        terrainMat.uniforms.uTime.value = t
        particleMat.uniforms.uTime.value = t

        pointer.x += (targetPointer.x - pointer.x) * 0.04
        pointer.y += (targetPointer.y - pointer.y) * 0.04
        camera.position.x = basePos.x + pointer.x * 0.7
        camera.position.y = basePos.y - pointer.y * 0.35
        camera.lookAt(0, -0.3, -2)
        group.rotation.z = pointer.x * 0.03

        const hue = (Math.sin(t * 0.07) + 1) * 0.5
        terrainMat.uniforms.uColorA.value.copy(near).lerp(far, hue * 0.25)
      }
      renderer.render(scene, camera)
    }

    const loop = () => {
      if (!visible) return
      renderFrame()
      frameId = requestAnimationFrame(loop)
    }

    renderFrame()
    if (!reduceMotion) frameId = requestAnimationFrame(loop)

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        visible = entry.isIntersecting
        if (visible && !reduceMotion && frameId === null) {
          frameId = requestAnimationFrame(loop)
        } else if (!visible && frameId !== null) {
          cancelAnimationFrame(frameId)
          frameId = null
        }
      },
      { rootMargin: '200px 0px' }
    )
    observer.observe(mount)

    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
      observer.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      geometry.dispose()
      terrainMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [colorA, colorB, opacity, speed, amplitude, tilt, particles])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  )
}
