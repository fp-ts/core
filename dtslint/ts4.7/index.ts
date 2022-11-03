import * as _ from '../../src/HKT'

// issue #536
function testIssue536<F extends _.TypeLambda<_.Variance.Invariant>, G extends _.TypeLambda<_.Variance.Invariant>, R, W, E, A>(
  x: _.Kind<F, R, W, E, A>
): _.Kind<G, R, W, E, A> {
  // $ExpectError
  return x
}
