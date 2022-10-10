import * as _ from '@fp-ts/core/typeclasses/Alternative'
import * as O from '@fp-ts/core/Option'
import * as U from '../util'

describe('Alternative', () => {
  describe('firstSuccessOf', () => {
    it('baseline', () => {
      const firstSuccessOf = _.firstSuccessOf(O.Alternative)
      U.deepStrictEqual(firstSuccessOf([]), O.none)
      U.deepStrictEqual(firstSuccessOf([O.none]), O.none)
      U.deepStrictEqual(firstSuccessOf([O.none, O.some(1)]), O.some(1))
    })

    it('should accept an Iterable', () => {
      const firstSuccessOf = _.firstSuccessOf(O.Alternative)
      U.deepStrictEqual(firstSuccessOf(new Set([O.none, O.some(1)])), O.some(1))
    })
  })
})
