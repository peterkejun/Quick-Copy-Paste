import { Chip, Stack } from '@mui/material'
import { useText } from '../../hooks/useText'
import { EnterSubmitTextInput } from '../EnterSubmitTextInput/EnterSubmitTextInput'
import { ChipListProps } from './ChipList.types'

export const ChipList = (props: ChipListProps) => {
    const text__typeToAddTag = useText('SNIPPET:type-to-add-tag')
    return (
        <Stack direction="row" spacing="5px">
            {props.chips.map((label, index) => (
                <Chip
                    label={label}
                    key={index}
                    onDelete={() => props.onDelete(index)}
                />
            ))}
            <EnterSubmitTextInput
                placeholder={text__typeToAddTag}
                onSubmit={props.onAdd}
            />
        </Stack>
    )
}
