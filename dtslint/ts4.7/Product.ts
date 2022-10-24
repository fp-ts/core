import * as _ from "@fp-ts/core/typeclass/Product"
import type { TypeLambda } from "@fp-ts/core/HKT"

interface RAW<R, E, A> {
  (r: R): () => Promise<readonly [E, A]>
}

interface RAWTypeLambda extends TypeLambda {
  readonly type: RAW<this["In"], this["Out1"], this["Target"]>
}

declare const fa: RAW<{ a: string }, "a", string>
declare const fb: RAW<{ b: number }, "b", number>
declare const fc: RAW<{ c: boolean }, "c", boolean>

export declare const Product: _.Product<RAWTypeLambda>

// $ExpectType RAW<{ a: string; } & { b: number; } & { c: boolean; }, "a" | "b" | "c", readonly [string, number, boolean]>
_.tuple(Product)(fa, fb, fc)

// $ExpectType RAW<{ a: string; } & { b: number; } & { c: boolean; }, "a" | "b" | "c", { readonly fa: string; readonly fb: number; readonly fc: boolean; }>
_.struct(Product)({ fa, fb, fc })

_.tuple(Product)() // should allow empty tuple
_.struct(Product)({}) // should allow empty structs
