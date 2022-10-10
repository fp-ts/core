import * as _ from '@fp-ts/core/typeclasses/Compactable'
import * as U from '../util'
import * as RA from '@fp-ts/core/ReadonlyArray'
import * as E from '@fp-ts/core/Result'

describe('Compactable', () => {
  it('separate', () => {
    const separate = _.separate(RA.Functor, RA.Compactable)
    U.deepStrictEqual(separate([]), [[], []])
    U.deepStrictEqual(separate([E.fail(123), E.succeed('123')]), [[123], ['123']])
  })
})
