import { useEffect, useState } from 'react'
import { GameContainer } from './style'


export function Game({ secretWord, score, setScore, setWin }) {
  const [letter, setLetter] = useState('')
  const [word, setWord] = useState(new Array(secretWord.length).fill('_'))
  const [wordsUsed, setWordsUsed] = useState([])

  useEffect(() => { setWord(new Array(secretWord.length).fill('_')) }, [secretWord])
  const handleCheckLetter = (event) => {
    event.preventDefault()
    if (secretWord.includes(letter)) {
      const indexs = []

      for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === letter) {
          indexs.push(i)
        }

        const newWord = word
        indexs.forEach((i) => {
          newWord[i] = letter
        })
        setWord(newWord)
      }
    } else if (!wordsUsed.includes(letter)) {
      setScore(score - 1)
    }

    if (!word.includes('_')) {
      setWin(true)
    }

    setWordsUsed([...wordsUsed, letter])
    setLetter('')
  }

  return (
    <GameContainer>
      <h1>{word}</h1>
      <h2>{score} TENTATIVAS</h2>
      <form onSubmit={handleCheckLetter}>
        <input required type="text" maxLength={1} value={letter} onChange={(event) => setLetter(event.target.value.toLowerCase())} />
      </form>
    </GameContainer>
  )
}
