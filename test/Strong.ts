import * as assert from 'assert'
import * as R from '../src/Reader'
import * as _ from '../src/Strong'

describe('Strong', () => {
  it('split', () => {
    const ab = (s: string) => s.length
    const cd = (n: number) => n >= 2
    assert.deepStrictEqual(_.split(R.Strong, R.Category)(ab, cd)(['foo', 2]), [3, true])
    assert.deepStrictEqual(_.split(R.Strong, R.Category)(ab, cd)(['a', 1]), [1, false])
  })

  it('fanOut', () => {
    const ab = (s: string) => s.length
    const ac = (s: string) => s === s.toLowerCase()
    assert.deepStrictEqual(_.fanOut(R.Strong, R.Category)(ab, ac)('foo'), [3, true])
    assert.deepStrictEqual(_.fanOut(R.Strong, R.Category)(ab, ac)('A'), [1, false])
  })
})