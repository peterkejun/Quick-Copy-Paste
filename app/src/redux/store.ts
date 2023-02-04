import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './slices/languageSlice'
import snippetReducer from './slices/snippetSlice'

export const store = configureStore({
    reducer: {
        language: languageReducer,
        snippets: snippetReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
