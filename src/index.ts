/**
 * @since 1.0.0
 */

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

import * as hkt from "@fp-ts/core/HKT"

// -------------------------------------------------------------------------------------
// typeclass
// -------------------------------------------------------------------------------------

import * as alternative from "@fp-ts/core/typeclass/Alternative"
import * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as associative from "@fp-ts/core/typeclass/Associative"
import * as bicovariant from "@fp-ts/core/typeclass/Bicovariant"
import * as boundedTotalOrder from "@fp-ts/core/typeclass/BoundedTotalOrder"
import * as category from "@fp-ts/core/typeclass/Category"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import * as comonad from "@fp-ts/core/typeclass/Comonad"
import * as composable from "@fp-ts/core/typeclass/Composable"
import * as contravariant from "@fp-ts/core/typeclass/Contravariant"
import * as coproduct from "@fp-ts/core/typeclass/Coproduct"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import * as covariantWithIndex from "@fp-ts/core/typeclass/CovariantWithIndex"
import * as extendable from "@fp-ts/core/typeclass/Extendable"
import * as flatMap from "@fp-ts/core/typeclass/FlatMap"
import * as foldable from "@fp-ts/core/typeclass/Foldable"
import * as foldableWithIndex from "@fp-ts/core/typeclass/FoldableWithIndex"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import * as monad from "@fp-ts/core/typeclass/Monad"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as of from "@fp-ts/core/typeclass/Of"
import * as pointed from "@fp-ts/core/typeclass/Pointed"
import * as product from "@fp-ts/core/typeclass/Product"
import * as totalOrder from "@fp-ts/core/typeclass/TotalOrder"
import * as traversable from "@fp-ts/core/typeclass/Traversable"
import * as traversableWithIndex from "@fp-ts/core/typeclass/TraversableWithIndex"

// -------------------------------------------------------------------------------------
// data
// -------------------------------------------------------------------------------------

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
   * @category typeclass
   * @since 1.0.0
   */
  extendable,
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
   * @category typeclass
   * @since 1.0.0
   */
  pointed,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  product,
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
  traversableWithIndex
}
