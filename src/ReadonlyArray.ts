/**
 * @since 1.0.0
 */
import type { Either } from "@fp-ts/core/Either"
import { identity, pipe } from "@fp-ts/core/Function"
import type { LazyArg } from "@fp-ts/core/Function"
import type { Kind, TypeLambda } from "@fp-ts/core/HKT"
import * as either from "@fp-ts/core/internal/Either"
import * as option from "@fp-ts/core/internal/Option"
import * as readonlyArray from "@fp-ts/core/internal/ReadonlyArray"
import type { Option } from "@fp-ts/core/Option"
import * as O from "@fp-ts/core/Option"
import type { Predicate, Refinement } from "@fp-ts/core/Predicate"
import * as string from "@fp-ts/core/String"
import * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import type * as compactable from "@fp-ts/core/typeclass/Compactable"
import type { Coproduct } from "@fp-ts/core/typeclass/Coproduct"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import type { Equivalence } from "@fp-ts/core/typeclass/Equivalence"
import * as filterable from "@fp-ts/core/typeclass/Filterable"
import * as flatMap_ from "@fp-ts/core/typeclass/FlatMap"
import * as foldable from "@fp-ts/core/typeclass/Foldable"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import type * as monad from "@fp-ts/core/typeclass/Monad"
import type { Monoid } from "@fp-ts/core/typeclass/Monoid"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as of_ from "@fp-ts/core/typeclass/Of"
import * as order from "@fp-ts/core/typeclass/Order"
import type { Order } from "@fp-ts/core/typeclass/Order"
import type * as pointed from "@fp-ts/core/typeclass/Pointed"
import type * as product_ from "@fp-ts/core/typeclass/Product"
import * as semiApplicative from "@fp-ts/core/typeclass/SemiApplicative"
import type { Semigroup } from "@fp-ts/core/typeclass/Semigroup"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import { fromCombine } from "@fp-ts/core/typeclass/Semigroup"
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"
import * as traversable from "@fp-ts/core/typeclass/Traversable"
import * as traversableFilterable from "@fp-ts/core/typeclass/TraversableFilterable"

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface ReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: ReadonlyArray<this["Target"]>
}

/**
 * @category models
 * @since 1.0.0
 */
export type NonEmptyReadonlyArray<A> = readonly [A, ...Array<A>]

/**
 * @category models
 * @since 1.0.0
 */
export type NonEmptyArray<A> = [A, ...Array<A>]

/**
 * Builds a `NonEmptyArray` from an non-empty collection of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const make = <Elements extends NonEmptyArray<any>>(
  ...elements: Elements
): NonEmptyArray<Elements[number]> => elements

/**
 * Return a `NonEmptyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to an integer >= 1.
 *
 * @category constructors
 * @since 1.0.0
 */
export const makeBy = <A>(f: (i: number) => A) =>
  (n: number): NonEmptyArray<A> => {
    const max = Math.max(1, Math.floor(n))
    const out: NonEmptyArray<A> = [f(0)]
    for (let i = 1; i < max; i++) {
      out.push(f(i))
    }
    return out
  }

/**
 * Return a `NonEmptyArray` containing a range of integers, including both endpoints.
 *
 * @category constructors
 * @since 1.0.0
 */
export const range = (start: number, end: number): NonEmptyArray<number> =>
  start <= end ? makeBy((i) => start + i)(end - start + 1) : [start]

/**
 * Return a `NonEmptyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to an integer >= 1.
 *
 * @category constructors
 * @since 1.0.0
 */
export const replicate = <A>(a: A): ((n: number) => NonEmptyArray<A>) => makeBy(() => a)

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromIterable: <A>(collection: Iterable<A>) => Array<A> = readonlyArray.fromIterable

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromOption = <A>(
  self: Option<A>
): Array<A> => (option.isNone(self) ? [] : [self.value])

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromEither = <E, A>(
  self: Either<E, A>
): Array<A> => (either.isLeft(self) ? [] : [self.right])

/**
 * @category pattern matching
 * @since 1.0.0
 */
export const match = <B, A, C = B>(
  onEmpty: LazyArg<B>,
  onNonEmpty: (head: A, tail: Array<A>) => C
) =>
  (self: ReadonlyArray<A>): B | C =>
    isNonEmpty(self) ? onNonEmpty(headNonEmpty(self), tailNonEmpty(self)) : onEmpty()

/**
 * @category pattern matching
 * @since 1.0.0
 */
export const matchRight = <B, A, C = B>(
  onEmpty: LazyArg<B>,
  onNonEmpty: (init: Array<A>, last: A) => C
) =>
  (self: ReadonlyArray<A>): B | C =>
    isNonEmpty(self) ?
      onNonEmpty(initNonEmpty(self), lastNonEmpty(self)) :
      onEmpty()

/**
 * Prepend an element to the front of an `Iterable`, creating a new `NonEmptyArray`.
 *
 * @since 1.0.0
 */
export const prepend = <B>(
  head: B
) => <A>(self: Iterable<A>): NonEmptyArray<A | B> => [head, ...self]

/**
 * @since 1.0.0
 */
export const prependAll = <B>(that: Iterable<B>) =>
  <A>(self: Iterable<A>): Array<A | B> => fromIterable<A | B>(that).concat(fromIterable(self))

/**
 * @since 1.0.0
 */
export function prependAllNonEmpty<B>(
  that: NonEmptyReadonlyArray<B>
): <A>(self: Iterable<A>) => NonEmptyArray<A | B>
export function prependAllNonEmpty<B>(
  that: Iterable<B>
): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>
export function prependAllNonEmpty<B>(
  that: Iterable<B>
): <A>(self: NonEmptyReadonlyArray<A>) => Array<A | B> {
  return prependAll(that)
}

/**
 * Append an element to the end of an `Iterable`, creating a new `NonEmptyArray`.
 *
 * @since 1.0.0
 */
export const append = <B>(
  last: B
) => <A>(self: Iterable<A>): NonEmptyArray<A | B> => [...self, last] as any

/**
 * @since 1.0.0
 */
export const appendAll = <B>(that: Iterable<B>) =>
  <A>(self: Iterable<A>): Array<A | B> => fromIterable<A | B>(self).concat(fromIterable(that))

/**
 * @since 1.0.0
 */
export function appendAllNonEmpty<B>(
  that: NonEmptyReadonlyArray<B>
): <A>(self: Iterable<A>) => NonEmptyArray<A | B>
export function appendAllNonEmpty<B>(
  that: Iterable<B>
): <A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>
export function appendAllNonEmpty<B>(
  that: Iterable<B>
): <A>(self: NonEmptyReadonlyArray<A>) => Array<A | B> {
  return appendAll(that)
}

/**
 * Fold an `Iterable` from the left, keeping all intermediate results instead of only the final result.
 *
 * @category folding
 * @since 1.0.0
 */
export const scan = <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: Iterable<A>): NonEmptyArray<B> => {
    const out: NonEmptyArray<B> = [b]
    let i = 0
    for (const a of self) {
      out[i + 1] = f(out[i], a)
      i++
    }
    return out
  }

/**
 * Fold an `Iterable` from the right, keeping all intermediate results instead of only the final result.
 *
 * @category folding
 * @since 1.0.0
 */
export const scanRight = <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: Iterable<A>): NonEmptyArray<B> => {
    const input = fromIterable(self)
    const out: NonEmptyArray<B> = new Array(input.length + 1) as any
    out[input.length] = b
    for (let i = input.length - 1; i >= 0; i--) {
      out[i] = f(out[i + 1], input[i])
    }
    return out
  }

