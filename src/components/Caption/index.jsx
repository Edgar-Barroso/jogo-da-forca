import { Text } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

export function Caption({text,...props}) {
    const { width } = useThree((state) => state.viewport)
    return (
        <Text
            autoRotate
            position={[-2, 10, 5]}
            lineHeight={0.8}
            fontSize={width / 10}
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle"
            {...props}
        >{text}
        </Text>
    )
}