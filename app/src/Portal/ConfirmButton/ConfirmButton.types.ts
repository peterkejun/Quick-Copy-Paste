import { CheckCircleRounded } from '@mui/icons-material'
import React from 'react'

const icon = React.createElement(CheckCircleRounded)
type Icon = typeof icon

export interface ConfirmButtonProps {
    icon: Icon
    confirmIcon?: Icon
    confirmTimeout: number
    onClick: () => void
}
