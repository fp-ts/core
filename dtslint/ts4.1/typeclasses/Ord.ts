import * as _ from '../../../src/typeclasses/Ord'
import * as S from '../../../src/data/string'
import * as N from '../../../src/data/number'
import * as B from '../../../src/data/boolean'

//
// tuple
//

// $ExpectType Ord<readonly [string, number, boolean]>
_.tuple(S.Ord, N.Ord, B.Ord)
