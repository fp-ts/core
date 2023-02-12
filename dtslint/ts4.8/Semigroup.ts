import * as _ from "@fp-ts/core/typeclass/Semigroup"
import * as Number from "@fp-ts/core/Number"
import * as String from "@fp-ts/core/String"

//
// tuple
//

// $ExpectType Semigroup<readonly [string, number]>
_.tuple(
  String.Semigroup,
  Number.SemigroupSum
)

//
// struct
//

// $ExpectType Semigroup<{ readonly a: string; readonly b: number; }>
_.struct({
  a: String.Semigroup,
  b: Number.SemigroupSum
})
