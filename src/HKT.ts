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
export interface TypeClass<F extends TypeLambda<any>> {
  readonly [URI]?: F
}

export declare namespace Variance {
  export type Covariant = "+"
  export type Contravariant = "-"
  export type Invariant = Covariant | Contravariant
}

/**
 * @since 1.0.0
 */
export interface TypeLambda<V extends Variance.Invariant> {
  readonly In: unknown
  readonly Out2: unknown
  readonly Out1: unknown
  readonly Target: unknown
  readonly Variance: V
}

/**
 * @since 1.0.0
 */
export type Kind<F extends TypeLambda<any>, In, Out2, Out1, Target> = F extends {
  readonly type: unknown
} ? (F & {
  readonly In: In
  readonly Out2: Out2
  readonly Out1: Out1
  readonly Target: Target
})["type"]
  : {
    readonly F: F
    readonly In: (_: In) => void
    readonly Out2: () => Out2
    readonly Out1: () => Out1
    readonly Target: UnionToIntersection<
      {
        "+": { "+": () => Target }
        "-": { "-": (_: Target) => void }
      }[F["Variance"]]
    >
  }

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any
  ? R
  : never
