import * as _ from '@fp-ts/core/Predicate'

declare const u: unknown
declare const anys: Array<any>
declare const unknowns: Array<unknown>
declare const numberOrNull: Array<number | null>
declare const numberOrUndefined: Array<number | undefined>
declare const numberOrNullOrUndefined: Array<number | null | undefined>

// -------------------------------------------------------------------------------------
// isString
// -------------------------------------------------------------------------------------

// $ExpectType string[]
unknowns.filter(_.isString)

// -------------------------------------------------------------------------------------
// isNumber
// -------------------------------------------------------------------------------------

// $ExpectType number[]
unknowns.filter(_.isNumber)

// -------------------------------------------------------------------------------------
// isBoolean
// -------------------------------------------------------------------------------------

// $ExpectType boolean[]
unknowns.filter(_.isBoolean)

// -------------------------------------------------------------------------------------
// isBigint
// -------------------------------------------------------------------------------------

// $ExpectType bigint[]
unknowns.filter(_.isBigint)

// -------------------------------------------------------------------------------------
// isSymbol
// -------------------------------------------------------------------------------------

// $ExpectType symbol[]
unknowns.filter(_.isSymbol)

// -------------------------------------------------------------------------------------
// isUndefined
// -------------------------------------------------------------------------------------

// $ExpectType undefined[]
unknowns.filter(_.isUndefined)

// -------------------------------------------------------------------------------------
// isNotUndefined
// -------------------------------------------------------------------------------------

// $ExpectType number[]
numberOrUndefined.filter(_.isNotUndefined)

// $ExpectType (number | null)[]
numberOrNullOrUndefined.filter(_.isNotUndefined)

// -------------------------------------------------------------------------------------
// isUndefined
// -------------------------------------------------------------------------------------

// $ExpectType null[]
unknowns.filter(_.isNull)

// -------------------------------------------------------------------------------------
// isNotUndefined
// -------------------------------------------------------------------------------------

// $ExpectType number[]
numberOrNull.filter(_.isNotNull)

// $ExpectType (number | undefined)[]
numberOrNullOrUndefined.filter(_.isNotNull)

// -------------------------------------------------------------------------------------
// isNever
// -------------------------------------------------------------------------------------

// $ExpectType never[]
unknowns.filter(_.isNever)

// -------------------------------------------------------------------------------------
// isUnknown
// -------------------------------------------------------------------------------------

// $ExpectType unknown[]
anys.filter(_.isUnknown)

// -------------------------------------------------------------------------------------
// isObject
// -------------------------------------------------------------------------------------

// $ExpectType object[]
anys.filter(_.isObject)

// -------------------------------------------------------------------------------------
// isNullable
// -------------------------------------------------------------------------------------

// $ExpectType null[]
numberOrNull.filter(_.isNullable)

// $ExpectType undefined[]
numberOrUndefined.filter(_.isNullable)

// $ExpectType (null | undefined)[]
numberOrNullOrUndefined.filter(_.isNullable)

if (_.isNullable(u)) {
  // $ExpectType never
  u
}

// -------------------------------------------------------------------------------------
// isNotNullable
// -------------------------------------------------------------------------------------

// $ExpectType number[]
numberOrNull.filter(_.isNotNullable)

// $ExpectType number[]
numberOrUndefined.filter(_.isNotNullable)

// $ExpectType number[]
numberOrNullOrUndefined.filter(_.isNotNullable)

if (_.isNotNullable(u)) {
  // $ExpectType {}
  u
}

// -------------------------------------------------------------------------------------
// isError
// -------------------------------------------------------------------------------------

// $ExpectType Error[]
unknowns.filter(_.isError)

// -------------------------------------------------------------------------------------
// isDate
// -------------------------------------------------------------------------------------

// $ExpectType Date[]
unknowns.filter(_.isDate)

// -------------------------------------------------------------------------------------
// isRecord
// -------------------------------------------------------------------------------------

// $ExpectType { [x: string]: unknown; [x: symbol]: unknown; }[]
unknowns.filter(_.isRecord)

// -------------------------------------------------------------------------------------
// isReadonlyRecord
// -------------------------------------------------------------------------------------

// $ExpectType { readonly [x: string]: unknown; readonly [x: symbol]: unknown; }[]
unknowns.filter(_.isReadonlyRecord)
