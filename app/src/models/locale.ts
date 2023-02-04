export const LOCALE = {
    EN_CA: 'en_ca',
    FR_CA: 'fr_ca',
} as const

type Keys = keyof typeof LOCALE
export type Locale = (typeof LOCALE)[Keys]
