import { pipe } from '../../../src/data/Function'
import * as AR from '../../../src/data/AsyncResult'

// $ExpectType AsyncResult<never, string>
pipe(AR.succeed('a'), AR.tap(AR.log))
