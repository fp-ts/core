import { Product, right, fail } from "@fp-ts/core/These"
import * as Benchmark from "benchmark"

/*
*/

const suite = new Benchmark.Suite()

suite
  .add("Product.product", function() {
    Product.product(right(1), fail('e'))
  })
  .add("Product.productAll", function() {
    Product.productAll([right(1), fail('e')])
  })
  .on("cycle", function(event: any) {
    console.log(String(event.target))
  })
  .on("complete", function(this: any) {
    console.log("Fastest is " + this.filter("fastest").map("name"))
  })
  .run({ async: true })
