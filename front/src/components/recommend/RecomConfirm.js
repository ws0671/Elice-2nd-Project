import { useState } from 'react'
import RecomAnswer from './RecomAnswer'


function RecomConfirm() {
    const [isAnswered, setIsAnswered] = useState(false)

    return (
        <>
            <RecomAnswer isAnswered={isAnswered} setIsAnswered={setIsAnswered} />

        </>
    )

}

export default RecomConfirm