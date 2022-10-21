import type { TypeLambda } from "@fp-ts/core/HKT"
import { fromIterable } from "@fp-ts/core/internal/ReadonlyArray"
import * as contravariant from "@fp-ts/core/typeclass/Contravariant"
import type * as invariant from "@fp-ts/core/typeclass/Invariant"
import type * as nonEmptyProduct from "@fp-ts/core/typeclass/NonEmptyProduct"
import type * as product from "@fp-ts/core/typeclass/Product"

export interface Predicate<A> {
  (a: A): boolean
}

export interface PredicateTypeLambda extends TypeLambda {
  readonly type: Predicate<this["Target"]>
}

export const Contravariant: contravariant.Contravariant<PredicateTypeLambda> = {
  contramap: f => self => b => self(f(b))
}

export const Invariant: invariant.Invariant<PredicateTypeLambda> = {
  imap: contravariant.imap(Contravariant)
}

export const NonEmptyProduct: nonEmptyProduct.NonEmptyProduct<PredicateTypeLambda> = {
  imap: Invariant.imap,
  product: that => self => ([a, b]) => self(a) && that(b),
  productMany: collection =>
    self => {
      return ([head, ...tail]) => {
        if (self(head) === false) {
          return false
        }
        const predicates = fromIterable(collection)
        for (let i = 0; i < predicates.length; i++) {
          if (predicates[i](tail[i]) === false) {
            return false
          }
        }
        return true
      }
    }
}

export const Product: product.Product<PredicateTypeLambda> = {
  ...NonEmptyProduct,
  of: () => () => true,
  productAll: collection =>
    as => {
      const predicates = fromIterable(collection)
      for (let i = 0; i < predicates.length; i++) {
        if (predicates[i](as[i]) === false) {
          return false
        }
      }
      return true
    }
}

export const isString = (u: unknown): u is string => typeof u === "string"

export const isNumber = (u: unknown): u is number => typeof u === "number"

export const isBoolean = (u: unknown): u is boolean => typeof u === "boolean"