/**
 * Test whether a `ReadonlyArray` is empty narrowing down the type to `[]`.
 *
 * @category predicates
 * @since 1.0.0
 */
export const isEmpty = <A>(self: ReadonlyArray<A>): self is readonly [] => self.length === 0

/**
 * Test whether a `ReadonlyArray` is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`.
 *
 * @category predicates
 * @since 1.0.0
 */
export const isNonEmpty: <A>(self: ReadonlyArray<A>) => self is NonEmptyReadonlyArray<A> =
  readonlyArray.isNonEmpty

/**
 * Return the number of elements in a `ReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
export const size = <A>(self: ReadonlyArray<A>): number => self.length

const isOutOfBound = <A>(i: number, as: ReadonlyArray<A>): boolean => i < 0 || i >= as.length

const clamp = <A>(i: number, as: ReadonlyArray<A>): number =>
  Math.floor(Math.min(Math.max(0, i), as.length))

/**
 * This function provides a safe way to read a value at a particular index from a `ReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
export const get = (index: number) =>
  <A>(self: ReadonlyArray<A>): Option<A> => {
    const i = Math.floor(index)
    return isOutOfBound(i, self) ? option.none : option.some(self[i])
  }

/**
 * Return a tuple containing the first element, and a new `Array` of the remaining elements, if any.
 *
 * @category getters
 * @since 1.0.0
 */
export const unprepend = <A>(
  self: NonEmptyReadonlyArray<A>
): [A, Array<A>] => [headNonEmpty(self), tailNonEmpty(self)]

/**
 * Return a tuple containing a copy of the `NonEmptyReadonlyArray` without its last element, and that last element.
 *
 * @category getters
 * @since 1.0.0
 */
export const unappend = <A>(
  self: NonEmptyReadonlyArray<A>
): [Array<A>, A] => [initNonEmpty(self), lastNonEmpty(self)]

/**
 * Get the first element of a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export const head: <A>(self: ReadonlyArray<A>) => Option<A> = get(0)

/**
 * Gets an element unsafely, will throw on out of bounds.
 *
 * @since 1.0.0
 * @category unsafe
 */
export const unsafeGet = (index: number) =>
  <A>(self: ReadonlyArray<A>): A => {
    const i = Math.floor(index)
    if (isOutOfBound(i, self)) {
      throw new Error(`Index ${i} out of bounds`)
    }
    return self[i]
  }

/**
 * @category getters
 * @since 1.0.0
 */
export const headNonEmpty: <A>(self: NonEmptyReadonlyArray<A>) => A = unsafeGet(0)

/**
 * Get the last element in a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export const last = <A>(self: ReadonlyArray<A>): Option<A> =>
  isNonEmpty(self) ? option.some(lastNonEmpty(self)) : option.none

/**
 * @category getters
 * @since 1.0.0
 */
export const lastNonEmpty = <A>(as: NonEmptyReadonlyArray<A>): A => as[as.length - 1]

/**
 * Get all but the first element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export const tail = <A>(self: Iterable<A>): Option<Array<A>> => {
  const input = fromIterable(self)
  return isNonEmpty(input) ? option.some(tailNonEmpty(input)) : option.none
}

/**
 * @category getters
 * @since 1.0.0
 */
export const tailNonEmpty = <A>(self: NonEmptyReadonlyArray<A>): Array<A> => self.slice(1)

/**
 * Get all but the last element of an `Iterable`, creating a new `Array`, or `None` if the `Iterable` is empty.
 *
 * @category getters
 * @since 1.0.0
 */
export const init = <A>(self: Iterable<A>): Option<Array<A>> => {
  const input = fromIterable(self)
  return isNonEmpty(input) ? option.some(initNonEmpty(input)) : option.none
}

/**
 * Get all but the last element of a non empty array, creating a new array.
 *
 * @category getters
 * @since 1.0.0
 */
export const initNonEmpty = <A>(self: NonEmptyReadonlyArray<A>): Array<A> => self.slice(0, -1)

/**
 * Keep only a max number of elements from the start of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export const take = (n: number) =>
  <A>(self: Iterable<A>): Array<A> => {
    const input = fromIterable(self)
    return input.slice(0, clamp(n, input))
  }

/**
 * Keep only a max number of elements from the end of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export const takeRight = (n: number) =>
  <A>(self: Iterable<A>): Array<A> => {
    const input = fromIterable(self)
    const i = clamp(n, input)
    return i === 0 ? [] : input.slice(-i)
  }

/**
 * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.
 *
 * @category getters
 * @since 1.0.0
 */
export function takeWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (self: Iterable<A>) => Array<B>
export function takeWhile<A>(
  predicate: Predicate<A>
): <B extends A>(self: Iterable<B>) => Array<B>
export function takeWhile<A>(
  predicate: Predicate<A>
): (self: Iterable<A>) => Array<A> {
  return (self: Iterable<A>) => {
    const out: Array<A> = []
    for (const a of self) {
      if (!predicate(a)) {
        break
      }
      out.push(a)
    }
    return out
  }
}

const spanIndex = <A>(self: Iterable<A>, predicate: Predicate<A>): number => {
  let i = 0
  for (const a of self) {
    if (!predicate(a)) {
      break
    }
    i++
  }
  return i
}

/**
 * Split an `Iterable` into two parts:
 *
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 *
 * @category filtering
 * @since 1.0.0
 */
export function span<A, B extends A>(
  refinement: Refinement<A, B>
): (self: Iterable<A>) => [init: Array<B>, rest: Array<A>]
export function span<A>(
  predicate: Predicate<A>
): <B extends A>(
  self: Iterable<B>
) => [init: Array<B>, rest: Array<B>]
export function span<A>(
  predicate: Predicate<A>
): (self: Iterable<A>) => [init: Array<A>, rest: Array<A>]
export function span<A>(
  predicate: Predicate<A>
): (self: Iterable<A>) => [init: Array<A>, rest: Array<A>] {
  return (self) => splitAt(spanIndex(self, predicate))(self)
}

/**
 * Drop a max number of elements from the start of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export const drop = (n: number) =>
  <A>(self: Iterable<A>): Array<A> => {
    const input = fromIterable(self)
    return input.slice(clamp(n, input), input.length)
  }

/**
 * Drop a max number of elements from the end of an `Iterable`, creating a new `Array`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @category getters
 * @since 1.0.0
 */
export const dropRight = (n: number) =>
  <A>(self: Iterable<A>): Array<A> => {
    const input = fromIterable(self)
    return input.slice(0, input.length - clamp(n, input))
  }

/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new `Array`.
 *
 * @category getters
 * @since 1.0.0
 */
export function dropWhile<A, B extends A>(
  refinement: Refinement<A, B>
): (self: Iterable<A>) => Array<B>
export function dropWhile<A>(
  predicate: Predicate<A>
): <B extends A>(self: Iterable<B>) => Array<B>
export function dropWhile<A>(
  predicate: Predicate<A>
): (self: Iterable<A>) => Array<A>
export function dropWhile<A>(
  predicate: Predicate<A>
): (self: Iterable<A>) => Array<A> {
  return (self) => fromIterable(self).slice(spanIndex(self, predicate))
}

