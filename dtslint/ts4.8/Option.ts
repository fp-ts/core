import { pipe } from '@fp-ts/core/Function'
import * as _ from '@fp-ts/core/Option'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean
declare const on: _.Option<number>
declare const osn: _.Option<string | number>

// -------------------------------------------------------------------------------------
// liftPredicate
// -------------------------------------------------------------------------------------

// $ExpectType Option<string>
pipe(sn, _.liftPredicate(isString))
pipe(
  sn,
  _.liftPredicate(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number'
  )
)

// $ExpectType Option<string | number>
pipe(sn, _.liftPredicate(predicate))
// $ExpectType Option<number>
pipe(n, _.liftPredicate(predicate))
// $ExpectType Option<number>
pipe(
  n,
  _.liftPredicate(
    (
      _n // $ExpectType number
    ) => true
  )
)

// -------------------------------------------------------------------------------------
// getOrElse
// -------------------------------------------------------------------------------------

// $ExpectType string | null
pipe(_.some('a'), _.getOrElse(() => null))

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

// $ExpectType Option<{ a1: number; a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.some(1)),
  _.bind('a2', () => _.some('b'))
)

// -------------------------------------------------------------------------------------
// filter
// -------------------------------------------------------------------------------------

// $ExpectType Option<number>
pipe(on, _.filter(predicate))

// $ExpectType Option<number>
_.filter(on, predicate)

// $ExpectType Option<string>
pipe(osn, _.filter(isString))

// $ExpectType Option<string>
_.filter(osn, isString)

// $ExpectType Option<number>
pipe(
  on,
  _.filter(
    (
      x // $ExpectType number
    ): x is number => true
  )
)

// $ExpectType Option<number>
pipe(
  on,
  _.filter(
    (
      _x // $ExpectType number
    ) => true
  )
)
