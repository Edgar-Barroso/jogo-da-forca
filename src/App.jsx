import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { Cursor } from './components/Drag'
import { Guy } from './components/Guy'
import { Lamp, Chair, Mug, Table } from './components/Furniture'
import { Floor } from './components/Floor'
import { useEffect, useState } from 'react'
import { Game } from './components/Game'
import { ButtonReset } from './components/ButtonReset'
import { words } from './utils/words'
import { OrbitControls } from '@react-three/drei'
import { Stars } from './components/Stars'
import { Caption } from './components/Caption'




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
      <Canvas shadows camera={{ position: [0, 20, 50], fov: 30, }}>
        <color attach="background" args={['#070707']} />
        <fog attach="fog" args={['#171720', 100, 100]} />

        <ambientLight intensity={0.1} />

        <pointLight position={[20, -5, 20]} color="blue" />
        <pointLight position={[-20, -5, -20]} color="red" />


        <Caption color={'green'} text={win ? 'WIN' : ''} />
        <Caption color={'red'} text={lose ? 'LOSE' : ''} />


        <Physics allowSleep={false} iterations={15} gravity={[0, 0, 0]}>
          <Cursor />
          <Guy score={score} position={[0, 0, 0]} />
        </Physics>
        <Stars />
        <OrbitControls makeDefault autoRotate autoRotateSpeed={.3} enableZoom={false} />
      </Canvas>


      {!(lose || win) && <Game secretWord={secretWord} score={score} setScore={setScore} setWin={setWin} />}
      {(lose || win) && < ButtonReset handleResetGame={handleResetGame} />}
    </div>
  )
}