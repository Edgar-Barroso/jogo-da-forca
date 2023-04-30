import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Cursor } from './helpers/Drag'
import { BodyPart, Face } from './components/Guy'
import { Lamp } from './components/Furniture'
import { Floor } from './components/Floor'
import { useEffect, useState } from 'react'
import { Game } from './components/Game'
import { createRagdoll } from './helpers/createRagdoll'
import { Text } from './components/Text'
import { ButtonReset } from './components/ButtonReset'
import { words } from './utils/words'


const { shapes, joints } = createRagdoll(5.5, Math.PI / 16, Math.PI / 16, 0)

export function App() {
  const [score, setScore] = useState(5)
  const [lose, setLose] = useState(false)
  const [win, setWin] = useState(false)
  const [secretWord, _] = useState( words[Math.floor(Math.random() * words.length)])

  useEffect(() => {
    if (score === 0) {
      setLose(true)
    }
  }, [score])


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {win && <Text text={'WIN'} color={'green'} />}
      {lose && <Text text={'LOSE'} color={'red'} />}
      <Canvas
        dpr={[1, 2]}
        shadows
        camera={{
          position: [-40, 40, 50],
          fov: 25,
          near: 1,
          far: 100,
        }}>
        <color attach="background" args={['#171720']} />
        <fog attach="fog" args={['#171720', 60, 90]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[-20, -5, -20]} color="red" />
        <pointLight position={[0, 0, 0]} color={lose && "red" || win && 'green'} />
        <Physics allowSleep={false} iterations={15} gravity={[0, (lose || win) ? -200 : 0, 0]}>
          <Cursor />
          <BodyPart name="upperBody">
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
      </Canvas>
      {!(lose || win) && <Game secretWord={secretWord} score={score} setScore={setScore} setWin={setWin} />}
    </div>
  )
}
