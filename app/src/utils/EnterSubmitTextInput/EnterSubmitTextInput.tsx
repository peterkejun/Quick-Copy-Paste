import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { EnterSubmitTextInputProps } from './EnterSubmitTextInput.types'

export const EnterSubmitTextInput = (props: EnterSubmitTextInputProps) => {
    const [text, setText] = useState('')
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && text.trim().length > 0) {
            props.onSubmit(text)
            setText('')
        }
    }
    return (
        <>
            <input
                type="text"
                value={text}
                placeholder={props.placeholder}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
            />
        </>
    )
}
