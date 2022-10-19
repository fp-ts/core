/**
 * @since 1.0.0
 */
import type { Option } from "@fp-ts/core/data/Option"

/** @internal */
export const none: Option<never> = { _tag: "None" }

/** @internal */
export const some = <A>(a: A): Option<A> => ({ _tag: "Some", value: a })
