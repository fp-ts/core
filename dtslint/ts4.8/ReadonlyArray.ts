import { pipe } from '@fp-ts/core/Function'
import * as RA from '@fp-ts/core/ReadonlyArray'

declare const neras: RA.NonEmptyReadonlyArray<number>
declare const neas: RA.NonEmptyArray<number>
declare const ras: ReadonlyArray<number>
declare const as: Array<number>

// -------------------------------------------------------------------------------------
// isEmpty
// -------------------------------------------------------------------------------------

if (RA.isEmpty(ras)) {
  // $ExpectType readonly []
  ras
}

if (RA.isEmpty(as)) {
  // $ExpectType []
  as
}

// -------------------------------------------------------------------------------------
// isNonEmpty
// -------------------------------------------------------------------------------------

if (RA.isNonEmpty(ras)) {
  // $ExpectType readonly [number, ...number[]]
  ras
}

if (RA.isNonEmpty(as)) {
  // $ExpectType [number, ...number[]]
  as
}

// -------------------------------------------------------------------------------------
// map
// -------------------------------------------------------------------------------------

// $ExpectType number[]
RA.map(ras, n => n + 1)

// $ExpectType number[]
pipe(ras, RA.map(n => n + 1))

// $ExpectType number[]
RA.map(as, n => n + 1)

// $ExpectType number[]
pipe(as, RA.map(n => n + 1))

// -------------------------------------------------------------------------------------
// mapNonEmpty
// -------------------------------------------------------------------------------------

// $ExpectType [number, ...number[]]
RA.mapNonEmpty(neras, n => n + 1)

// $ExpectType [number, ...number[]]
pipe(neras, RA.mapNonEmpty(n => n + 1))

// $ExpectType [number, ...number[]]
RA.mapNonEmpty(neas, n => n + 1)

// $ExpectType [number, ...number[]]
pipe(neas, RA.mapNonEmpty(n => n + 1))
