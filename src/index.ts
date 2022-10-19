/**
 * @since 1.0.0
 */

// -------------------------------------------------------------------------------------
// type classes
// -------------------------------------------------------------------------------------

import * as alternative from "@fp-ts/core/Alternative"
import * as applicative from "@fp-ts/core/Applicative"
import * as bifunctor from "@fp-ts/core/Bifunctor"
import * as bounded from "@fp-ts/core/Bounded"
import * as category from "@fp-ts/core/Category"
import * as chainable from "@fp-ts/core/Chainable"
import * as comonad from "@fp-ts/core/Comonad"
import * as composable from "@fp-ts/core/Composable"
import * as contravariant from "@fp-ts/core/Contravariant"
import * as coproduct from "@fp-ts/core/Coproduct"
import * as extendable from "@fp-ts/core/Extendable"
import * as flatMap from "@fp-ts/core/FlatMap"
import * as foldable from "@fp-ts/core/Foldable"
import * as foldableWithIndex from "@fp-ts/core/FoldableWithIndex"
import * as functor from "@fp-ts/core/Functor"
import * as functorWithIndex from "@fp-ts/core/FunctorWithIndex"
import * as hkt from "@fp-ts/core/HKT"
import * as invariant from "@fp-ts/core/Invariant"
import * as monad from "@fp-ts/core/Monad"
import * as monoid from "@fp-ts/core/Monoid"
import * as of from "@fp-ts/core/Of"
import * as pointed from "@fp-ts/core/Pointed"
import * as product from "@fp-ts/core/Product"
import * as semigroup from "@fp-ts/core/Semigroup"
import * as sortable from "@fp-ts/core/Sortable"
import * as traversable from "@fp-ts/core/Traversable"
import * as traversableWithIndex from "@fp-ts/core/TraversableWithIndex"

// -------------------------------------------------------------------------------------
// data types
// -------------------------------------------------------------------------------------

import * as equivalence from "@fp-ts/core/data/Equivalence"
import * as ordering from "@fp-ts/core/data/Ordering"

export {
  /**
   * @category type classes
   * @since 1.0.0
   */
  alternative,
  /**
   * @category type classes
   * @since 1.0.0
   */
  applicative,
  /**
   * @category type classes
   * @since 1.0.0
   */
  bifunctor,
  /**
   * @category type classes
   * @since 1.0.0
   */
  bounded,
  /**
   * @category type classes
   * @since 1.0.0
   */
  category,
  /**
   * @category type classes
   * @since 1.0.0
   */
  chainable,
  /**
   * @category type classes
   * @since 1.0.0
   */
  comonad,
  /**
   * @category type classes
   * @since 1.0.0
   */
  composable,
  /**
   * @category type classes
   * @since 1.0.0
   */
  contravariant,
  /**
   * @category type classes
   * @since 1.0.0
   */
  coproduct,
  /**
   * @category data types
   * @since 1.0.0
   */
  equivalence,
  /**
   * @category type classes
   * @since 1.0.0
   */
  extendable,
  /**
   * @category type classes
   * @since 1.0.0
   */
  flatMap,
  /**
   * @category type classes
   * @since 1.0.0
   */
  foldable,
  /**
   * @category type classes
   * @since 1.0.0
   */
  foldableWithIndex,
  /**
   * @category type classes
   * @since 1.0.0
   */
  functor,
  /**
   * @category type classes
   * @since 1.0.0
   */
  functorWithIndex,
  /**
   * @since 1.0.0
   */
  hkt,
  /**
   * @category type classes
   * @since 1.0.0
   */
  invariant,
  /**
   * @category type classes
   * @since 1.0.0
   */
  monad,
  /**
   * @category type classes
   * @since 1.0.0
   */
  monoid,
  /**
   * @category type classes
   * @since 1.0.0
   */
  of,
  /**
   * @category data types
   * @since 1.0.0
   */
  ordering,
  /**
   * @category type classes
   * @since 1.0.0
   */
  pointed,
  /**
   * @category type classes
   * @since 1.0.0
   */
  product,
  /**
   * @category type classes
   * @since 1.0.0
   */
  semigroup,
  /**
   * @category type classes
   * @since 1.0.0
   */
  sortable,
  /**
   * @category type classes
   * @since 1.0.0
   */
  traversable,
  /**
   * @category type classes
   * @since 1.0.0
   */
  traversableWithIndex
}
