import * as _ from '../../../src/data/Async'
import { pipe } from '../../../src/data/Function'

//
// Do
//

// $ExpectType Async<{ readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of(1)),
  _.bind('a2', () => _.of('b'))
)
