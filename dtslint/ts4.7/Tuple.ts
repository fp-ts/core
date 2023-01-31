import * as T from '@fp-ts/core/Tuple'
import { pipe } from '@fp-ts/core/Function'

//
// tuple
//

// $ExpectType [string, number, boolean]
T.tuple('a', 1, true)

//
// appendElement
//

// $ExpectType [string, number, boolean]
pipe(T.tuple('a', 1), T.appendElement(true))
