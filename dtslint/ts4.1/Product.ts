import * as product from "@fp-ts/core/typeclass/Product"
import type { TypeLambda } from "@fp-ts/core/HKT"

export interface ReaderAsyncWriter<R, E, A> {
  (r: R): () => Promise<[E, A]>
}

export interface ReaderAsyncWriterTypeLambda extends TypeLambda {
  readonly type: ReaderAsyncWriter<this["In"], this["Out1"], this["Target"]>
}

declare const fa: ReaderAsyncWriter<{ a: string }, "a", string>
declare const fb: ReaderAsyncWriter<{ b: number }, "b", number>
declare const fc: ReaderAsyncWriter<{ c: boolean }, "c", boolean>

export declare const Product: product.Product<ReaderAsyncWriterTypeLambda>

// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: number; } & { c: boolean; }, "a" | "b" | "c", readonly [string, number, boolean]>
product.tuple(Product)(fa, fb, fc)

// $ExpectType ReaderAsyncWriter<{ a: string; } & { b: number; } & { c: boolean; }, "a" | "b" | "c", { readonly fa: string; readonly fb: number; readonly fc: boolean; }>
const x= product.struct(Product)({ fa, fb, fc })
