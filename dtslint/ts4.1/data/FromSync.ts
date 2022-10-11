import { pipe } from '../../../src/Function'
import * as AR from '../../../src/data/AsyncResult'

// $ExpectType AsyncResult<never, string>
pipe(AR.succeed('a'), AR.tap(AR.log))
