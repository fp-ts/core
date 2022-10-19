/**
 * @since 1.0.0
 */

/**
 * @category models
 * @since 1.0.0
 */
export interface None {
  readonly _tag: "None"
}

/**
 * @category models
 * @since 1.0.0
 */
export interface Some<A> {
  readonly _tag: "Some"
  readonly value: A
}

/**
 * @category models
 * @since 1.0.0
 */
export type Option<A> = None | Some<A>
