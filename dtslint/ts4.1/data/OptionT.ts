import * as _ from '../../../src/data/OptionT'
import * as RTE from '../../../src/data/ReaderAsyncResult'
import type { Option } from '../../../src/data/Option'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

const ap = _.ap(RTE.Apply)

declare const fab: RTE.ReaderAsyncResult<{ r1: 'r1' }, number, Option<(n: number) => boolean>>
declare const fa: RTE.ReaderAsyncResult<{ r2: 'r2' }, boolean, Option<number>>
// $ExpectType ReaderAsyncResult<{ r1: "r1"; } & { r2: "r2"; }, number | boolean, Option<boolean>>
ap(fa)(fab)
