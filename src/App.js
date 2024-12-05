import './App.scss'
import './css/Theme.scss'
import React from "react"
import Question from './components/Question'
import ThemeToggle from './components/ThemeToggle'
import Button from './components/Button'
import {nanoid} from "nanoid"
// import ReactDOM from "react-dom";
// import {Routes, Route, Link} from 'react-router-dom';

function App() {
  const [quizData, setQuizData] = React.useState([])
  const [quizQxnsAndAns, setQuizQxnsAndAns ] = React.useState([])
  const [isDay, setIsDay] = React.useState(true)
  const [isChecked, setIsChecked] = React.useState(false)
  const [score, setScore] = React.useState(0)
  const [showStartNew, setShowStartNew] = React.useState(false)
  const [isStart, setIsStart] = React.useState(false)

  React.useEffect(()=> {
    async function fetchData() {
      const res = await fetch("https://opentdb.com/api.php?amount=5")
      const data = await res.json()

      if(data.results){
        setQuizData(data.results)
      }
    }
    
    fetchData().then(() => setAllData())
  },[quizData]) 

  const shuffleArray = (array) => {
    const arrCopy = [...array];
    // const arrCopyTesting = array.slice()

    for(let i=arrCopy.length-1; i>0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
    }

    return arrCopy;
  }
  
  //setalldata starts
  const setAllData = () => {
    const allQxns = []

    for(let i =0; i<quizData.length; i++) {
      allQxns.push(quizData[i].question)
    }

    const updatedQuizData = quizData?.map(qData => {
      const correctAns = {
        id: nanoid(),
        text: qData.correct_answer,
        isCorrect: true,
        isSelected: false
      }
  
      const incorrectAns = qData.incorrect_answers?.map(incAns => ({
        id: nanoid(),
        text: incAns,
        isCorrect: false,
        isSelected: false
      }))
      // const randomIndex = Math.floor(Math.random() * (incorrectAns.length + 1)) //random index to insert answer randomly into answer array
      // but i chose to insert it at index 0 using splice, and then shuffle it using my shuffleArray method

      incorrectAns.splice(0, 0, correctAns)
      const shuffledVerArray = shuffleArray(incorrectAns)

      return {
        ...qData,
        answers: shuffledVerArray
      }
    })

    setQuizQxnsAndAns(() => {
      const qna = []
      for(let j = 0; j<allQxns.length; j++) {
        qna.push({
          question: updatedQuizData[j].question,
          answers: updatedQuizData[j].answers
        })
      }

      return qna
    })
  }
  
  const handleSelect = (qIndex, id) => {
    const updatedQuestions = [...quizQxnsAndAns]
    const questionToUpdate = updatedQuestions[qIndex]
    
    const updtedAns = questionToUpdate.answers.map((prevAns) => {
      return prevAns.id === id 
            ? {...prevAns, isSelected: true}
            : {...prevAns, isSelected: false}
    })

    updatedQuestions[qIndex] = {
      ...questionToUpdate,
      answers: updtedAns
    }
    
    setQuizQxnsAndAns(updatedQuestions)
  }


  const checkAnswers = () => {
      setIsChecked(true)

      const answeredQ = [...quizQxnsAndAns]
      let count = 0
      answeredQ.map((q) => {
        q.answers.map(a => {
            if(a.isSelected === true && a.isCorrect === true) 
              count += 1
        })
      })

      setScore(count)
  }

  const questionEl = quizQxnsAndAns?.map((itm, index) => {
      return <div className="question-wrap" key={nanoid()}>
        <Question
          question={itm.question}
          selectedAns={itm.answers}
          qIndex={index}
          isChecked={isChecked}
          handleSelect={handleSelect}
        />
      </div>
  }) 

  const restart = () => {
    setScore(0)
    setIsChecked(false)
    setAllData()
    setShowStartNew(true)
    setIsStart(false)
  }

  const startNew = () => {
    restart()
    setShowStartNew(false)
    setQuizData([])
    setIsStart(false)
  }

  const startQuiz = () => {
    setIsStart(true)
  }

  const quizLanding = () => {
    return <div className='quiz-landing'>
            <h1>Quizzical</h1>
            <p>Click to start!</p>
            <Button text="Start quiz" function={startQuiz}></Button>
          </div>
  }

  const quizContent = () => {
    return <div className='quiz-wrap'>
            {questionEl}
            <div className='result-wrap'>
              {isChecked ? <div className='result'>You scored {score}/5 correct answer{score > 1 && 's' }</div> : ''}
              <Button text={`${isChecked ? "Play again" : "Check Answers"}`} function={isChecked? restart : checkAnswers}></Button>
              {showStartNew && <Button text={`Try new questions`} function={startNew}></Button>}
            </div>
          </div>
  }

  return (
    <div className={`container ${isDay ? "day" : "night"}`}>
      
      {isStart ? quizContent() : quizLanding()}

      
      <ThemeToggle />
    </div>
  );
}

export default App;
