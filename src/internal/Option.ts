/**
 * @since 1.0.0
 */

import { structural } from "@fp-ts/core/internal/effect"
import type { None, Option, Some } from "@fp-ts/core/Option"

/** @internal */
export const isOption = (u: unknown): u is Option<unknown> =>
  typeof u === "object" && u != null && structural in u && "_tag" in u &&
  (u["_tag"] === "None" || u["_tag"] === "Some")

/** @internal */
export const isNone = <A>(fa: Option<A>): fa is None => fa._tag === "None"

/** @internal */
export const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === "Some"

/** @internal */
export const none: Option<never> = Object.defineProperty({ _tag: "None" }, structural, {
  enumerable: false,
  value: true
})

/** @internal */
export const some = <A>(a: A): Option<A> =>
  Object.defineProperty({ _tag: "Some", value: a }, structural, { enumerable: false, value: true })

/** @internal */
export const fromNullable = <A>(
  a: A
): Option<NonNullable<A>> => (a == null ? none : some(a as NonNullable<A>))
