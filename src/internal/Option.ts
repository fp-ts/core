/**
 * @since 1.0.0
 */
import type { None, Option, Some } from "@fp-ts/core/data/Option"

/** @internal */
export const none: Option<never> = { _tag: "None" }

/** @internal */
export const some = <A>(a: A): Option<A> => ({ _tag: "Some", value: a })

/**
 * @since 1.0.0
 */
export const isNone = <A>(fa: Option<A>): fa is None => fa._tag === "None"

/**
 * @since 1.0.0
 */
export const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === "Some"
