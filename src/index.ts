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

import * as boolean from "@fp-ts/core/Boolean"
import * as _function from "@fp-ts/core/Function"
import * as number from "@fp-ts/core/Number"
import * as ordering from "@fp-ts/core/Ordering"
import * as predicate from "@fp-ts/core/Predicate"
import * as alternative from "@fp-ts/core/typeclass/Alternative"
import * as applicative from "@fp-ts/core/typeclass/Applicative"
import * as bicovariant from "@fp-ts/core/typeclass/Bicovariant"
import * as bounded from "@fp-ts/core/typeclass/Bounded"
import * as chainable from "@fp-ts/core/typeclass/Chainable"
import * as contravariant from "@fp-ts/core/typeclass/Contravariant"
import * as coproduct from "@fp-ts/core/typeclass/Coproduct"
import * as covariant from "@fp-ts/core/typeclass/Covariant"
import * as flatMap from "@fp-ts/core/typeclass/FlatMap"
import * as foldable from "@fp-ts/core/typeclass/Foldable"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import * as monad from "@fp-ts/core/typeclass/Monad"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
import * as nonEmptyTraversable from "@fp-ts/core/typeclass/NonEmptyTraversable"
import * as of from "@fp-ts/core/typeclass/Of"
import * as order from "@fp-ts/core/typeclass/Order"
import * as pointed from "@fp-ts/core/typeclass/Pointed"
import * as product from "@fp-ts/core/typeclass/Product"
import * as semiAlternative from "@fp-ts/core/typeclass/SemiAlternative"
import * as semiApplicative from "@fp-ts/core/typeclass/SemiApplicative"
import * as semiCoproduct from "@fp-ts/core/typeclass/SemiCoproduct"
import * as semigroup from "@fp-ts/core/typeclass/Semigroup"
import * as semiProduct from "@fp-ts/core/typeclass/SemiProduct"
import * as traversable from "@fp-ts/core/typeclass/Traversable"

export {
  /**
   * @since 1.0.0
   */
  _function as function,
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
   * @since 1.0.0
   */
  boolean,
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
  nonEmptyTraversable,
  /**
   * @since 1.0.0
   */
  number,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  of,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  order,
  /**
   * @since 1.0.0
   */
  ordering,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  pointed,
  /**
   * @since 1.0.0
   */
  predicate,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  product,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  semiAlternative,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  semiApplicative,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  semiCoproduct,
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
  traversable
}
