import { dual } from "@fp-ts/core/Function";
import { lessThan } from "@fp-ts/core/Number"
import * as Benchmark from "benchmark"

/*
*/

const suite = new Benchmark.Suite()

const lessThanBaseline: {
  (that: number): (self: number) => boolean;
  (self: number, that: number): boolean;
} = dual(2, (self: number, that: number): boolean => self < that)

suite
  .add("lessThanBaseline", function() {
    lessThanBaseline(2, 1)
  })
  .add("lessThan", function() {
    lessThan(2, 1)
  })
  .on("cycle", function(event: any) {
    console.log(String(event.target))
  })
  .on("complete", function(this: any) {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .run({ async: true })
