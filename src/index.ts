/**
 * @since 1.0.0
 */

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

import * as hkt from "@fp-ts/core/HKT"

// -------------------------------------------------------------------------------------
// data types
// -------------------------------------------------------------------------------------

import * as boolean from "@fp-ts/core/Boolean"
import * as either from "@fp-ts/core/Either"
import * as _function from "@fp-ts/core/Function"
import * as identity from "@fp-ts/core/Identity"
import * as number from "@fp-ts/core/Number"
import * as option from "@fp-ts/core/Option"
import * as ordering from "@fp-ts/core/Ordering"
import * as predicate from "@fp-ts/core/Predicate"
import * as readonlyArray from "@fp-ts/core/ReadonlyArray"
import * as readonlyRecord from "@fp-ts/core/ReadonlyRecord"
import * as string from "@fp-ts/core/String"
import * as these from "@fp-ts/core/These"

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
import * as equivalence from "@fp-ts/core/typeclass/Equivalence"
import * as filterable from "@fp-ts/core/typeclass/Filterable"
import * as flatMap from "@fp-ts/core/typeclass/FlatMap"
import * as foldable from "@fp-ts/core/typeclass/Foldable"
import * as invariant from "@fp-ts/core/typeclass/Invariant"
import * as monad from "@fp-ts/core/typeclass/Monad"
import * as monoid from "@fp-ts/core/typeclass/Monoid"
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
import * as traversableFilterable from "@fp-ts/core/typeclass/TraversableFilterable"

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
   * @since 1.0.0
   */
  either,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  equivalence,
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
   * @since 1.0.0
   */
  identity,
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
   * @since 1.0.0
   */
  number,
  /**
   * @category typeclass
   * @since 1.0.0
   */
  of,
  /**
   * @since 1.0.0
   */
  option,
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
   * @since 1.0.0
   */
  readonlyArray,
  /**
   * @since 1.0.0
   */
  readonlyRecord,
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
   * @since 1.0.0
   */
  string,
  /**
   * @since 1.0.0
   */
  these,
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
