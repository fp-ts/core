/**
 * @since 1.0.0
 */

/** @internal */
export const structural = Symbol.for("@effect/data/Equal/structural")

/** @internal */
export const proto = Object.setPrototypeOf({ [structural]: true }, Object.prototype)
