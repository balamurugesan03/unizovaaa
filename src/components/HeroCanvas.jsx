import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function buildULogoGeometry() {
  const outerHalf = 1.3
  const innerHalf = 0.6
  const topY = 1.7
  const archCenterY = -0.5
  const outerRadius = outerHalf
  const innerRadius = innerHalf

  const shape = new THREE.Shape()
  shape.moveTo(-outerHalf, topY)
  shape.lineTo(-outerHalf, archCenterY)
  shape.absarc(0, archCenterY, outerRadius, Math.PI, Math.PI * 2, false)
  shape.lineTo(outerHalf, topY)
  shape.lineTo(innerHalf, topY)
  shape.lineTo(innerHalf, archCenterY)
  shape.absarc(0, archCenterY, innerRadius, 0, Math.PI, true)
  shape.lineTo(-innerHalf, topY)
  shape.closePath()

  const depth = 0.55
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.04,
    bevelSegments: 2,
    curveSegments: 24,
  })

  const bottomExtent = archCenterY - outerRadius
  const centerY = (topY + bottomExtent) / 2
  geometry.translate(0, -centerY, -depth / 2)

  return geometry
}

export default function HeroCanvas() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const COUNT = 1600
    const positions = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      const r = 6.4 * Math.cbrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x3ecb4a,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(geometry, material)

    const coreGeo = buildULogoGeometry()
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x5ed66e,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)

    const fillMat = new THREE.MeshBasicMaterial({
      color: 0x319c3a,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    })
    const fill = new THREE.Mesh(coreGeo, fillMat)
    core.add(fill)

    core.rotation.x = -0.15

    const group = new THREE.Group()
    group.add(points, core)
    scene.add(group)

    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    let frameId
    const clock = new THREE.Clock()
    const animate = () => {
      const t = clock.getElapsedTime()
      group.rotation.y += (mouse.x * 0.4 + t * 0.05 - group.rotation.y) * 0.04
      group.rotation.x += (mouse.y * 0.25 - group.rotation.x) * 0.04
      core.rotation.y -= 0.0016
      core.rotation.x += 0.001
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      geometry.dispose()
      material.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      fillMat.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" />
}
