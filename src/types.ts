/**
 * @since 3.0.0
 */

/**
 * @since 3.0.0
 */
export type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends
  (x: infer R) => any ? R
  : never

/**
 * @since 3.0.0
 */
export type UnionToTuple<Union> = UnionToIntersection<
  Union extends unknown ? (distributed: Union) => void
    : never
> extends ((merged: infer Intersection) => void)
  ? readonly [...UnionToTuple<Exclude<Union, Intersection>>, Intersection]
  : []
