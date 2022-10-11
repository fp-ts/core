import * as _ from '../../../src/typeclasses/Monoid'
import * as S from '../../../src/data/string'
import * as N from '../../../src/data/number'
import * as B from '../../../src/data/boolean'

//
// struct
//

// $ExpectType Monoid<{ readonly a: string; readonly b: number; readonly c: boolean; }>
_.struct({ a: S.Monoid, b: N.MonoidSum, c: B.MonoidAll })

//
// tuple
//

// $ExpectType Monoid<readonly [string, number, boolean]>
_.tuple(S.Monoid, N.MonoidSum, B.MonoidAll)
