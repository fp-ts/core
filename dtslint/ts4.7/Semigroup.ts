import * as _ from "@fp-ts/core/typeclass/Semigroup"
import * as Number from "@fp-ts/core/Number"
import * as String from "@fp-ts/core/String"

//
// tuple
//

// $ExpectType Semigroup<[string, number]>
_.tuple(
  String.Semigroup,
  Number.SemigroupSum
)

// $ExpectType Semigroup<readonly [string, number]>
_.tuple<readonly [string, number]>(
  String.Semigroup,
  Number.SemigroupSum
)
