import { createContext, useContext } from "react"
import { createRagdoll } from "../../../../helpers/createRagdoll"
import { useBox, useConeTwistConstraint } from "@react-three/cannon"
import { useDragConstraint } from "../../../../helpers/Drag"
import { Block } from "../../../../helpers/Block"

const { shapes, joints } = createRagdoll(5.5, Math.PI / 16, Math.PI / 16, 0)
const context = createContext()

export const BodyPart = ({ config, children, render, name, ...props }) => {
    const { color, args, mass, position } = shapes[name]
    const parent = useContext(context)
    const [ref] = useBox(() => ({ mass, args, position, linearDamping: 0.99, ...props }))
    useConeTwistConstraint(ref, parent, config)
    const bind = useDragConstraint(ref)
    return (
        <context.Provider value={ref}>
            <Block castShadow receiveShadow ref={ref} {...props} {...bind} scale={args} name={name} color={color}>
                {render}
            </Block>
            {children}
        </context.Provider>
    )
}