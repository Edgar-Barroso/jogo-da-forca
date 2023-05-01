import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Block } from "../../../Block"

export function Face() {
    const mouth = useRef()
    const eyes = useRef()
    useFrame((state) => {
      eyes.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
      mouth.current.scale.y = (1 + Math.sin(state.clock.elapsedTime * 2)) * 0.6
    })
    return (
      <>
        <group ref={eyes}>
          <Block position={[-0.3, 0.1, 0.5]} args={[0.2, 0.1, 0.1]} color="black" transparent opacity={0.8} />
          <Block position={[0.3, 0.1, 0.5]} args={[0.2, 0.1, 0.1]} color="black" transparent opacity={0.8} />
        </group>
        <Block ref={mouth} position={[0, -0.2, 0.5]} args={[0.3, 0.05, 0.1]} color="#700000" transparent opacity={0.8} />
      </>
    )
  }