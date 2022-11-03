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
import * as bounded from "@fp-ts/core/typeclass/Bounded"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import * as compactable from "@fp-ts/core/typeclass/Compactable"
import * as contravariant from "@fp-ts/core/typeclass/Contravariant"
import * as coproduct from "@fp-ts/core/typeclass/Coproduct"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import * as filterable from "@fp-ts/core/typeclass/Filterable"
import * as flatMap from "@fp-ts/core/typeclass/FlatMap"
import * as foldable from "@fp-ts/core/typeclass/Foldable"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import * as monad from "@fp-ts/core/typeclass/Monad"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as nonEmptyAlternative from "@fp-ts/core/typeclass/NonEmptyAlternative"
import * as nonEmptyCoproduct from "@fp-ts/core/typeclass/NonEmptyCoproduct"
import * as nonEmptyTraversable from "@fp-ts/core/typeclass/NonEmptyTraversable"
import * as of from "@fp-ts/core/typeclass/Of"
import * as order from "@fp-ts/core/typeclass/Order"
import * as pointed from "@fp-ts/core/typeclass/Pointed"
import * as product from "@fp-ts/core/typeclass/Product"
import * as semiApplicative from "@fp-ts/core/typeclass/SemiApplicative"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"
import * as traversable from "@fp-ts/core/typeclass/Traversable"
import * as traversableFilterable from "@fp-ts/core/typeclass/TraversableFilterable"

// -------------------------------------------------------------------------------------
// data types
// -------------------------------------------------------------------------------------

import * as either from "@fp-ts/core/data/Either"
import * as option from "@fp-ts/core/data/Option"

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
  bounded,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  chainable,
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
   * @category data types
   * @since 1.0.0
   */
  either,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  filterable,
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
  nonEmptyCoproduct,
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
  order,
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
  semiApplicative,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  semigroup,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  semiProduct,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  traversable,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  traversableFilterable
}
