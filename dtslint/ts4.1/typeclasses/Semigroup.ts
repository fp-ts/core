import * as _ from '../../../src/typeclasses/Semigroup'
import { pipe } from '../../../src/data/Function'
import * as S from '../../../src/data/string'
import * as N from '../../../src/data/number'
import * as B from '../../../src/data/boolean'

//
// struct
//

// $ExpectType Semigroup<{ readonly a: string; readonly b: number; readonly c: boolean; }>
_.struct({ a: S.Semigroup, b: N.SemigroupSum, c: B.SemigroupAll })

//
// tuple
//

// $ExpectType Semigroup<readonly [string, number, boolean]>
_.tuple(S.Semigroup, N.SemigroupSum, B.SemigroupAll)

//
// concatAll
//

// $ExpectType string
pipe(['a'], _.combineAll(S.Semigroup)(''))
