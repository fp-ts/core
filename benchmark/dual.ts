import { sum } from "@fp-ts/core/Number"
import * as Benchmark from "benchmark"

/*
sum(a, b) x 39,807,035 ops/sec ±0.79% (87 runs sampled)
binary(a, b) x 745,618,052 ops/sec ±0.53% (91 runs sampled)
sum(b)(a) x 2,423,147 ops/sec ±1.50% (82 runs sampled)
curried(b)(a) x 737,608,819 ops/sec ±0.60% (88 runs sampled)
*/

const suite = new Benchmark.Suite()

const binary = (a: number, b: number): number =>  a + b

const curried = (a: number) => (b: number): number =>  a + b

suite
  .add("sum(a, b)", function() {
    sum(1, 2)
  })
  .add("binary(a, b)", function() {
    binary(1, 2)
  })
  .add("sum(b)(a)", function() {
    sum(2)(1)
  })
  .add("curried(b)(a)", function() {
    curried(2)(1)
  })
  .on("cycle", function(event: any) {
    console.log(String(event.target))
  })
  .on("complete", function(this: any) {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .run({ async: true })
