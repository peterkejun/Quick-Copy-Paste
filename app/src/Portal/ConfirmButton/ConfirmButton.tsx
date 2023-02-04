import { CheckCircleRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState, useRef } from 'react'
import { getCurrentTimestamp } from '../../utils/utils'
import { ConfirmButtonProps } from './ConfirmButton.types'

export const ConfirmButton = (props: ConfirmButtonProps) => {
    const [showConfirm, setShowConfirm] = useState(false)
    const timestamp = useRef(getCurrentTimestamp())
    const handleClick = () => {
        props.onClick()
        setShowConfirm(true)
        const currentTimestamp = getCurrentTimestamp()
        timestamp.current = currentTimestamp
        setTimeout(() => {
            if (currentTimestamp === timestamp.current) {
                setShowConfirm(false)
            }
        }, props.confirmTimeout)
    }
    const confirmIcon = props.confirmIcon || (
        <CheckCircleRounded color="success" />
    )
    const icon = props.icon
    return (
        <>
            <IconButton onClick={handleClick}>
                {showConfirm && confirmIcon}
                {!showConfirm && icon}
            </IconButton>
        </>
    )
}
