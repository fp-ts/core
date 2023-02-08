import { OptionTypeLambda } from "@fp-ts/core/Option"
import * as _ from "@fp-ts/core/typeclass/SemiProduct"

export declare const SemiProduct: _.SemiProduct<OptionTypeLambda>

// $ExpectError
_.nonEmptyTuple(SemiProduct)() // should not allow empty tuples

// $ExpectError
_.nonEmptyStruct(SemiProduct)({}) // should not allow empty structs
