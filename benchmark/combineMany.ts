import { fromIterable } from "@fp-ts/core/internal/ReadonlyArray"
import * as Benchmark from "benchmark"

/*
Array:     sumFromIterable x 1,179,110 ops/sec ±0.45% (90 runs sampled)
Array:     sumIterable     x 1,180,767 ops/sec ±0.47% (92 runs sampled)
Set:       sumFromIterable x 281,417 ops/sec ±1.51% (83 runs sampled)
Set:       sumIterable     x 439,688 ops/sec ±0.45% (93 runs sampled)
Generator: sumFromIterable x 19,283 ops/sec ±1.75% (88 runs sampled)
Generator: sumIterable     x 26,086 ops/sec ±0.72% (92 runs sampled)
*/
const suite = new Benchmark.Suite()

const reducer = (a: number, b: number) => a + b
const sumFromIterable = (self: number,collection: Iterable<number>): number => fromIterable(collection).reduce(reducer, self)
const sumIterable = (self: number, collection: Iterable<number>): number => {
    if(Array.isArray(collection)) {
        return collection.reduce(reducer, self)
    }
    let result = self;
    for (const n of collection) {
        result = reducer(result, n);
    }
    return result;
}

const testSelf = 0;
const testCollectionArray = Array.from({length:1000}).map((_,i) => i);
const testCollectionSet = new Set(testCollectionArray);
const testCollectionGenerator = function* (){
    for (const n of testCollectionArray) {
        yield n;
    }
};

suite
    .add("Array: sumFromIterable", function() {
        sumFromIterable(testSelf, testCollectionArray)
    })
    .add("Array: sumIterable", function() {
        sumIterable(testSelf, testCollectionArray)
    })
    .add("Set: sumFromIterable", function() {
        sumFromIterable(testSelf, testCollectionSet)
    })
    .add("Set: sumIterable", function() {
        sumIterable(testSelf, testCollectionSet)
    })
    .add("Generator: sumFromIterable", function() {
        sumFromIterable(testSelf, testCollectionGenerator())
    })
    .add("Generator: sumIterable", function() {
        sumIterable(testSelf, testCollectionGenerator())
    })
    .on("cycle", function(event: any) {
        console.log(String(event.target))
    })
    .on("complete", function(this: any) {
        console.log("Fastest is " + this.filter("fastest").map("name"))
    })
    .run({ async: true })
