import { pipe } from '@fp-ts/core/Function'
import * as _ from '@fp-ts/core/ReadonlyRecord'

declare const r: Record<string, number>

//
// get
//

// $ExpectType Option<number>
pipe(r, _.get('a'))

//
// replaceOption
//

// $ExpectType Option<Record<string, number>>
pipe(r, _.replaceOption('a', 2))

// $ExpectType Option<Record<string, number | boolean>>
pipe(r, _.replaceOption('a', true))

//
// modifyOption
//

// $ExpectType Option<Record<string, number>>
pipe(r, _.modifyOption('a', () => 2))

// $ExpectType Option<Record<string, number | boolean>>
pipe(r, _.modifyOption('a', () => true))
