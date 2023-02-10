import { fromIterable } from "@fp-ts/core/internal/ReadonlyArray"
import * as Benchmark from "benchmark"

/*
sumFromIterable x 24,899,792 ops/sec ±0.78% (88 runs sampled)
sumIterable x 774,044,965 ops/sec ±1.63% (82 runs sampled)
*/

const suite = new Benchmark.Suite()

const sumFromIterable = (self: number,collection: Iterable<number>): number => fromIterable(collection).reduce((a, b) => a + b, self)
const sumIterable = (self: number, collection: Iterable<number>): number => {
    let result = self;
    for (const n of collection) {
        result = result + n;
    }
    return result;
}

const testSelf = 0;
const testCollection = new Set([1, 2, 3, 4, 5]);

suite
    .add("sumFromIterable", function() {
        sumFromIterable(testSelf, testCollection)
    })
    .add("sumIterable", function() {
        sumIterable(testSelf, testCollection)
    })
    .on("cycle", function(event: any) {
        console.log(String(event.target))
    })
    .on("complete", function(this: any) {
        console.log("Fastest is " + this.filter("fastest").map("name"))
    })
    .run({ async: true })
