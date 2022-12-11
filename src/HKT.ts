/**
 * @since 1.0.0
 */

/**
 * @since 1.0.0
 */
export declare const URI: unique symbol

/**
 * @since 1.0.0
 */
export interface TypeClass<F extends TypeLambda> {
  [URI]?: F
}

/**
 * @since 1.0.0
 */
export interface TypeLambda {
  In: unknown
  Out2: unknown
  Out1: unknown
  Target: unknown
}

/**
 * @since 1.0.0
 */
export type Kind<F extends TypeLambda, In, Out2, Out1, Target, IO extends "I" | "O" = "O"> =
  F extends {
    input: unknown
    type: unknown
  } ? IO extends "I" ? (F & {
    In: In
    Out2: Out2
    Out1: Out1
    Target: Target
  })["input"]
  : (F & {
    In: In
    Out2: Out2
    Out1: Out1
    Target: Target
  })["type"]
    : F extends {
      type: unknown
    } ? (F & {
      In: In
      Out2: Out2
      Out1: Out1
      Target: Target
    })["type"]
    : IO extends "I" ? {
      F: F
      In: (_: In) => void
      Out2: () => Out2
      Out1: () => Out1
      Target: (_: Target) => Target
    }
    : {
      F: F
      _: "Output"
      In: (_: In) => void
      Out2: () => Out2
      Out1: () => Out1
      Target: (_: Target) => Target
    }
