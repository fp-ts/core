import * as _ from '../../src/HKT'

// issue #536
function testIssue536<F extends _.TypeLambda, G extends _.TypeLambda, S, R, W, E, A>(
  x: _.Kind<F, S, R, W, E, A>
): _.Kind<G, S, R, W, E, A> {
  // $ExpectError
  return x
}
