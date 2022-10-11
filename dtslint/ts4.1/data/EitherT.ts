import * as _ from '../../../src/data/ResultT'
import * as RTE from '../../../src/data/ReaderAsyncResult'
import type * as E from '../../../src/data/Result'

// -------------------------------------------------------------------------------------
// ap widening
// -------------------------------------------------------------------------------------

const ap = _.ap(RTE.Apply)

declare const fab: RTE.ReaderAsyncResult<{ r1: 'r1' }, number, E.Result<string, (n: number) => boolean>>
declare const fa: RTE.ReaderAsyncResult<{ r2: 'r2' }, boolean, E.Result<Error, number>>
// $ExpectType ReaderAsyncResult<{ r1: "r1"; } & { r2: "r2"; }, number | boolean, Result<string | Error, boolean>>
ap(fa)(fab)