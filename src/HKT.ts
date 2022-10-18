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
  readonly [URI]?: F
}

/**
 * @since 1.0.0
 */
export interface TypeLambda {
  readonly InOut: unknown
  readonly In: unknown
  readonly Out3: unknown
  readonly Out2: unknown
  readonly Out: unknown
}

/**
 * @since 1.0.0
 */
export type Kind<F extends TypeLambda, InOut, In, Out3, Out2, Out> = F extends {
  readonly type: unknown
} ? (F & {
  readonly InOut: InOut
  readonly In: In
  readonly Out3: Out3
  readonly Out2: Out2
  readonly Out: Out
})["type"]
  : {
    readonly F: F
    readonly InOut: (_: InOut) => InOut
    readonly In: (_: In) => void
    readonly Out3: () => Out3
    readonly Out2: () => Out2
    readonly Out: () => Out
  }
