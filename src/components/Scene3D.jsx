import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'

/* =============================================================================
   HERO 3D — a stylised plumbing system:
   glass pipes with water flowing through them, chrome elbows & couplings,
   a red gate-valve handwheel, a pressure gauge, a copper hot-water line and a
   tap dripping into ripples. Scrolling "opens the valve": the wheel turns,
   water flows faster and the gauge needle rises.
   ========================================================================== */

const PIPE_R = 0.16
const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// shared, mutable animation state (read inside useFrame — no React re-renders)
const anim = { scroll: 0, intro: reduceMotion ? 1 : 0 }

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smooth = (a, b, v) => {
  const t = clamp01((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}

/* ---- geometry helpers ------------------------------------------------- */

// Polyline with rounded (elbow) corners -> CurvePath
function roundedPath(points, radius) {
  const v = points.map((p) => new THREE.Vector3(...p))
  const path = new THREE.CurvePath()
  let current = v[0].clone()
  for (let i = 1; i < v.length - 1; i++) {
    const prev = v[i - 1]
    const corner = v[i]
    const next = v[i + 1]
    const dirIn = corner.clone().sub(prev).normalize()
    const dirOut = next.clone().sub(corner).normalize()
    const r = Math.min(radius, corner.distanceTo(prev) / 2, corner.distanceTo(next) / 2)
    const a = corner.clone().addScaledVector(dirIn, -r)
    const b = corner.clone().addScaledVector(dirOut, r)
    if (current.distanceTo(a) > 1e-4) path.add(new THREE.LineCurve3(current, a))
    path.add(new THREE.QuadraticBezierCurve3(a, corner.clone(), b))
    current = b
  }
  path.add(new THREE.LineCurve3(current, v[v.length - 1]))
  return path
}

const UP = new THREE.Vector3(0, 1, 0)
function quatAlong(dir) {
  return new THREE.Quaternion().setFromUnitVectors(UP, dir.clone().normalize())
}

function makeFlowTexture() {
  const c = document.createElement('canvas')
  c.width = 256
  c.height = 8
  const g = c.getContext('2d')
  const grd = g.createLinearGradient(0, 0, 256, 0)
  grd.addColorStop(0, 'rgba(20,120,255,0.15)')
  grd.addColorStop(0.4, 'rgba(60,190,255,0.85)')
  grd.addColorStop(0.55, 'rgba(230,250,255,1)')
  grd.addColorStop(0.7, 'rgba(60,190,255,0.85)')
  grd.addColorStop(1, 'rgba(20,120,255,0.15)')
  g.fillStyle = grd
  g.fillRect(0, 0, 256, 8)
  const t = new THREE.CanvasTexture(c)
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function makeGaugeTexture() {
  const s = 256
  const c = document.createElement('canvas')
  c.width = c.height = s
  const g = c.getContext('2d')
  const cx = s / 2
  g.fillStyle = '#f4f8fb'
  g.beginPath(); g.arc(cx, cx, cx, 0, Math.PI * 2); g.fill()
  // coloured arcs: green -> amber -> red
  const arc = (from, to, col) => {
    g.strokeStyle = col; g.lineWidth = 14
    g.beginPath(); g.arc(cx, cx, cx - 26, from, to); g.stroke()
  }
  const start = Math.PI * 0.75
  const span = Math.PI * 1.5
  arc(start, start + span * 0.6, '#2bb673')
  arc(start + span * 0.6, start + span * 0.82, '#f5a623')
  arc(start + span * 0.82, start + span, '#e63946')
  // ticks
  g.strokeStyle = '#1b2a3a'
  for (let i = 0; i <= 20; i++) {
    const a = start + (span * i) / 20
    const long = i % 5 === 0
    const r1 = cx - 40
    const r2 = r1 - (long ? 20 : 10)
    g.lineWidth = long ? 4 : 2
    g.beginPath()
    g.moveTo(cx + Math.cos(a) * r1, cx + Math.sin(a) * r1)
    g.lineTo(cx + Math.cos(a) * r2, cx + Math.sin(a) * r2)
    g.stroke()
  }
  g.fillStyle = '#1b2a3a'
  g.font = 'bold 26px Inter, Arial, sans-serif'
  g.textAlign = 'center'
  g.fillText('PSI', cx, cx + 62)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

/* ---- materials -------------------------------------------------------- */
function useMaterials() {
  return useMemo(
    () => ({
      chrome: new THREE.MeshStandardMaterial({ color: '#dfe8f1', metalness: 1, roughness: 0.16 }),
      darkChrome: new THREE.MeshStandardMaterial({ color: '#9fb0c2', metalness: 1, roughness: 0.3 }),
      copper: new THREE.MeshStandardMaterial({ color: '#c8784a', metalness: 1, roughness: 0.26 }),
      copperDark: new THREE.MeshStandardMaterial({ color: '#9a5634', metalness: 1, roughness: 0.32 }),
      glass: new THREE.MeshPhysicalMaterial({
        color: '#d8f2ff', metalness: 0, roughness: 0.04, transparent: true,
        opacity: 0.2, clearcoat: 1, clearcoatRoughness: 0.05, depthWrite: false,
      }),
      waterBase: new THREE.MeshStandardMaterial({
        color: '#0a84ff', emissive: '#0b5fb0', emissiveIntensity: 0.6,
        transparent: true, opacity: 0.45, depthWrite: false,
      }),
      red: new THREE.MeshStandardMaterial({ color: '#e63946', metalness: 0.3, roughness: 0.35 }),
      drop: new THREE.MeshStandardMaterial({
        color: '#8fe0ff', emissive: '#27b8ff', emissiveIntensity: 0.6, metalness: 0.2, roughness: 0.05,
      }),
    }),
    []
  )
}

/* ---- a coupling / short fitting oriented along a direction ------------ */
function Fitting({ position, dir, radius, length, material, segments = 24 }) {
  const q = useMemo(() => quatAlong(dir), [dir])
  return (
    <mesh position={position} quaternion={q} material={material}>
      <cylinderGeometry args={[radius, radius, length, segments]} />
    </mesh>
  )
}

/* ---- a full pipe run: tube + elbows + couplings, drawn in on intro ---- */
function PipeRun({ points, kind, range: [w0, w1], mats }) {
  const path = useMemo(() => roundedPath(points, 0.42), [points])
  const L = useMemo(() => path.getLength(), [path])
  const segs = Math.max(80, Math.round(L * 40))

  const outerGeo = useMemo(
    () => new THREE.TubeGeometry(path, segs, PIPE_R, 24, false),
    [path, segs]
  )
  const waterGeo = useMemo(
    () => (kind === 'glass' ? new THREE.TubeGeometry(path, segs, PIPE_R * 0.6, 14, false) : null),
    [path, segs, kind]
  )
  const flowGeo = useMemo(
    () => (kind === 'glass' ? new THREE.TubeGeometry(path, segs, PIPE_R * 0.66, 14, false) : null),
    [path, segs, kind]
  )
  const flowTex = useMemo(() => {
    if (kind !== 'glass') return null
    const t = makeFlowTexture()
    t.repeat.set(L / 1.1, 1)
    return t
  }, [kind, L])
  const flowMat = useMemo(
    () =>
      flowTex
        ? new THREE.MeshBasicMaterial({
            map: flowTex, transparent: true, depthWrite: false,
            blending: THREE.AdditiveBlending, color: '#bfeaff',
          })
        : null,
    [flowTex]
  )

  // fittings: elbows over every bend, couplings on long straights + ends
  const fittings = useMemo(() => {
    const cum = path.getCurveLengths()
    const list = []
    path.curves.forEach((c, i) => {
      const endFrac = cum[i] / L
      const startFrac = (cum[i] - c.getLength()) / L
      if (c.isQuadraticBezierCurve3) {
        list.push({ type: 'elbow', curve: c, frac: endFrac })
        // collars at both ends of the elbow
        list.push({ type: 'collar', pos: c.v0, dir: c.v1.clone().sub(c.v0), frac: startFrac })
        list.push({ type: 'collar', pos: c.v2, dir: c.v2.clone().sub(c.v1), frac: endFrac })
      } else if (c.getLength() > 1.4) {
        const mid = c.getPoint(0.5)
        list.push({ type: 'coupling', pos: mid, dir: c.v2.clone().sub(c.v1), frac: (startFrac + endFrac) / 2 })
      }
    })
    const endT = path.getTangentAt(1)
    list.push({ type: 'nozzle', pos: path.getPointAt(1), dir: endT, frac: 1 })
    return list.map((f) =>
      f.type === 'elbow'
        ? { ...f, geo: new THREE.TubeGeometry(f.curve, 20, PIPE_R * 1.22, 24, false) }
        : f
    )
  }, [path, L])

  const refs = useRef([])
  const outerMat = kind === 'glass' ? mats.glass : mats.copper
  const fitMat = kind === 'glass' ? mats.chrome : mats.copperDark

  useFrame((_, dt) => {
    const frac = smooth(w0, w1, anim.intro)
    const setRange = (geo) => {
      if (!geo) return
      const n = geo.index.count
      geo.setDrawRange(0, Math.floor((frac * n) / 6) * 6)
    }
    setRange(outerGeo)
    setRange(waterGeo)
    setRange(flowGeo)
    refs.current.forEach((m, i) => {
      if (m) m.visible = frac >= fittings[i].frac - 0.001
    })
    if (flowTex) {
      const speed = reduceMotion ? 0.12 : 0.35 + anim.scroll * 1.8
      flowTex.offset.x -= Math.min(dt, 0.05) * speed
    }
  })

  return (
    <group>
      <mesh geometry={outerGeo} material={outerMat} renderOrder={2} />
      {waterGeo && <mesh geometry={waterGeo} material={mats.waterBase} renderOrder={1} />}
      {flowGeo && <mesh geometry={flowGeo} material={flowMat} renderOrder={1} />}
      {fittings.map((f, i) => {
        const setRef = (m) => (refs.current[i] = m)
        if (f.type === 'elbow') {
          return <mesh key={i} ref={setRef} geometry={f.geo} material={fitMat} />
        }
        const dims = {
          collar: [PIPE_R * 1.32, 0.09],
          coupling: [PIPE_R * 1.3, 0.26],
          nozzle: [PIPE_R * 1.18, 0.16],
        }[f.type]
        return (
          <group key={i} ref={setRef}>
            <Fitting position={f.pos} dir={f.dir} radius={dims[0]} length={dims[1]} material={fitMat} />
          </group>
        )
      })}
    </group>
  )
}

/* ---- gate valve with red handwheel ----------------------------------- */
function Valve({ position, mats }) {
  const root = useRef()
  const wheel = useRef()
  useFrame((state) => {
    const s = smooth(0.62, 0.85, anim.intro)
    if (root.current) root.current.scale.setScalar(Math.max(0.0001, s))
    if (wheel.current) {
      wheel.current.rotation.y =
        anim.scroll * Math.PI * 3 + (reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.6) * 0.06)
    }
  })
  const X = new THREE.Vector3(1, 0, 0)
  return (
    <group position={position} ref={root}>
      {/* body */}
      <Fitting position={[0, 0, 0]} dir={X} radius={PIPE_R * 1.7} length={0.52} material={mats.chrome} />
      <Fitting position={[-0.3, 0, 0]} dir={X} radius={PIPE_R * 1.45} length={0.12} material={mats.darkChrome} segments={6} />
      <Fitting position={[0.3, 0, 0]} dir={X} radius={PIPE_R * 1.45} length={0.12} material={mats.darkChrome} segments={6} />
      {/* bonnet + stem */}
      <mesh position={[0, 0.3, 0]} material={mats.chrome}>
        <cylinderGeometry args={[0.13, 0.19, 0.26, 24]} />
      </mesh>
      <mesh position={[0, 0.55, 0]} material={mats.darkChrome}>
        <cylinderGeometry args={[0.04, 0.04, 0.34, 12]} />
      </mesh>
      {/* handwheel */}
      <group ref={wheel} position={[0, 0.72, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.red}>
          <torusGeometry args={[0.34, 0.05, 16, 48]} />
        </mesh>
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 4, 0]} material={mats.red}>
            <boxGeometry args={[0.66, 0.04, 0.05]} />
          </mesh>
        ))}
        <mesh material={mats.red}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 20]} />
        </mesh>
      </group>
    </group>
  )
}

