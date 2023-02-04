import { createSlice } from '@reduxjs/toolkit'
import { getLanguage } from '../../models/language'
import { LOCALE } from '../../models/locale'
import { Language } from '../../models/types'
import { RootState } from '../store'

const defaultLanguage = getLanguage(LOCALE.EN_CA)

export const languageSlice = createSlice({
    name: 'language',
    initialState: defaultLanguage,
    reducers: {
        set: (state, action) => {
            state = getLanguage(action.payload)
        },
    },
})

export const selectLanguage = (state: RootState): Language => state.language

export const { set } = languageSlice.actions
export default languageSlice.reducer