/**
 * Return the first index for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export const findFirstIndex = <A>(predicate: Predicate<A>) =>
  (self: Iterable<A>): Option<number> => {
    let i = 0
    for (const a of self) {
      if (predicate(a)) {
        return option.some(i)
      }
      i++
    }
    return option.none
  }

/**
 * Return the last index for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export const findLastIndex = <A>(predicate: Predicate<A>) =>
  (self: Iterable<A>): Option<number> => {
    const input = fromIterable(self)
    for (let i = input.length - 1; i >= 0; i--) {
      if (predicate(input[i])) {
        return option.some(i)
      }
    }
    return option.none
  }

/**
 * Find the first element for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export function findFirst<A, B extends A>(
  refinement: Refinement<A, B>
): (self: Iterable<A>) => Option<B>
export function findFirst<A>(
  predicate: Predicate<A>
): <B extends A>(self: Iterable<B>) => Option<B>
export function findFirst<A>(predicate: Predicate<A>): (self: Iterable<A>) => Option<A>
export function findFirst<A>(predicate: Predicate<A>): (self: Iterable<A>) => Option<A> {
  return (self) => {
    const input = fromIterable(self)
    for (let i = 0; i < input.length; i++) {
      if (predicate(input[i])) {
        return option.some(input[i])
      }
    }
    return option.none
  }
}

/**
 * Find the last element for which a predicate holds.
 *
 * @category getters
 * @since 1.0.0
 */
export function findLast<A, B extends A>(
  refinement: Refinement<A, B>
): (self: Iterable<A>) => Option<B>
export function findLast<A>(
  predicate: Predicate<A>
): <B extends A>(self: Iterable<B>) => Option<B>
export function findLast<A>(predicate: Predicate<A>): (self: Iterable<A>) => Option<A>
export function findLast<A>(predicate: Predicate<A>): (self: Iterable<A>) => Option<A> {
  return (self) => {
    const input = fromIterable(self)
    for (let i = input.length - 1; i >= 0; i--) {
      if (predicate(input[i])) {
        return option.some(input[i])
      }
    }
    return option.none
  }
}

/**
 * Insert an element at the specified index, creating a new `NonEmptyArray`,
 * or return `None` if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const insertAt = <B>(i: number, b: B) =>
  <A>(self: Iterable<A>): Option<NonEmptyArray<A | B>> => {
    const out: Array<A | B> = Array.from(self)
    //             v--- `= self.length` ok, it means inserting in last position
    if (i < 0 || i > out.length) {
      return option.none
    }
    out.splice(i, 0, b)
    return option.some(out) as any
  }

/**
 * Change the element at the specified index, creating a new `Array`,
 * or return a copy of the input if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const replace = <B>(
  i: number,
  b: B
): (<A>(self: Iterable<A>) => Array<A | B>) => modify(i, () => b)

/**
 * @since 1.0.0
 */
export const replaceOption = <B>(
  i: number,
  b: B
): (<A>(self: Iterable<A>) => Option<Array<A | B>>) => modifyOption(i, () => b)

/**
 * Apply a function to the element at the specified index, creating a new `Array`,
 * or return a copy of the input if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const modify = <A, B>(i: number, f: (a: A) => B) =>
  (self: Iterable<A>): Array<A | B> =>
    pipe(modifyOption(i, f)(self), O.getOrElse(() => Array.from(self)))

/**
 * Apply a function to the element at the specified index, creating a new `Array`,
 * or return `None` if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const modifyOption = <A, B>(i: number, f: (a: A) => B) =>
  (self: Iterable<A>): Option<Array<A | B>> => {
    const out = Array.from(self)
    if (isOutOfBound(i, out)) {
      return O.none()
    }
    const next = f(out[i])
    // @ts-expect-error
    out[i] = next
    return O.some(out)
  }

/**
 * Delete the element at the specified index, creating a new `Array`,
 * or return a copy of the input if the index is out of bounds.
 *
 * @since 1.0.0
 */
export const remove = (i: number) =>
  <A>(self: Iterable<A>): Array<A> => {
    const out = Array.from(self)
    if (isOutOfBound(i, out)) {
      return out
    }
    out.splice(i, 1)
    return out
  }

/**
 * Reverse an `Iterable`, creating a new `Array`.
 *
 * @since 1.0.0
 */
export const reverse = <A>(
  self: Iterable<A>
): Array<A> => Array.from(self).reverse()

/**
 * @since 1.0.0
 */
export const reverseNonEmpty = <A>(
  self: NonEmptyReadonlyArray<A>
): NonEmptyArray<A> => [lastNonEmpty(self), ...self.slice(0, -1).reverse()]

/**
 * Return all the `Right` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export const rights = <E, A>(self: Iterable<Either<E, A>>): Array<A> => {
  const out: Array<A> = []
  for (const a of self) {
    if (either.isRight(a)) {
      out.push(a.right)
    }
  }
  return out
}

/**
 * Return all the `Left` elements from an `Interable` of `Either`s.
 *
 * @category getters
 * @since 1.0.0
 */
export const lefts = <E, A>(self: Iterable<Either<E, A>>): Array<E> => {
  const out: Array<E> = []
  for (const a of self) {
    if (either.isLeft(a)) {
      out.push(a.left)
    }
  }
  return out
}

/**
 * Sort the elements of an `Iterable` in increasing order, creating a new `Array`.
 *
 * @category sorting
 * @since 1.0.0
 */
export const sort = <B>(O: Order<B>) =>
  <A extends B>(self: Iterable<A>): Array<A> => {
    const out = Array.from(self)
    out.sort(O.compare)
    return out
  }

/**
 * Sort the elements of a `NonEmptyReadonlyArray` in increasing order, creating a new `NonEmptyArray`.
 *
 * @category sorting
 * @since 1.0.0
 */
export const sortNonEmpty = <B>(O: Order<B>) =>
  <A extends B>(self: NonEmptyReadonlyArray<A>): NonEmptyArray<A> => sort(O)(self) as any

/**
 * Sort the elements of an `Iterable` in increasing order, where elements are compared
 * using first `orders[0]`, then `orders[1]`, etc...
 *
 * @category sorting
 * @since 1.0.0
 */
export const sortBy = <B>(...orders: ReadonlyArray<Order<B>>) =>
  <A extends B>(self: Iterable<A>): Array<A> => {
    const input = fromIterable(self)
    return (isNonEmpty(input) ? sortByNonEmpty(...orders)(input) : [])
  }

/**
 * @category sorting
 * @since 1.0.0
 */
export const sortByNonEmpty = <B>(
  ...orders: ReadonlyArray<Order<B>>
): (<A extends B>(as: NonEmptyReadonlyArray<A>) => NonEmptyArray<A>) =>
  sortNonEmpty(order.getMonoid<B>().combineAll(orders))

/**
 * Takes two `Iterable`s and returns an `Array` of corresponding pairs.
 * If one input `Iterable` is short, excess elements of the
 * longer `Iterable` are discarded.
 *
 * @since 1.0.0
 */
export const zip = <B>(that: Iterable<B>): <A>(self: Iterable<A>) => Array<[A, B]> =>
  zipWith(that, (a, b) => [a, b])

/**
 * Apply a function to pairs of elements at the same index in two `Iterable`s, collecting the results in a new `Array`. If one
 * input `Iterable` is short, excess elements of the longer `Iterable` are discarded.
 *
 * @since 1.0.0
 */
export const zipWith = <B, A, C>(that: Iterable<B>, f: (a: A, b: B) => C) =>
  (self: Iterable<A>): Array<C> => {
    const as = fromIterable(self)
    const bs = fromIterable(that)
    return isNonEmpty(as) && isNonEmpty(bs) ? zipNonEmptyWith(bs, f)(as) : []
  }

/**
 * @since 1.0.0
 */
export const zipNonEmpty = <B>(that: NonEmptyReadonlyArray<B>) =>
  <A>(self: NonEmptyReadonlyArray<A>): NonEmptyArray<[A, B]> =>
    pipe(self, zipNonEmptyWith(that, (a, b) => [a, b]))

