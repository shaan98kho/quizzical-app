import React, { useId } from "react"
import Answers from "./Answers"
import {decode} from 'html-entities'
import {nanoid} from "nanoid"

function Question (props) {
    // const [selectedAns, setSelectedAns] = React.useState([])

    // React.useEffect(() => {
    //     setSelectedAns([...props?.answers])
    // }, [props?.answers])

    // const handleSelect = (id) => {
    //     const newAns = selectedAns?.map((ans) => {
    //         return ans.id === id
    //         ? {
    //             ...ans, isSelected: true
    //         }
    //         : {
    //             ...ans, isSelected: false
    //         }
    //     })
    //     setSelectedAns(newAns)
    // }

    // const flattenedSelectedAns = props?.selectedAns.flat()
    // console.log("quizQxnsAndAns:", flattenedSelectedAns);
    // console.log("selected ans props", props?.selectedAns)

    const ansEl = props?.selectedAns.map((ans) => {
        
        return <Answers
            answer={decode(ans.text)}
            isSelected={ans.isSelected}
            isCorrect={ans.isCorrect}
            handleSelect={props?.handleSelect}
            isChecked={props?.isChecked}
            qIndex={props?.qIndex}
            id = {ans.id}
            key={nanoid()}
        />
    })

    const decodedQxnTxts = decode(props?.question)

    return (
        <>
            <h4>{decodedQxnTxts}</h4>
            <div className="answers-wrap">{ansEl}</div>
        </>
    )
}


export default Question