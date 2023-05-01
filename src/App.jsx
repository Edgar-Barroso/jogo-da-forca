import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Cursor } from './helpers/Drag'
import { BodyPart, Face } from './components/Guy'
import { Lamp } from './components/Furniture'
import { Floor } from './components/Floor'
import { useEffect, useState, useRef, Suspense } from 'react'
import { Game } from './components/Game'
import { createRagdoll } from './helpers/createRagdoll'
import { ButtonReset } from './components/ButtonReset'
import { words } from './utils/words'
import { Points, PointMaterial, OrbitControls, Text } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'



const { shapes, joints } = createRagdoll(5.5, Math.PI / 16, Math.PI / 16, 0)

export function App() {
  const [score, setScore] = useState(5)
  const [lose, setLose] = useState(false)
  const [win, setWin] = useState(false)
  const [secretWord, setSecretWord] = useState(words[Math.floor(Math.random() * words.length)])


  const handleResetGame = () => {
    setScore(5)
    setLose(false)
    setWin(false)
    setSecretWord(words[Math.floor(Math.random() * words.length)])

  }
  useEffect(() => {
    if (score === 0) {
      setLose(true)
    }
  }, [score])




  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        shadows
        camera={{
          position: [0, 20, 50],
          fov: 30,
        }}>
        <Caption color={'green'} text={win ? 'WIN' : ''} />
        <Caption color={'red'} text={lose ? 'LOSE' : ''} />
        <color attach="background" args={['#171720']} />
        <fog attach="fog" args={['#171720', 80, 80]} />
        <ambientLight intensity={0.1} />
        <pointLight position={[-20, -5, -20]} color="red" />
        {lose && <pointLight position={[0, 5, 0]} color={'red'} />}
        {win && <pointLight position={[0, 5, 0]} color={'green'} />}
        <Physics allowSleep={false} iterations={15} gravity={[0, (lose && !win) ? -200 : 0, 0]}>
          <Cursor />
          <BodyPart position={[0, 5, 0]} name="upperBody">
            {score < 5 && <BodyPart name="head" config={joints['neckJoint']} render={<Face />} />}
            {score < 4 && <BodyPart name="upperLeftArm" config={joints['leftShoulder']}>
              <BodyPart name="lowerLeftArm" config={joints['leftElbowJoint']} />
            </BodyPart>}
            {score < 3 && <BodyPart name="upperRightArm" config={joints['rightShoulder']}>
              <BodyPart name="lowerRightArm" config={joints['rightElbowJoint']} />
            </BodyPart>}
            {score < 5 && <BodyPart name="pelvis" config={joints['spineJoint']}>
              {score < 2 && <BodyPart name="upperLeftLeg" config={joints['leftHipJoint']}>
                <BodyPart name="lowerLeftLeg" config={joints['leftKneeJoint']} />
              </BodyPart>}
              {score < 1 && <BodyPart name="upperRightLeg" config={joints['rightHipJoint']}>
                <BodyPart name="lowerRightLeg" config={joints['rightKneeJoint']} />
              </BodyPart>}
            </BodyPart>}
          </BodyPart>
          <Floor position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          <Lamp position={[0, 20, 0]} />

        </Physics>
        <OrbitControls makeDefault autoRotate />

        <Stars />
      </Canvas>
      {!(lose || win) && <Game secretWord={secretWord} score={score} setScore={setScore} setWin={setWin} />}
      {(lose || win) && < ButtonReset handleResetGame={handleResetGame} />}
    </div>
  )
}


function Stars(props) {
  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 40 }))
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 100
    ref.current.rotation.y -= delta / 150
  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ffa0e0" size={0.2} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}




function Caption(props) {
  const { width } = useThree((state) => state.viewport)
  return (
    <Text
      autoRotate
      position={[-2, 10, 5]}
      lineHeight={0.8}
      font="/Ki-Medium.ttf"
      fontSize={width / 10}
      material-toneMapped={false}
      anchorX="center"
      anchorY="middle"
      color={props.color}
    >{props.text}
    </Text>
  )
}