/* ---- pressure gauge -------------------------------------------------- */
function Gauge({ position, mats }) {
  const root = useRef()
  const needle = useRef()
  const faceTex = useMemo(() => makeGaugeTexture(), [])
  useFrame((state) => {
    const s = smooth(0.7, 0.92, anim.intro)
    if (root.current) root.current.scale.setScalar(Math.max(0.0001, s))
    if (needle.current) {
      const level = 0.25 + anim.scroll * 0.6
      const wobble = reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * 7) * 0.015
      // 0 -> 135deg (left), 1 -> -135deg (right)
      needle.current.rotation.z = Math.PI * 0.75 - (level + wobble) * Math.PI * 1.5
    }
  })
  return (
    <group position={position} ref={root}>
      <mesh position={[0, 0.22, 0]} material={mats.darkChrome}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 12]} />
      </mesh>
      <group position={[0, 0.66, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.chrome}>
          <cylinderGeometry args={[0.34, 0.34, 0.14, 40]} />
        </mesh>
        <mesh position={[0, 0, 0.071]}>
          <circleGeometry args={[0.29, 48]} />
          <meshStandardMaterial map={faceTex} roughness={0.5} />
        </mesh>
        <group ref={needle} position={[0, 0, 0.08]}>
          <mesh position={[0.11, 0, 0]} material={mats.red}>
            <boxGeometry args={[0.22, 0.018, 0.01]} />
          </mesh>
          <mesh material={mats.darkChrome}>
            <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

/* ---- tap drips + ripples --------------------------------------------- */
function Drips({ origin, floorY, mats }) {
  const drops = useRef([])
  const ripples = useRef([])
  const st = useMemo(
    () => Array.from({ length: 3 }, (_, i) => ({ y: origin[1], v: 0, delay: 0.4 + i * 0.6 })),
    [origin]
  )
  const rip = useMemo(() => Array.from({ length: 3 }, () => ({ t: 1 })), [])

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.05)
    const on = anim.intro >= 0.95 && !reduceMotion
    st.forEach((d, i) => {
      const m = drops.current[i]
      if (!m) return
      if (!on || d.delay > 0) {
        if (on) d.delay -= dt
        m.visible = false
        return
      }
      m.visible = true
      d.v += 5.5 * dt
      d.y -= d.v * dt
      if (d.y <= floorY) {
        rip[i].t = 0
        d.y = origin[1]
        d.v = 0
        d.delay = Math.max(0.15, 1.1 - anim.scroll * 0.9) + Math.random() * 0.4
      }
      const stretch = 1 + Math.min(d.v * 0.12, 0.8)
      m.position.set(origin[0], d.y, origin[2])
      m.scale.set(0.065, 0.065 * stretch, 0.065)
    })
    rip.forEach((r, i) => {
      const m = ripples.current[i]
      if (!m) return
      r.t = Math.min(1, r.t + dt * 0.8)
      const s = 0.12 + r.t * 0.9
      m.scale.set(s, s, s)
      m.material.opacity = (1 - r.t) * 0.85
      m.visible = r.t < 1
    })
  })

  return (
    <group>
      {st.map((_, i) => (
        <mesh key={i} ref={(m) => (drops.current[i] = m)} material={mats.drop} visible={false}>
          <sphereGeometry args={[1, 20, 20]} />
        </mesh>
      ))}
      {rip.map((_, i) => (
        <mesh
          key={i}
          ref={(m) => (ripples.current[i] = m)}
          position={[origin[0], floorY, origin[2]]}
          rotation={[-Math.PI / 2, 0, 0]}
          visible={false}
        >
          <ringGeometry args={[0.92, 1, 64]} />
          <meshBasicMaterial color="#7fdcff" transparent opacity={0} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

/* ---- ambient bubbles -------------------------------------------------- */
function Bubbles({ count = 160 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 18
      a[i * 3 + 1] = (Math.random() - 0.5) * 12
      a[i * 3 + 2] = -2 - Math.random() * 6
    }
    return a
  }, [count])
  useFrame((_, dt) => {
    if (!ref.current || reduceMotion) return
    const p = ref.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      let y = p.getY(i) + dt * 0.18
      if (y > 6) y = -6
      p.setY(i, y)
    }
    p.needsUpdate = true
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#8fe0ff" transparent opacity={0.5} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

function ShowAfter({ at, children }) {
  const ref = useRef()
  useFrame(() => {
    if (ref.current) ref.current.visible = anim.intro >= at
  })
  return <group ref={ref} visible={false}>{children}</group>
}

/* ---- the whole plumbing assembly ------------------------------------- */
const COLD_MAIN = [
  [-2.6, -3.6, 0],
  [-2.6, 0.2, 0],
  [0.95, 0.2, 0],
  [0.95, 1.3, 0],
  [2.05, 1.3, 0],
  [2.05, 0.85, 0],
]
const HOT_LINE = [
  [6.5, -0.85, -0.75],
  [-1.7, -0.85, -0.75],
  [-1.7, -4.2, -0.75],
]
const BRANCH = [
  [-0.2, 0.2, 0],
  [-0.2, -1.45, 0],
  [0.55, -1.45, 0],
]
const TAP_TIP = [2.05, 0.74, 0]
const FLOOR_Y = -2.2

function Assembly() {
  const group = useRef()
  const mats = useMaterials()
  const size = useThree((s) => s.size)
  const viewport = useThree((s) => s.viewport)
  const mobile = size.width <= 760 // matches the CSS mobile breakpoint

  // mobile: canvas is a band at the top of the hero; desktop: right-hand side
  const layout = mobile
    ? { x: 0.3, y: 0.3, s: 0.8 }
    : { x: Math.min(viewport.width * 0.27, 3.0), y: 0.15, s: 0.78 }

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!reduceMotion) anim.intro = clamp01((t - 0.8) / 2.4)
    const g = group.current
    if (!g) return
    const p = anim.scroll
    const targetRotY = -0.38 + p * 0.55 + state.pointer.x * 0.08
    const targetRotX = 0.06 - state.pointer.y * 0.05 + p * 0.1
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRotY, 0.06)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetRotX, 0.06)
    g.position.x = layout.x
    g.position.y = THREE.MathUtils.lerp(
      g.position.y,
      layout.y + p * 1.4 + (reduceMotion ? 0 : Math.sin(t * 0.6) * 0.05),
      0.08
    )
    g.scale.setScalar(layout.s * (0.92 + 0.08 * smooth(0, 1, anim.intro)))
  })

  return (
    <group ref={group} rotation={[0.06, -0.38, 0]}>
      <PipeRun points={HOT_LINE} kind="copper" range={[0.0, 0.55]} mats={mats} />
      <PipeRun points={COLD_MAIN} kind="glass" range={[0.08, 0.8]} mats={mats} />
      <PipeRun points={BRANCH} kind="glass" range={[0.4, 0.75]} mats={mats} />
      {/* tee fitting where the branch leaves the main */}
      <ShowAfter at={0.4}>
        <Fitting position={[-0.2, 0.2, 0]} dir={new THREE.Vector3(1, 0, 0)} radius={PIPE_R * 1.32} length={0.36} material={mats.chrome} />
      </ShowAfter>
      <Valve position={[-1.35, 0.2, 0]} mats={mats} />
      <Gauge position={[0.45, 0.2, 0]} mats={mats} />
      <Drips origin={TAP_TIP} floorY={FLOOR_Y} mats={mats} />
    </group>
  )
}

