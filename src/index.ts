/**
 * @since 3.0.0
 */

import * as boolean from "@fp-ts/core/data/boolean"
import * as endomorphism from "@fp-ts/core/data/Endomorphism"
import * as fromOption from "@fp-ts/core/data/FromOption"
import * as fromReader from "@fp-ts/core/data/FromReader"
import * as fromResult from "@fp-ts/core/data/FromResult"
import * as fromState from "@fp-ts/core/data/FromState"
import * as fromWriter from "@fp-ts/core/data/FromWriter"
import * as function_ from "@fp-ts/core/data/Function"
import * as json from "@fp-ts/core/data/Json"
import * as number from "@fp-ts/core/data/number"
import * as option from "@fp-ts/core/data/Option"
import * as optionT from "@fp-ts/core/data/OptionT"
import * as predicate from "@fp-ts/core/data/Predicate"
import * as reader from "@fp-ts/core/data/Reader"
import * as readerT from "@fp-ts/core/data/ReaderT"
import * as refinement from "@fp-ts/core/data/Refinement"
import * as result from "@fp-ts/core/data/Result"
import * as resultT from "@fp-ts/core/data/ResultT"
import * as state from "@fp-ts/core/data/State"
import * as stateT from "@fp-ts/core/data/StateT"
import * as string from "@fp-ts/core/data/string"
import * as writer from "@fp-ts/core/data/Writer"
import * as writerT from "@fp-ts/core/data/WriterT"
import * as hkt from "@fp-ts/core/HKT"
import * as alt from "@fp-ts/core/typeclasses/Alt"
import * as alternative from "@fp-ts/core/typeclasses/Alternative"
import * as applicative from "@fp-ts/core/typeclasses/Applicative"
import * as apply from "@fp-ts/core/typeclasses/Apply"
import * as bifunctor from "@fp-ts/core/typeclasses/Bifunctor"
import * as bounded from "@fp-ts/core/typeclasses/Bounded"
import * as category from "@fp-ts/core/typeclasses/Category"
import * as comonad from "@fp-ts/core/typeclasses/Comonad"
import * as compactable from "@fp-ts/core/typeclasses/Compactable"
import * as composable from "@fp-ts/core/typeclasses/Composable"
import * as contravariant from "@fp-ts/core/typeclasses/Contravariant"
import * as eq from "@fp-ts/core/typeclasses/Eq"
import * as extendable from "@fp-ts/core/typeclasses/Extendable"
import * as filterable from "@fp-ts/core/typeclasses/Filterable"
import * as flattenable from "@fp-ts/core/typeclasses/Flattenable"
import * as fromIdentity from "@fp-ts/core/typeclasses/FromIdentity"
import * as functor from "@fp-ts/core/typeclasses/Functor"
import * as invariant from "@fp-ts/core/typeclasses/Invariant"
import * as kleisliCategory from "@fp-ts/core/typeclasses/KleisliCategory"
import * as kleisliComposable from "@fp-ts/core/typeclasses/KleisliComposable"
import * as monad from "@fp-ts/core/typeclasses/Monad"
import * as monoid from "@fp-ts/core/typeclasses/Monoid"
import * as ord from "@fp-ts/core/typeclasses/Ord"
import * as ordering from "@fp-ts/core/typeclasses/Ordering"
import * as semigroup from "@fp-ts/core/typeclasses/Semigroup"
import * as show from "@fp-ts/core/typeclasses/Show"
import * as traversable from "@fp-ts/core/typeclasses/Traversable"
import * as traversableFilterable from "@fp-ts/core/typeclasses/TraversableFilterable"

export {
  /**
   * @category type classes
   * @since 3.0.0
   */
  alt,
  /**
   * @category type classes
   * @since 3.0.0
   */
  alternative,
  /**
   * @category type classes
   * @since 3.0.0
   */
  applicative,
  /**
   * @category type classes
   * @since 3.0.0
   */
  apply,
  /**
   * @category type classes
   * @since 3.0.0
   */
  bifunctor,
  /**
   * @since 3.0.0
   */
  boolean,
  /**
   * @category type classes
   * @since 3.0.0
   */
  bounded,
  /**
   * @category type classes
   * @since 3.0.0
   */
  category,
  /**
   * @category type classes
   * @since 3.0.0
   */
  comonad,
  /**
   * @category type classes
   * @since 3.0.0
   */
  compactable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  composable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  contravariant,
  /**
   * @category data types
   * @since 3.0.0
   */
  endomorphism,
  /**
   * @category type classes
   * @since 3.0.0
   */
  eq,
  /**
   * @category type classes
   * @since 3.0.0
   */
  extendable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  filterable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  flattenable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromIdentity,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromOption,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromReader,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromResult,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromState,
  /**
   * @category type classes
   * @since 3.0.0
   */
  fromWriter,
  /**
   * @since 3.0.0
   */
  function_ as function,
  /**
   * @category type classes
   * @since 3.0.0
   */
  functor,
  /**
   * @since 3.0.0
   */
  hkt,
  /**
   * @category type classes
   * @since 3.0.0
   */
  invariant,
  /**
   * @since 3.0.0
   */
  json,
  /**
   * @category type classes
   * @since 3.0.0
   */
  kleisliCategory,
  /**
   * @category type classes
   * @since 3.0.0
   */
  kleisliComposable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  monad,
  /**
   * @category type classes
   * @since 3.0.0
   */
  monoid,
  /**
   * @since 3.0.0
   */
  number,
  /**
   * @category data types
   * @since 3.0.0
   */
  option,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  optionT,
  /**
   * @category type classes
   * @since 3.0.0
   */
  ord,
  /**
   * @since 3.0.0
   */
  ordering,
  /**
   * @since 3.0.0
   */
  predicate,
  /**
   * @category data types
   * @since 3.0.0
   */
  reader,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  readerT,
  /**
   * @category data types
   * @since 3.0.0
   */
  refinement,
  /**
   * @category data types
   * @since 3.0.0
   */
  result,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  resultT,
  /**
   * @category type classes
   * @since 3.0.0
   */
  semigroup,
  /**
   * @category type classes
   * @since 3.0.0
   */
  show,
  /**
   * @category data types
   * @since 3.0.0
   */
  state,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  stateT,
  /**
   * @since 3.0.0
   */
  string,
  /**
   * @category type classes
   * @since 3.0.0
   */
  traversable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  traversableFilterable,
  /**
   * @category data types
   * @since 3.0.0
   */
  writer,
  /**
   * @category monad transformers
   * @since 3.0.0
   */
  writerT
}