/**
 * @since 1.0.0
 */
export const zipNonEmptyWith = <B, A, C>(that: NonEmptyReadonlyArray<B>, f: (a: A, b: B) => C) =>
  (self: NonEmptyReadonlyArray<A>): NonEmptyArray<C> => {
    const cs: NonEmptyArray<C> = [f(headNonEmpty(self), headNonEmpty(that))]
    const len = Math.min(self.length, that.length)
    for (let i = 1; i < len; i++) {
      cs[i] = f(self[i], that[i])
    }
    return cs
  }

/**
 * This function is the inverse of `zip`. Takes an `Iterable` of pairs and return two corresponding `Array`s.
 *
 * @since 1.0.0
 */
export const unzip = <A, B>(self: Iterable<[A, B]>): [Array<A>, Array<B>] => {
  const input = fromIterable(self)
  return isNonEmpty(input) ? unzipNonEmpty(input) : [[], []]
}

/**
 * @since 1.0.0
 */
export const unzipNonEmpty = <A, B>(
  self: NonEmptyReadonlyArray<[A, B]>
): [NonEmptyArray<A>, NonEmptyArray<B>] => {
  const fa: NonEmptyArray<A> = [self[0][0]]
  const fb: NonEmptyArray<B> = [self[0][1]]
  for (let i = 1; i < self.length; i++) {
    fa[i] = self[i][0]
    fb[i] = self[i][1]
  }
  return [fa, fb]
}

/**
 * Places an element in between members of an `Iterable`
 *
 * @since 1.0.0
 */
export const intersperse = <B>(middle: B) =>
  <A>(self: Iterable<A>): Array<A | B> => {
    const input = fromIterable(self)
    return (isNonEmpty(input) ? intersperseNonEmpty(middle)(input) : [])
  }

/**
 * Places an element in between members of a `NonEmptyReadonlyArray`
 *
 * @since 1.0.0
 */
export const intersperseNonEmpty = <B>(middle: B) =>
  <A>(self: NonEmptyReadonlyArray<A>): NonEmptyArray<A | B> => {
    const out: NonEmptyArray<A | B> = [headNonEmpty(self)]
    const tail = tailNonEmpty(self)
    for (let i = 0; i < tail.length; i++) {
      if (i < tail.length) {
        out.push(middle)
      }
      out.push(tail[i])
    }
    return out
  }

/**
 * Apply a function to the head, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const modifyNonEmptyHead = <A, B>(f: (a: A) => B) =>
  (
    self: NonEmptyReadonlyArray<A>
  ): NonEmptyArray<A | B> => [f(headNonEmpty(self)), ...tailNonEmpty(self)]

/**
 * Change the head, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const setNonEmptyHead = <B>(
  b: B
): (<A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>) => modifyNonEmptyHead(() => b)

/**
 * Apply a function to the last element, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const modifyNonEmptyLast = <A, B>(f: (a: A) => B) =>
  (self: NonEmptyReadonlyArray<A>): NonEmptyArray<A | B> =>
    pipe(initNonEmpty(self), append(f(lastNonEmpty(self))))

/**
 * Change the last element, creating a new `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const setNonEmptyLast = <B>(
  b: B
): (<A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A | B>) => modifyNonEmptyLast(() => b)

/**
 * Rotate an `Iterable` by `n` steps.
 *
 * @since 1.0.0
 */
export const rotate = (n: number) =>
  <A>(self: Iterable<A>): Array<A> => {
    const input = fromIterable(self)
    return isNonEmpty(input) ? rotateNonEmpty(n)(input) : []
  }

/**
 * Rotate a `NonEmptyReadonlyArray` by `n` steps.
 *
 * @since 1.0.0
 */
export const rotateNonEmpty = (n: number) =>
  <A>(self: NonEmptyReadonlyArray<A>): NonEmptyArray<A> => {
    const len = self.length
    const m = Math.round(n) % len
    if (isOutOfBound(Math.abs(m), self) || m === 0) {
      return copy(self)
    }
    if (m < 0) {
      const [f, s] = splitNonEmptyAt(-m)(self)
      return appendAllNonEmpty(f)(s)
    } else {
      return rotateNonEmpty(m - len)(self)
    }
  }

/**
 * Returns a function that checks if a `ReadonlyArray` contains a given value using a provided `equivalence` function.
 *
 * @category predicates
 * @since 1.0.0
 */
export const contains = <A>(equivalence: Equivalence<A>) =>
  (a: A) =>
    (self: Iterable<A>): boolean => {
      for (const i of self) {
        if (equivalence(a, i)) {
          return true
        }
      }
      return false
    }

/**
 * Remove duplicates from am `Iterable`, keeping the first occurrence of an element.
 *
 * @since 1.0.0
 */
export const uniq = <A>(equivalence: Equivalence<A>) =>
  (self: Iterable<A>): Array<A> => {
    const input = fromIterable(self)
    return isNonEmpty(input) ? uniqNonEmpty(equivalence)(input) : []
  }

/**
 * Remove duplicates from a `NonEmptyReadonlyArray`, keeping the first occurrence of an element.
 *
 * @since 1.0.0
 */
export const uniqNonEmpty = <A>(equivalence: Equivalence<A>) =>
  (self: NonEmptyReadonlyArray<A>): NonEmptyArray<A> => {
    const out: NonEmptyArray<A> = [headNonEmpty(self)]
    const rest = tailNonEmpty(self)
    for (const a of rest) {
      if (out.every((o) => !equivalence(a, o))) {
        out.push(a)
      }
    }
    return out
  }

/**
 * A useful recursion pattern for processing an `Iterable` to produce a new `Array`, often used for "chopping" up the input
 * `Iterable`. Typically chop is called with some function that will consume an initial prefix of the `Iterable` and produce a
 * value and the rest of the `Array`.
 *
 * @since 1.0.0
 */
export const chop = <A, B>(
  f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]
) =>
  (self: Iterable<A>): Array<B> => {
    const input = fromIterable(self)
    return isNonEmpty(input) ? chopNonEmpty(f)(input) : []
  }

/**
 * A useful recursion pattern for processing a `NonEmptyReadonlyArray` to produce a new `NonEmptyReadonlyArray`, often used for "chopping" up the input
 * `NonEmptyReadonlyArray`. Typically `chop` is called with some function that will consume an initial prefix of the `NonEmptyReadonlyArray` and produce a
 * value and the tail of the `NonEmptyReadonlyArray`.
 *
 * @since 1.0.0
 */
export const chopNonEmpty = <A, B>(
  f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]
) =>
  (self: NonEmptyReadonlyArray<A>): NonEmptyArray<B> => {
    const [b, rest] = f(self)
    const out: NonEmptyArray<B> = [b]
    let next: ReadonlyArray<A> = rest
    while (readonlyArray.isNonEmpty(next)) {
      const [b, rest] = f(next)
      out.push(b)
      next = rest
    }
    return out
  }

/**
 * Splits an `Iterable` into two pieces, the first piece has max `n` elements.
 *
 * @category getters
 * @since 1.0.0
 */
export const splitAt = (n: number) =>
  <A>(self: Iterable<A>): [Array<A>, Array<A>] => {
    const input = Array.from(self)
    return n >= 1 && isNonEmpty(input) ?
      splitNonEmptyAt(n)(input) :
      isEmpty(input) ?
      [input, []] :
      [[], input]
  }

/**
 * @since 1.0.0
 */
