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

import * as alternative from "@fp-ts/core/typeclass/Alternative"
import * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as bicovariant from "@fp-ts/core/typeclass/Bicovariant"
import * as boundedTotalOrder from "@fp-ts/core/typeclass/BoundedTotalOrder"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import * as comonad from "@fp-ts/core/typeclass/Comonad"
import * as compactable from "@fp-ts/core/typeclass/Compactable"
import * as contravariant from "@fp-ts/core/typeclass/Contravariant"
import * as coproduct from "@fp-ts/core/typeclass/Coproduct"
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
import * as nonEmptyAlternative from "@fp-ts/core/typeclass/NonEmptyAlternative"
import * as nonEmptyApplicative from "@fp-ts/core/typeclass/NonEmptyApplicative"
import * as nonEmptyCoproduct from "@fp-ts/core/typeclass/NonEmptyCoproduct"
import * as nonEmptyProduct from "@fp-ts/core/typeclass/NonEmptyProduct"
import * as nonEmptyTraversable from "@fp-ts/core/typeclass/NonEmptyTraversable"
import * as of from "@fp-ts/core/typeclass/Of"
import * as pointed from "@fp-ts/core/typeclass/Pointed"
import * as product from "@fp-ts/core/typeclass/Product"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as totalOrder from "@fp-ts/core/typeclass/TotalOrder"
import * as traversable from "@fp-ts/core/typeclass/Traversable"
import * as traversableFilterable from "@fp-ts/core/typeclass/TraversableFilterable"
import * as traversableWithIndex from "@fp-ts/core/typeclass/TraversableWithIndex"

// -------------------------------------------------------------------------------------
// data types
// -------------------------------------------------------------------------------------

import * as either from "@fp-ts/core/data/Either"
import * as nonEmptyReadonlyArray from "@fp-ts/core/data/NonEmptyReadonlyArray"
import * as option from "@fp-ts/core/data/Option"
import * as predicate from "@fp-ts/core/data/Predicate"
import * as refinement from "@fp-ts/core/data/Refinement"
import * as totalOrdering from "@fp-ts/core/data/TotalOrdering"

export {
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
  contravariant,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  coproduct,
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
  nonEmptyAlternative,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  nonEmptyApplicative,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  nonEmptyCoproduct,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  nonEmptyProduct,
  /**
   * @category data types
   * @since 1.0.0
   */
  nonEmptyReadonlyArray,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  nonEmptyTraversable,
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
   * @category typeclass
   * @since 1.0.0
   */
  product,
  /**
   * @category data types
   * @since 1.0.0
   */
  refinement,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  semigroup,
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
