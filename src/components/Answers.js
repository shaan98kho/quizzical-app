import React from "react"

export default function Answers(props) {
    // props?.isChecked 
    // ? ( 
    //     props?.isCorrect
    //     ? ('answer-correct' ) 
    //     : (props?.isSelected ? 'answer-incorrect': 'answer-unselected')
    //   )
    // : props?.isSelected ? 'active' : ''

    const displayResults = () => {
        if(props?.isChecked) {
            if(props?.isCorrect) {                
                return 'answer answer-correct'
            } else if (!props?.isCorrect && props?.isSelected) {
                
                return 'answer answer-incorrect'
            } else {
                return 'answer answer-unselected'
            }
        } else {
            // console.log(props?.isSelected)
            return props?.isSelected ? 'answer active' : 'answer'
        }
    }

    return <>
        <div 
            className={displayResults()} 
            onClick={()=> {
                props?.handleSelect(props?.qIndex, props?.id)
                }}>
            {props?.answer}
        </div>
    </>
}