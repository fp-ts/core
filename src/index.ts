/**
 * @since 1.0.0
 */

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

import * as hkt from "@fp-ts/core/HKT"

// -------------------------------------------------------------------------------------
// typeclasses
// -------------------------------------------------------------------------------------

import * as alt from "@fp-ts/core/typeclass/Alt"
import * as alternative from "@fp-ts/core/typeclass/Alternative"
import * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as apply from "@fp-ts/core/typeclass/Apply"
import * as associative from "@fp-ts/core/typeclass/Associative"
import * as bicovariant from "@fp-ts/core/typeclass/Bicovariant"
import * as boundedTotalOrder from "@fp-ts/core/typeclass/BoundedTotalOrder"
import * as category from "@fp-ts/core/typeclass/Category"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import * as comonad from "@fp-ts/core/typeclass/Comonad"
import * as compactable from "@fp-ts/core/typeclass/Compactable"
import * as composable from "@fp-ts/core/typeclass/Composable"
import * as contravariant from "@fp-ts/core/typeclass/Contravariant"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import * as covariantWithIndex from "@fp-ts/core/typeclass/CovariantWithIndex"
import * as extendable from "@fp-ts/core/typeclass/Extendable"
import * as filterable from "@fp-ts/core/typeclass/Filterable"
import * as filterableWithIndex from "@fp-ts/core/typeclass/FilterableWithIndex"
import * as flatMap from "@fp-ts/core/typeclass/FlatMap"
import * as foldable from "@fp-ts/core/typeclass/Foldable"
import * as foldableWithIndex from "@fp-ts/core/typeclass/FoldableWithIndex"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import * as monad from "@fp-ts/core/typeclass/Monad"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as of from "@fp-ts/core/typeclass/Of"
import * as pointed from "@fp-ts/core/typeclass/Pointed"
import * as semigroupalCoproduct from "@fp-ts/core/typeclass/SemigroupalCoproduct"
import * as semigroupalProduct from "@fp-ts/core/typeclass/SemigroupalProduct"
import * as totalOrder from "@fp-ts/core/typeclass/TotalOrder"
import * as traversable from "@fp-ts/core/typeclass/Traversable"
import * as traversableFilterable from "@fp-ts/core/typeclass/TraversableFilterable"
import * as traversableWithIndex from "@fp-ts/core/typeclass/TraversableWithIndex"

// -------------------------------------------------------------------------------------
// data types
// -------------------------------------------------------------------------------------

import * as either from "@fp-ts/core/data/Either"
import * as option from "@fp-ts/core/data/Option"
import * as predicate from "@fp-ts/core/data/Predicate"
import * as refinement from "@fp-ts/core/data/Refinement"
import * as totalOrdering from "@fp-ts/core/data/TotalOrdering"

export {
  /**
   * @category typeclass
   * @since 1.0.0
   */
  alt,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  alternative,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  applicative,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  apply,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  associative,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  bicovariant,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  boundedTotalOrder,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  category,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  chainable,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  comonad,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  compactable,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  composable,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  contravariant,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  covariant,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  covariantWithIndex,
  /**
   * @category data types
   * @since 1.0.0
   */
  either,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  extendable,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  filterable,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  filterableWithIndex,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  flatMap,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  foldable,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  foldableWithIndex,
  /**
   * @since 1.0.0
   */
  hkt,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  invariant,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  monad,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  monoid,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  of,
  /**
   * @category data types
   * @since 1.0.0
   */
  option,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  pointed,
  /**
   * @category data types
   * @since 1.0.0
   */
  predicate,
  /**
   * @category data types
   * @since 1.0.0
   */
  refinement,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  semigroupalCoproduct,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  semigroupalProduct,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  totalOrder,
  /**
   * @category data types
   * @since 1.0.0
   */
  totalOrdering,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  traversable,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  traversableFilterable,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  traversableWithIndex
}