export function copy<A>(self: NonEmptyReadonlyArray<A>): NonEmptyArray<A>
export function copy<A>(self: ReadonlyArray<A>): Array<A>
export function copy<A>(self: ReadonlyArray<A>): Array<A> {
  return self.slice()
}

/**
 * Splits a `NonEmptyReadonlyArray` into two pieces, the first piece has max `n` elements.
 *
 * @category getters
 * @since 1.0.0
 */
export const splitNonEmptyAt = (n: number) =>
  <A>(self: NonEmptyReadonlyArray<A>): [NonEmptyArray<A>, Array<A>] => {
    const m = Math.max(1, n)
    return m >= self.length ?
      [copy(self), []] :
      [pipe(self.slice(1, m), prepend(headNonEmpty(self))), self.slice(m)]
  }

/**
 * Splits an `Iterable` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `Iterable`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `self`.
 *
 * @category getters
 * @since 1.0.0
 */
export const chunksOf = (n: number) =>
  <A>(self: Iterable<A>): Array<NonEmptyArray<A>> => {
    const input = fromIterable(self)
    return isNonEmpty(input) ? chunksOfNonEmpty(n)(input) : []
  }

/**
 * Splits a `NonEmptyReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `NonEmptyReadonlyArray`.
 *
 * @category getters
 * @since 1.0.0
 */
export const chunksOfNonEmpty = (
  n: number
): (<A>(self: NonEmptyReadonlyArray<A>) => NonEmptyArray<NonEmptyArray<A>>) =>
  chopNonEmpty(splitNonEmptyAt(n))

/**
 * Group equal, consecutive elements of a `NonEmptyReadonlyArray` into `NonEmptyArray`s.
 *
 * @category grouping
 * @since 1.0.0
 */
export const group = <A>(equivalence: Equivalence<A>) =>
  (self: NonEmptyReadonlyArray<A>): NonEmptyArray<NonEmptyArray<A>> =>
    pipe(
      self,
      chopNonEmpty((as) => {
        const h = headNonEmpty(as)
        const out: NonEmptyArray<A> = [h]
        let i = 1
        for (; i < as.length; i++) {
          const a = as[i]
          if (equivalence(a, h)) {
            out.push(a)
          } else {
            break
          }
        }
        return [out, as.slice(i)]
      })
    )

/**
 * Splits an `Iterable` into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 *
 * @category grouping
 * @since 1.0.0
 */
export const groupBy = <A>(f: (a: A) => string) =>
  (self: Iterable<A>): Record<string, NonEmptyArray<A>> => {
    const out: Record<string, NonEmptyArray<A>> = {}
    for (const a of self) {
      const k = f(a)
      if (Object.prototype.hasOwnProperty.call(out, k)) {
        out[k].push(a)
      } else {
        out[k] = [a]
      }
    }
    return out
  }

/**
 * @since 1.0.0
 */
export const union = <A>(equivalence: Equivalence<A>) =>
  (that: ReadonlyArray<A>) =>
    (self: ReadonlyArray<A>): Array<A> => {
      const a = Array.from(self)
      const b = Array.from(that)
      return isNonEmpty(a) && isNonEmpty(b) ?
        unionNonEmpty(equivalence)(b)(a) :
        isNonEmpty(a) ?
        a :
        b
    }

/**
 * @since 1.0.0
 */
export const unionNonEmpty = <A>(equivalence: Equivalence<A>): {
  (that: NonEmptyReadonlyArray<A>): (self: ReadonlyArray<A>) => NonEmptyArray<A>
  (that: ReadonlyArray<A>): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<A>
} =>
  // @ts-expect-error
  (that: ReadonlyArray<A>) =>
    (self: NonEmptyReadonlyArray<A>): NonEmptyArray<A> =>
      uniqNonEmpty(equivalence)(appendAllNonEmpty(that)(self))

/**
 * Creates an `Array` of unique values that are included in all given `Iterable`s.
 * The order and references of result values are determined by the first `Iterable`.
 *
 * @since 1.0.0
 */
export const intersection = <A>(equivalence: Equivalence<A>) =>
  (that: Iterable<A>) =>
    (self: Iterable<A>): Array<A> =>
      fromIterable(self).filter((a) => contains(equivalence)(a)(that))

/**
 * Creates a `Array` of values not included in the other given `Iterable`.
 * The order and references of result values are determined by the first `Iterable`.
 *
 * @since 1.0.0
 */
export const difference = <A>(equivalence: Equivalence<A>) =>
  (that: Iterable<A>) =>
    (self: Iterable<A>): Array<A> =>
      fromIterable(self).filter((a) => !contains(equivalence)(a)(that))

/**
 * @category constructors
 * @since 1.0.0
 */
export const of = <A>(a: A): NonEmptyArray<A> => [a]

/**
 * @category constructors
 * @since 1.0.0
 */
export const empty: <A = never>() => Array<A> = () => []

/**
 * @category mapping
 * @since 1.0.0
 */
export const map = <A, B>(f: (a: A) => B): (self: ReadonlyArray<A>) => Array<B> =>
  mapWithIndex((a) => f(a))

/**
 * @category mapping
 * @since 1.0.0
 */
export const mapNonEmpty = <A, B>(
  f: (a: A) => B
): (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<B> => mapNonEmptyWithIndex(f)

/**
 * @category mapping
 * @since 1.0.0
 */
export const mapWithIndex = <A, B>(
  f: (a: A, i: number) => B
) => (self: ReadonlyArray<A>): Array<B> => self.map((a, i) => f(a, i))

/**
 * @category mapping
 * @since 1.0.0
 */
export const mapNonEmptyWithIndex = <A, B>(
  f: (a: A, i: number) => B
) =>
  (self: NonEmptyReadonlyArray<A>): NonEmptyArray<B> => {
    const out: NonEmptyArray<B> = [f(headNonEmpty(self), 0)]
    for (let i = 1; i < self.length; i++) {
      out.push(f(self[i], i))
    }
    return out
  }

/**
 * @category instances
 * @since 1.0.0
 */
export const Of: of_.Of<ReadonlyArrayTypeLambda> = {
  of
}

/**
 * @category do notation
 * @since 1.0.0
 */
export const Do: ReadonlyArray<{}> = of_.Do(Of)

/**
 * @category mapping
 * @since 1.0.0
 */
export const imap: <A, B>(
  to: (a: A) => B,
  from: (b: B) => A
) => (self: ReadonlyArray<A>) => Array<B> = covariant.imap<ReadonlyArrayTypeLambda>(map) as any

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<ReadonlyArrayTypeLambda> = {
  imap
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const tupled: <A>(self: ReadonlyArray<A>) => Array<[A]> = invariant
  .tupled(Invariant) as any

/**
 * @category do notation
 * @since 1.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <A>(self: ReadonlyArray<A>) => Array<{ [K in N]: A }> = invariant
  .bindTo(Invariant) as any

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<ReadonlyArrayTypeLambda> = covariant.make(map)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (
  self: ReadonlyArray<A>
) => Array<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }> = covariant.let(Covariant) as any

export {
  /**
   * @category do notation
   * @since 1.0.0
   */
  let_ as let
}

/**
 * @category mapping
 * @since 1.0.0
 */
export const flap: <A>(a: A) => <B>(
  self: ReadonlyArray<(a: A) => B>
) => Array<B> = covariant.flap(Covariant) as any

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 1.0.0
 */
export const as: <B>(b: B) => (self: ReadonlyArray<unknown>) => Array<B> = covariant.as(
  Covariant
) as any

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<ReadonlyArrayTypeLambda> = {
  ...Of,
  ...Covariant
}

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapWithIndex = <A, B>(f: (a: A, i: number) => ReadonlyArray<B>) =>
  (self: ReadonlyArray<A>): Array<B> => {
    if (isEmpty(self)) {
      return []
    }
    const out: Array<B> = []
    for (let i = 0; i < self.length; i++) {
      out.push(...f(self[i], i))
    }
    return out
  }

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMap: <A, B>(
  f: (a: A) => ReadonlyArray<B>
) => (self: ReadonlyArray<A>) => Array<B> = (f) => flatMapWithIndex(f)

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapNonEmptyWithIndex = <A, B>(f: (a: A, i: number) => NonEmptyReadonlyArray<B>) =>
  (self: NonEmptyReadonlyArray<A>): NonEmptyArray<B> => {
    const out: NonEmptyArray<B> = copy(f(headNonEmpty(self), 0))
    for (let i = 1; i < self.length; i++) {
      out.push(...f(self[i], i))
    }
    return out
  }

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapNonEmpty: <A, B>(
  f: (a: A) => NonEmptyReadonlyArray<B>
) => (self: NonEmptyReadonlyArray<A>) => NonEmptyArray<B> = (f) => flatMapNonEmptyWithIndex(f)

/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<ReadonlyArrayTypeLambda> = {
  flatMap
}

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatten: <A>(self: ReadonlyArray<ReadonlyArray<A>>) => Array<A> = flatMap_
  .flatten(FlatMap) as any

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flattenNonEmpty: <A>(
  self: NonEmptyReadonlyArray<NonEmptyReadonlyArray<A>>
) => NonEmptyArray<A> = flatMapNonEmpty(identity)

/**
 * @since 1.0.0
 */
export const composeKleisliArrow: <B, C>(
  bfc: (b: B) => ReadonlyArray<C>
) => <A>(afb: (a: A) => ReadonlyArray<B>) => (a: A) => ReadonlyArray<C> = flatMap_
  .composeKleisliArrow(FlatMap)

/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<ReadonlyArrayTypeLambda> = {
  ...FlatMap,
  ...Covariant
}

/**
 * @category do notation
 * @since 1.0.0
 */
export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReadonlyArray<B>
) => (
  self: ReadonlyArray<A>
) => Array<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }> = chainable.bind(Chainable) as any

