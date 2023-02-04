import { Language } from './types'
import languages from './languageData'
import { Locale } from './locale'

const textCache = new Map<string, Map<string, string>>()

export type TEXT_ID = keyof typeof languages.en_ca.texts

export const getLanguage = (locale: Locale): Language => {
    const display: string = languages[locale].display
    return {
        locale,
        display,
    }
}

export const loadCache = (language: Language): void => {
    const cache = new Map<string, string>()
    for (const [id, text] of Object.entries(languages[language.locale].texts)) {
        cache.set(id, text)
    }
    textCache.set(language.locale, cache)
}

export const getTextFromCache = (
    language: Language,
    id: string
): string | null => {
    if (!textCache.has(language.locale)) {
        loadCache(language)
    }
    return textCache.get(language.locale)?.get(id) || null
}

export const getText = (language: Language, id: string): string => {
    const text = getTextFromCache(language, id)
    if (text === null) {
        throw Error('Text not found for language in cache.')
    }
    return text
}
