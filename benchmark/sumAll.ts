import { fromIterable } from "@fp-ts/core/internal/ReadonlyArray"
import { sumAll } from "@fp-ts/core/Number"
import * as Benchmark from "benchmark"

/*
sumAll x 98,318,148 ops/sec ±0.46% (91 runs sampled)
sum x 104,495,149 ops/sec ±0.76% (90 runs sampled)
*/

const suite = new Benchmark.Suite()

const sum = (collection: Iterable<number>): number => fromIterable(collection).reduce((a, b) => a + b, 0)

suite
  .add("sumAll", function() {
    sumAll([1, 2, 3, 4, 5])
  })
  .add("sum", function() {
    sum([1, 2, 3, 4, 5])
  })
  .on("cycle", function(event: any) {
    console.log(String(event.target))
  })
  .on("complete", function(this: any) {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .run({ async: true })