/**
 * @category filtering
 * @since 1.0.0
 */
export const filterMapWithIndex = <A, B>(f: (a: A, i: number) => Option<B>) =>
  (self: Iterable<A>): Array<B> => {
    const as = fromIterable(self)
    const out: Array<B> = []
    for (let i = 0; i < as.length; i++) {
      const o = f(as[i], i)
      if (option.isSome(o)) {
        out.push(o.value)
      }
    }
    return out
  }

/**
 * @category filtering
 * @since 1.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (self: Iterable<A>) => Array<B> = (f) =>
  filterMapWithIndex(f)

/**
 * @category filtering
 * @since 1.0.0
 */
export const compact: <A>(self: Iterable<Option<A>>) => Array<A> = filterMap(identity)

/**
 * @category instances
 * @since 1.0.0
 */
export const Compactable: compactable.Compactable<ReadonlyArrayTypeLambda> = {
  compact
}

/**
 * @category filtering
 * @since 1.0.0
 */
export const separate = <A, B>(
  self: ReadonlyArray<Either<A, B>>
): [Array<A>, Array<B>] => {
  const left: Array<A> = []
  const right: Array<B> = []
  for (const e of self) {
    if (either.isLeft(e)) {
      left.push(e.left)
    } else {
      right.push(e.right)
    }
  }
  return [left, right]
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Filterable: filterable.Filterable<ReadonlyArrayTypeLambda> = {
  filterMap
}

/**
 * @category filtering
 * @since 1.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(
    refinement: Refinement<A, B>
  ): (self: ReadonlyArray<C>) => Array<B>
  <B extends A, A = B>(predicate: Predicate<A>): (self: ReadonlyArray<B>) => Array<B>
} = filterable.filter(Filterable) as any

/**
 * @category filtering
 * @since 1.0.0
 */
export const filterWithIndex: {
  <C extends A, B extends A, A = C>(
    refinement: (a: A, i: number) => a is B
  ): (self: ReadonlyArray<C>) => Array<B>
  <B extends A, A = B>(
    predicate: (a: A, i: number) => boolean
  ): (self: ReadonlyArray<B>) => Array<B>
} = <B extends A, A = B>(
  predicate: (a: A, i: number) => boolean
): ((self: ReadonlyArray<B>) => Array<B>) =>
  filterMapWithIndex((b, i) => (predicate(b, i) ? option.some(b) : option.none))

/**
 * @category filtering
 * @since 1.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    self: ReadonlyArray<C>
  ) => [Array<C>, Array<B>]
  <B extends A, A = B>(
    predicate: Predicate<A>
  ): (self: ReadonlyArray<B>) => [Array<B>, Array<B>]
} = filterable.partition(Filterable) as any

/**
 * @category filtering
 * @since 1.0.0
 */
export const partitionWithIndex: {
  <C extends A, B extends A, A = C>(refinement: (a: A, i: number) => a is B): (
    self: ReadonlyArray<C>
  ) => [Array<C>, Array<B>]
  <B extends A, A = B>(predicate: (a: A, i: number) => boolean): (
    self: ReadonlyArray<B>
  ) => [Array<B>, Array<B>]
} = <B extends A, A = B>(
  predicate: (a: A, i: number) => boolean
): ((self: ReadonlyArray<B>) => [Array<B>, Array<B>]) =>
  partitionMapWithIndex((b, i) => (predicate(b, i) ? either.right(b) : either.left(b)))

/**
 * @category filtering
 * @since 1.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (self: ReadonlyArray<A>) => [Array<B>, Array<C>] = (f) => partitionMapWithIndex(f)

/**
 * @category filtering
 * @since 1.0.0
 */
export const partitionMapWithIndex = <A, B, C>(f: (a: A, i: number) => Either<B, C>) =>
  (self: ReadonlyArray<A>): [Array<B>, Array<C>] => {
    const left: Array<B> = []
    const right: Array<C> = []
    for (let i = 0; i < self.length; i++) {
      const e = f(self[i], i)
      if (either.isLeft(e)) {
        left.push(e.left)
      } else {
        right.push(e.right)
      }
    }
    return [left, right]
  }

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverse = <F extends TypeLambda>(F: applicative.Applicative<F>) =>
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): ((self: ReadonlyArray<A>) => Kind<F, R, O, E, Array<B>>) => traverseWithIndex(F)(f)

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseWithIndex = <F extends TypeLambda>(F: applicative.Applicative<F>) =>
  <A, R, O, E, B>(f: (a: A, i: number) => Kind<F, R, O, E, B>) =>
    (self: ReadonlyArray<A>): Kind<F, R, O, E, Array<B>> => F.productAll(self.map(f))

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseNonEmpty = <F extends TypeLambda>(
  F: semiApplicative.SemiApplicative<F>
) =>
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): ((self: NonEmptyReadonlyArray<A>) => Kind<F, R, O, E, NonEmptyArray<B>>) =>
    traverseNonEmptyWithIndex(F)(f)

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseNonEmptyWithIndex = <F extends TypeLambda>(
  F: semiApplicative.SemiApplicative<F>
) =>
  <A, R, O, E, B>(f: (a: A, i: number) => Kind<F, R, O, E, B>) =>
    (self: NonEmptyReadonlyArray<A>): Kind<F, R, O, E, NonEmptyArray<B>> => {
      const fbs = pipe(self, mapNonEmptyWithIndex(f))
      return pipe(headNonEmpty(fbs), F.productMany(tailNonEmpty(fbs)))
    }

