/**
 * @since 1.0.0
 */

import { proto } from "@fp-ts/core/internal/effect"
import type { None, Option, Some } from "@fp-ts/core/Option"

/** @internal */
export const isNone = <A>(fa: Option<A>): fa is None => fa._tag === "None"

/** @internal */
export const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === "Some"

const _none: Option<never> = Object.setPrototypeOf({ _tag: "None" }, proto)

/** @internal */
export const none = <A = never>(): Option<A> => _none

/** @internal */
export const some = <A>(a: A): Option<A> => Object.setPrototypeOf({ _tag: "Some", value: a }, proto)
