import { PointMaterial, Points } from "@react-three/drei"
import { useRef, useState } from "react"
import * as random from 'maath/random/dist/maath-random.esm'
import { useFrame } from "@react-three/fiber"

export function Stars(props) {
    const ref = useRef()
    const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 40 }))
    useFrame((state, delta) => {
      ref.current.rotation.x -= delta / 100
      ref.current.rotation.y -= delta / 150
    })
    return (
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
          <PointMaterial transparent color="#ffa0e0" size={0.001} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
    )
  }