/**
 * @category traversing
 * @since 1.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <R, O, E, A>(
  self: ReadonlyArray<Kind<F, R, O, E, A>>
) => Kind<F, R, O, E, Array<A>> = traversable.sequence<ReadonlyArrayTypeLambda>(
  traverse as any
) as any

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<ReadonlyArrayTypeLambda> = {
  // @ts-expect-error
  traverse,
  // @ts-expect-error
  sequence
}

/**
 * @category traversing
 * @since 1.0.0
 */
export const traverseTap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, R, O, E, B>(
  f: (a: A) => Kind<F, R, O, E, B>
) => (self: ReadonlyArray<A>) => Kind<F, R, O, E, Array<A>> = traversable
  .traverseTap(Traversable) as any

/**
 * @category traversing
 * @since 1.0.0
 */
export const sequenceNonEmpty = <F extends TypeLambda>(
  F: semiApplicative.SemiApplicative<F>
): (<R, O, E, A>(
  self: NonEmptyReadonlyArray<Kind<F, R, O, E, A>>
) => Kind<F, R, O, E, NonEmptyArray<A>>) => traverseNonEmpty(F)(identity)

/**
 * @since 1.0.0
 */
export const product = <B>(
  that: ReadonlyArray<B>
) =>
  <A>(self: ReadonlyArray<A>): Array<[A, B]> => {
    if (isEmpty(self) || isEmpty(that)) {
      return empty()
    }
    const out: Array<[A, B]> = []
    for (let i = 0; i < self.length; i++) {
      for (let j = 0; j < that.length; j++) {
        out.push([self[i], that[j]])
      }
    }
    return out
  }

/**
 * @since 1.0.0
 */
export const productMany: <A>(
  collection: Iterable<ReadonlyArray<A>>
) => (self: ReadonlyArray<A>) => Array<[A, ...Array<A>]> = semiProduct
  .productMany(Covariant, product) as any

/**
 * @since 1.0.0
 */
export const productAll = <A>(
  collection: Iterable<ReadonlyArray<A>>
): Array<Array<A>> => {
  const arrays = Array.from(collection)
  if (isEmpty(arrays)) {
    return empty()
  }
  return productMany(arrays.slice(1))(arrays[0])
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<ReadonlyArrayTypeLambda> = {
  ...Invariant,
  product,
  productMany
}

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 1.0.0
 */
export const andThenBind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  that: ReadonlyArray<B>
) => (
  self: ReadonlyArray<A>
) => Array<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }> = semiProduct
  .andThenBind(SemiProduct) as any

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<ReadonlyArrayTypeLambda> = {
  ...SemiProduct,
  ...Covariant
}

/**
 * @since 1.0.0
 */
export const ap: <A>(
  fa: ReadonlyArray<A>
) => <B>(self: ReadonlyArray<(a: A) => B>) => Array<B> = semiApplicative.ap(
  SemiApplicative
) as any

/**
 * Lifts a binary function into `ReadonlyArray`.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => (fa: ReadonlyArray<A>, fb: ReadonlyArray<B>) => Array<C> = semiApplicative.lift2(
  SemiApplicative
) as any

/**
 * Lifts a ternary function into `ReadonlyArray`.
 *
 * @category lifting
 * @since 1.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: ReadonlyArray<A>, fb: ReadonlyArray<B>, fc: ReadonlyArray<C>) => Array<D> =
  semiApplicative.lift3(SemiApplicative) as any

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftSemigroup: <A>(S: Semigroup<A>) => Semigroup<ReadonlyArray<A>> = semiApplicative
  .liftSemigroup(
    SemiApplicative
  )

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<ReadonlyArrayTypeLambda> = {
  ...Of,
  ...SemiProduct,
  productAll
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<ReadonlyArrayTypeLambda> = {
  ...SemiApplicative,
  ...Product
}

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftMonoid: <A>(M: Monoid<A>) => Monoid<ReadonlyArray<A>> = applicative
  .liftMonoid(
    Applicative
  )

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<ReadonlyArrayTypeLambda> = {
  ...Pointed,
  ...FlatMap
}

/**
 * @category folding
 * @since 1.0.0
 */
export const reduce = <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: ReadonlyArray<A>): B => self.reduce((b, a) => f(b, a), b)

/**
 * @category folding
 * @since 1.0.0
 */
export const reduceWithIndex = <B, A>(b: B, f: (b: B, a: A, i: number) => B) =>
  (self: ReadonlyArray<A>): B => self.reduce((b, a, i) => f(b, a, i), b)

/**
 * @category folding
 * @since 1.0.0
 */
export const reduceRight = <B, A>(b: B, f: (b: B, a: A) => B) =>
  (self: ReadonlyArray<A>): B => self.reduceRight((b, a) => f(b, a), b)

/**
 * @category folding
 * @since 1.0.0
 */
export const reduceRightWithIndex = <B, A>(b: B, f: (b: B, a: A, i: number) => B) =>
  (self: ReadonlyArray<A>): B => self.reduceRight((b, a, i) => f(b, a, i), b)

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<ReadonlyArrayTypeLambda> = {
  reduce
}

/**
 * @category folding
 * @since 1.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (self: ReadonlyArray<A>) => M =
  foldable.foldMap(Foldable)

/**
 * @category folding
 * @since 1.0.0
 */
export const foldMapWithIndex = <M>(Monoid: Monoid<M>) =>
  <A>(f: (a: A, i: number) => M) =>
    (self: ReadonlyArray<A>): M =>
      self.reduce((m, a, i) => Monoid.combine(f(a, i))(m), Monoid.empty)

/**
 * @category folding
 * @since 1.0.0
 */
export const foldMapNonEmpty = <S>(S: Semigroup<S>) =>
  <A>(f: (a: A) => S): (self: NonEmptyReadonlyArray<A>) => S => foldMapNonEmptyWithIndex(S)(f)

/**
 * @category folding
 * @since 1.0.0
 */
export const foldMapNonEmptyWithIndex = <S>(S: Semigroup<S>) =>
  <A>(f: (a: A, i: number) => S) =>
    (self: NonEmptyReadonlyArray<A>): S =>
      tailNonEmpty(self).reduce((s, a, i) => S.combine(f(a, i + 1))(s), f(headNonEmpty(self), 0))

/**
 * @category folding
 * @since 1.0.0
 */
export const reduceKind: <F extends TypeLambda>(F: monad.Monad<F>) => <B, A, R, O, E>(
  b: B,
  f: (b: B, a: A) => Kind<F, R, O, E, B>
) => (self: ReadonlyArray<A>) => Kind<F, R, O, E, B> = foldable.reduceKind(Foldable)

/**
 * @category folding
 * @since 1.0.0
 */
export const reduceRightKind: <F extends TypeLambda>(F: monad.Monad<F>) => <B, A, R, O, E>(
  b: B,
  f: (b: B, a: A) => Kind<F, R, O, E, B>
) => (self: ReadonlyArray<A>) => Kind<F, R, O, E, B> = foldable
  .reduceRightKind(Foldable)

/**
 * @category folding
 * @since 1.0.0
 */
export const foldMapKind: <F extends TypeLambda>(F: Coproduct<F>) => <A, R, O, E, B>(
  f: (a: A) => Kind<F, R, O, E, B>
) => (self: ReadonlyArray<A>) => Kind<F, R, O, E, B> = foldable.foldMapKind(Foldable)

/**
 * @category filtering
 * @since 1.0.0
 */
