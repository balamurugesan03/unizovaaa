import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function WaveBackground({
  colorA = '#319c3a',
  colorB = '#5ed66e',
  opacity = 0.55,
  fillOpacity = 0.05,
  speed = 1,
  amplitude = 0.55,
  tilt = 0.62,
  className = '',
}) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 60)
    camera.position.set(0, 2.4, 6.2)
    camera.lookAt(0, -0.3, -2)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const width = 28
    const depth = 15
    const segX = 46
    const segY = 24

    const geometry = new THREE.PlaneGeometry(width, depth, segX, segY)
    const posAttr = geometry.attributes.position
    const baseX = new Float32Array(posAttr.count)
    const baseY = new Float32Array(posAttr.count)
    for (let i = 0; i < posAttr.count; i++) {
      baseX[i] = posAttr.getX(i)
      baseY[i] = posAttr.getY(i)
    }

    const near = new THREE.Color(colorA)
    const far = new THREE.Color(colorB)
    const colorArray = new Float32Array(posAttr.count * 3)
    geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))
    const colorAttr = geometry.attributes.color

    const halfDepth = depth / 2
    for (let i = 0; i < posAttr.count; i++) {
      const t = (baseY[i] + halfDepth) / depth
      const c = near.clone().lerp(far, t)
      colorAttr.setXYZ(i, c.r, c.g, c.b)
    }
    colorAttr.needsUpdate = true

    const wireMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const wireMesh = new THREE.Mesh(geometry, wireMat)

    const fillMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: fillOpacity,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const fillMesh = new THREE.Mesh(geometry, fillMat)
    fillMesh.renderOrder = -1

    const group = new THREE.Group()
    group.add(fillMesh, wireMesh)
    group.rotation.x = -Math.PI / 2 + tilt
    group.position.set(0, -2.1, -2.4)
    scene.add(group)

    scene.fog = new THREE.Fog(0x07070a, 4, 11)

    const waveAt = (x, y, t) =>
      Math.sin(x * 0.55 + t) * amplitude * 0.6 +
      Math.cos(y * 0.7 - t * 0.8) * amplitude * 0.4 +
      Math.sin((x + y) * 0.35 + t * 1.3) * amplitude * 0.3

    const clock = new THREE.Clock()
    let frameId = null
    let visible = true

    const renderFrame = () => {
      const t = clock.getElapsedTime() * speed
      if (!reduceMotion) {
        for (let i = 0; i < posAttr.count; i++) {
          posAttr.setZ(i, waveAt(baseX[i], baseY[i], t))
        }
        posAttr.needsUpdate = true
        geometry.computeVertexNormals()
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
      geometry.dispose()
      wireMat.dispose()
      fillMat.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [colorA, colorB, opacity, fillOpacity, speed, amplitude, tilt])

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  )
}
