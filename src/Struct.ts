/**
 * @since 1.0.0
 */

/**
 * @since 1.0.0
 */
export const pick = <S, Keys extends readonly [keyof S, ...Array<keyof S>]>(
  ...keys: Keys
) =>
  (s: S): { [K in Keys[number]]: S[K] } => {
    const out: any = {}
    for (const k of keys) {
      out[k] = s[k]
    }
    return out
  }

/**
 * @since 1.0.0
 */
export const omit = <S, Keys extends readonly [keyof S, ...Array<keyof S>]>(
  ...keys: Keys
) =>
  (s: S): { [K in Exclude<keyof S, Keys[number]>]: S[K] } => {
    const out: any = { ...s }
    for (const k of keys) {
      delete out[k]
    }
    return out
  }
