import * as _ from "@fp-ts/core/typeclass/Monoid"
import * as Number from "@fp-ts/core/Number"
import * as String from "@fp-ts/core/String"

//
// tuple
//

// $ExpectType Monoid<[string, number]>
_.tuple(
  String.Monoid,
  Number.MonoidSum
)

// $ExpectType Monoid<readonly [string, number]>
_.tuple<readonly [string, number]>(
  String.Monoid,
  Number.MonoidSum
)