function ScrollSync() {
  useEffect(() => {
    const on = () => {
      anim.scroll = clamp01(window.scrollY / (window.innerHeight * 0.9))
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return null
}

export default function Scene3D() {
  return (
    <div className="hero-canvas">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 9], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#05101f']} />
        <fog attach="fog" args={['#05101f', 10, 22]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} color="#e6f5ff" />
        <pointLight position={[-5, -1, 3]} intensity={18} distance={14} color="#0a84ff" />
        <pointLight position={[5, 3, 2]} intensity={14} distance={14} color="#5fd3ff" />

        <Suspense fallback={null}>
          <Assembly />
          <Bubbles />
          {/* Procedural environment for chrome/copper reflections — no network fetch */}
          <Environment resolution={256}>
            <Lightformer intensity={2.4} color="#ffffff" position={[0, 5, -6]} scale={[14, 4, 1]} />
            <Lightformer intensity={1.6} color="#0a84ff" position={[-7, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 8, 1]} />
            <Lightformer intensity={1.8} color="#9be4ff" position={[7, 1, 2]} rotation-y={-Math.PI / 2} scale={[8, 8, 1]} />
            <Lightformer intensity={0.8} color="#ffd9b8" position={[0, -5, 3]} rotation-x={-Math.PI / 2} scale={[12, 4, 1]} />
          </Environment>
        </Suspense>

        <ScrollSync />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}
