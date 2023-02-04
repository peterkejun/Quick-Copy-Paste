import { useSelector } from 'react-redux'
import { getText, TEXT_ID } from '../models/language'
import { selectLanguage } from '../redux/slices/languageSlice'

export const useText = (textId: TEXT_ID) => {
    const language = useSelector(selectLanguage)
    return getText(language, textId)
}
