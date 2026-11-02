import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  Sphere,
  Environment,
  Lightformer,
  AdaptiveDpr,
} from '@react-three/drei'
import * as THREE from 'three'

/* ---- Main water blob -------------------------------------------------- */
function WaterBlob() {
  const mesh = useRef()
  const mat = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const scroll = window.scrollY || 0
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.14 + scroll * 0.0012
      mesh.current.rotation.z = Math.sin(t * 0.2) * 0.12
      // subtle pointer parallax
      mesh.current.position.x = THREE.MathUtils.lerp(
        mesh.current.position.x,
        state.pointer.x * 0.4,
        0.04
      )
      mesh.current.position.y = THREE.MathUtils.lerp(
        mesh.current.position.y,
        state.pointer.y * 0.3 - scroll * 0.0016,
        0.04
      )
    }
    if (mat.current) {
      mat.current.distort = 0.38 + Math.sin(t * 0.8) * 0.06
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
      <mesh ref={mesh} scale={2.15}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          ref={mat}
          color="#1399ff"
          emissive="#0a3a66"
          emissiveIntensity={0.55}
          roughness={0.08}
          metalness={0.65}
          clearcoat={1}
          distort={0.4}
          speed={1.8}
        />
      </mesh>
    </Float>
  )
}

/* ---- Floating droplets ------------------------------------------------ */
function Droplets() {
  const group = useRef()
  const drops = useMemo(
    () =>
      Array.from({ length: 9 }).map(() => ({
        pos: [
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4 - 1,
        ],
        scale: 0.14 + Math.random() * 0.3,
        speed: 0.5 + Math.random(),
      })),
    []
  )

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = t * 0.05
      group.current.children.forEach((c, i) => {
        c.position.y += Math.sin(t * drops[i].speed + i) * 0.003
      })
    }
  })

  return (
    <group ref={group}>
      {drops.map((d, i) => (
        <Float key={i} speed={d.speed * 2} floatIntensity={1.4} rotationIntensity={0.6}>
          <Sphere args={[1, 24, 24]} position={d.pos} scale={d.scale}>
            <meshStandardMaterial
              color="#5fd3ff"
              emissive="#27b8ff"
              emissiveIntensity={0.4}
              roughness={0.1}
              metalness={0.6}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

/* ---- Particle field --------------------------------------------------- */
function Particles({ count = 420 }) {
  const points = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (points.current) {
      points.current.rotation.y = t * 0.02
      points.current.rotation.x = Math.sin(t * 0.1) * 0.05
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#8fe0ff"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ---- Camera gentle drift --------------------------------------------- */
function Rig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.6,
      0.03
    )
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.4,
      0.03
    )
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene3D() {
  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#05101f']} />
      <fog attach="fog" args={['#05101f', 7, 16]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 4]} intensity={1.6} color="#bfe8ff" />
      <pointLight position={[-6, -2, 2]} intensity={2.2} color="#0a84ff" />
      <pointLight position={[4, 3, -3]} intensity={1.8} color="#5fd3ff" />
      <spotLight position={[0, 8, 3]} angle={0.5} penumbra={1} intensity={1.2} color="#27b8ff" />

      <Suspense fallback={null}>
        <WaterBlob />
        <Droplets />
        <Particles />
        {/* Procedural environment — generated in-scene, no network fetch */}
        <Environment resolution={256}>
          <Lightformer intensity={2.2} color="#bfe8ff" position={[0, 4, -6]} scale={[12, 6, 1]} />
          <Lightformer intensity={1.6} color="#0a84ff" position={[-6, 1, 2]} scale={[6, 8, 1]} />
          <Lightformer intensity={1.8} color="#5fd3ff" position={[6, -2, 2]} scale={[6, 8, 1]} />
          <Lightformer intensity={1} color="#ffffff" position={[0, -5, 2]} scale={[12, 4, 1]} />
        </Environment>
      </Suspense>

      <Rig />
      <AdaptiveDpr pixelated />
    </Canvas>
  )
}
