import * as _ from "@fp-ts/core/typeclass/Monoid"
import * as Number from "@fp-ts/core/Number"
import * as String from "@fp-ts/core/String"

//
// tuple
//

// $ExpectType Monoid<readonly [string, number]>
_.tuple(
  String.Monoid,
  Number.MonoidSum
)

//
// struct
//

// $ExpectType Monoid<{ readonly a: string; readonly b: number; }>
_.struct({
  a: String.Monoid,
  b: Number.MonoidSum
})