export const traverseFilterMap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, R, O, E, B>(
  f: (a: A) => Kind<F, R, O, E, Option<B>>
) => (ta: ReadonlyArray<A>) => Kind<F, R, O, E, Array<B>> = traversableFilterable
  .traverseFilterMap({ ...Traversable, ...Compactable }) as any

/**
 * @category filtering
 * @since 1.0.0
 */
export const traversePartitionMap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, R, O, E, B, C>(
  f: (a: A) => Kind<F, R, O, E, Either<B, C>>
) => (self: ReadonlyArray<A>) => Kind<F, R, O, E, [Array<B>, Array<C>]> = traversableFilterable
  .traversePartitionMap({ ...Traversable, ...Covariant, ...Compactable }) as any

/**
 * @category instances
 * @since 1.0.0
 */
export const TraversableFilterable: traversableFilterable.TraversableFilterable<
  ReadonlyArrayTypeLambda
> = {
  // @ts-expect-error
  traverseFilterMap,
  // @ts-expect-error
  traversePartitionMap
}

/**
 * Filter values inside a context.
 *
 * @since 1.0.0
 */
export const traverseFilter: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <B extends A, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, R, O, E, boolean>
) => (self: ReadonlyArray<B>) => Kind<F, R, O, E, Array<B>> = traversableFilterable
  .traverseFilter(TraversableFilterable) as any

/**
 * @since 1.0.0
 */
export const traversePartition: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <B extends A, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, R, O, E, boolean>
) => (
  self: ReadonlyArray<B>
) => Kind<F, R, O, E, [Array<B>, Array<B>]> = traversableFilterable
  .traversePartition(TraversableFilterable) as any

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => Array<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => Array<B>
} = <B extends A, A = B>(predicate: Predicate<A>) => (b: B) => predicate(b) ? [b] : []

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftOption = <A extends Array<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A): Array<B> => fromOption(f(...a))

/**
 * @category conversions
 * @since 1.0.0
 */
export const fromNullable = <A>(a: A): Array<NonNullable<A>> =>
  a == null ? empty() : [a as NonNullable<A>]

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftNullable = <A extends Array<unknown>, B>(
  f: (...a: A) => B | null | undefined
): (...a: A) => Array<NonNullable<B>> => (...a) => fromNullable(f(...a))

/**
 * @category sequencing
 * @since 1.0.0
 */
export const flatMapNullable = <A, B>(
  f: (a: A) => B | null | undefined
) =>
  (self: ReadonlyArray<A>): Array<NonNullable<B>> =>
    isNonEmpty(self) ? fromNullable(f(headNonEmpty(self))) : empty()

/**
 * @category lifting
 * @since 1.0.0
 */
export const liftEither = <A extends Array<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) =>
  (...a: A): Array<B> => {
    const e = f(...a)
    return either.isLeft(e) ? [] : [e.right]
  }

/**
 * Check if a predicate holds true for every `ReadonlyArray` member.
 *
 * @category lifting
 * @since 1.0.0
 */
export function every<A, B extends A>(
  refinement: Refinement<A, B>
): Refinement<ReadonlyArray<A>, ReadonlyArray<B>>
export function every<A>(predicate: Predicate<A>): Predicate<ReadonlyArray<A>>
export function every<A>(predicate: Predicate<A>): Predicate<ReadonlyArray<A>> {
  return (self) => self.every(predicate)
}

/**
 * Check if a predicate holds true for any `ReadonlyArray` member.
 *
 * @category predicates
 * @since 1.0.0
 */
export const some = <A>(predicate: Predicate<A>) =>
  (self: ReadonlyArray<A>): self is NonEmptyReadonlyArray<A> => self.some(predicate)

/**
 * Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements
 * using the specified separator.
 *
 * @since 1.0.0
 */
export const intercalate = <A>(M: Monoid<A>) =>
  (middle: A) =>
    (self: ReadonlyArray<A>): A => isNonEmpty(self) ? intercalateNonEmpty(M)(middle)(self) : M.empty

/**
 * Places an element in between members of a `NonEmptyReadonlyArray`, then folds the results using the provided `Semigroup`.
 *
 * @since 1.0.0
 */
export const intercalateNonEmpty = <A>(
  S: Semigroup<A>
) =>
  (middle: A) =>
    (self: NonEmptyReadonlyArray<A>): A =>
      semigroup.intercalate(middle)(S).combineMany(tailNonEmpty(self))(headNonEmpty(self))

/**
 * @since 1.0.0
 */
export const join: (sep: string) => (self: ReadonlyArray<string>) => string = intercalate(
  string.Monoid
)

/**
 * Adds an element to the end of a tuple.
 *
 * @since 1.0.0
 */
export const element: <B>(that: ReadonlyArray<B>) => <A extends ReadonlyArray<unknown>>(
  self: ReadonlyArray<A>
) => Array<[...A, B]> = semiProduct.element(SemiProduct) as any

/**
 * @since 1.0.0
 */
export const extend = <A, B>(
  f: (as: ReadonlyArray<A>) => B
) => (self: ReadonlyArray<A>): Array<B> => self.map((_, i, as) => f(as.slice(i)))

/**
 * @since 1.0.0
 */
export const min = <A>(O: Order<A>): ((self: NonEmptyReadonlyArray<A>) => A) => {
  const S = semigroup.min(O)
  return (self) => self.reduce((a, acc) => S.combine(acc)(a))
}

/**
 * @since 1.0.0
 */
export const max = <A>(O: Order<A>): ((self: NonEmptyReadonlyArray<A>) => A) => {
  const S = semigroup.max(O)
  return (self) => self.reduce((a, acc) => S.combine(acc)(a))
}

/**
 * @category constructors
 * @since 1.0.0
 */
export const unfold = <B, A>(b: B, f: (b: B) => Option<readonly [A, B]>): Array<A> => {
  const out: Array<A> = []
  let next: B = b
  let o: Option<readonly [A, B]>
  while (option.isSome(o = f(next))) {
    const [a, b] = o.value
    out.push(a)
    next = b
  }
  return out
}

/**
 * @category instances
 * @since 1.0.0
 */
export const getUnionSemigroup = <A>(equivalence: Equivalence<A>): Semigroup<ReadonlyArray<A>> =>
  fromCombine(union(equivalence)) as any

/**
 * @category instances
 * @since 1.0.0
 */
export const getUnionMonoid = <A>(equivalence: Equivalence<A>): Monoid<ReadonlyArray<A>> => {
  const S = getUnionSemigroup<A>(equivalence)
  return ({
    combine: S.combine,
    combineMany: S.combineMany,
    combineAll: (collection) => S.combineMany(collection)(empty()),
    empty: empty()
  })
}

/**
 * @category instances
 * @since 1.0.0
 */
export const getIntersectionSemigroup = <A>(
  equivalence: Equivalence<A>
): Semigroup<ReadonlyArray<A>> => fromCombine(intersection(equivalence)) as any

/**
 * Returns a `Semigroup` for `ReadonlyArray<A>`.
 *
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup: <A>() => Semigroup<ReadonlyArray<A>> = semigroup.readonlyArray

/**
 * Returns a `Monoid` for `ReadonlyArray<A>`.
 *
 * @category instances
 * @since 1.0.0
 */
export const getMonoid: <A>() => Monoid<ReadonlyArray<A>> = monoid.readonlyArray

/**
 * This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
 * The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
 * If all elements are equal, the arrays are then compared based on their length.
 * It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.
 *
 * @category lifting
 * @since 1.0.0
 */
export const liftOrder: <A>(O: Order<A>) => Order<ReadonlyArray<A>> = order.array
