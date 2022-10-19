import type * as covariant from "@fp-ts/core/Covariant"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type * as product from "@fp-ts/core/Product"

export interface Failure<E> {
  readonly _tag: "Failure"
  readonly failure: E
}

export interface Success<A> {
  readonly _tag: "Success"
  readonly success: A
}

export type Result<E, A> = Failure<E> | Success<A>

export interface ResultTypeLambda extends TypeLambda {
  readonly type: Result<this["Out2"], this["Out"]>
}

export const isFailure = <E, A>(self: Result<E, A>): self is Failure<E> => self._tag === "Failure"

export const isSuccess = <E, A>(self: Result<E, A>): self is Success<A> => self._tag === "Success"

export const fail = <E>(e: E): Result<E, never> => ({ _tag: "Failure", failure: e })

export const succeed = <A>(a: A): Result<never, A> => ({ _tag: "Success", success: a })

export const map = <A, B>(f: (a: A) => B) =>
  <E>(self: Result<E, A>): Result<E, B> => isFailure(self) ? self : succeed(f(self.success))

export const Covariant: covariant.Covariant<ResultTypeLambda> = {
  map
}

export const Product: product.Product<ResultTypeLambda> = {
  map,
  product: (that) =>
    (self) =>
      isFailure(self) ? self : isFailure(that) ? that : succeed([self.success, that.success]),
  productMany: <E, A>(
    collection: Iterable<Result<E, A>>
  ) =>
    (self: Result<E, A>): Result<E, [A, ...ReadonlyArray<A>]> => {
      if (isFailure(self)) {
        return self
      }
      const out: [A, ...Array<A>] = [self.success]
      for (const r of collection) {
        if (isFailure(r)) {
          return r
        }
        out.push(r.success)
      }
      return succeed(out)
    }
}
