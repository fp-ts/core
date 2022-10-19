/**
 * @category models
 * @since 1.0.0
 */
export interface Left<E> {
  readonly _tag: "Left"
  readonly left: E
}

/**
 * @category models
 * @since 1.0.0
 */
export interface Right<A> {
  readonly _tag: "Right"
  readonly right: A
}

/**
 * @category models
 * @since 1.0.0
 */
export type Either<E, A> = Left<E> | Right<A>
