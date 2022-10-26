import { OptionTypeLambda } from "@fp-ts/core/data/Option"
import * as _ from "@fp-ts/core/typeclass/NonEmptyProduct"

export declare const NonEmptyProduct: _.NonEmptyProduct<OptionTypeLambda>

// $ExpectError
_.nonEmptyTuple(NonEmptyProduct)() // should not allow empty tuples

// $ExpectError
_.struct(NonEmptyProduct)({}) // should not allow empty structs
