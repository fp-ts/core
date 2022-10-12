/**
 * @since 3.0.0
 */

import * as alternative from "@fp-ts/core/Alternative"
import * as apply from "@fp-ts/core/Ap"
import * as applicative from "@fp-ts/core/Applicative"
import * as bounded from "@fp-ts/core/Bounded"
import * as category from "@fp-ts/core/Category"
import * as comonad from "@fp-ts/core/Comonad"
import * as ord from "@fp-ts/core/Compare"
import * as composable from "@fp-ts/core/Compose"
import * as kleisliComposable from "@fp-ts/core/ComposeKleisli"
import * as contravariant from "@fp-ts/core/Contravariant"
import * as functor from "@fp-ts/core/Covariant"
import * as eq from "@fp-ts/core/Equals"
import * as extendable from "@fp-ts/core/Extend"
import * as flattenable from "@fp-ts/core/FlatMap"
import * as hkt from "@fp-ts/core/HKT"
import * as invariant from "@fp-ts/core/Invariant"
import * as kleisliCategory from "@fp-ts/core/KleisliCategory"
import * as bifunctor from "@fp-ts/core/MapBoth"
import * as monad from "@fp-ts/core/Monad"
import * as monoid from "@fp-ts/core/Monoid"
import * as ordering from "@fp-ts/core/Ordering"
import * as alt from "@fp-ts/core/OrElse"
import * as semigroup from "@fp-ts/core/Semigroup"
import * as show from "@fp-ts/core/Show"
import * as fromIdentity from "@fp-ts/core/Succeed"
import * as traversable from "@fp-ts/core/Traverse"

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
  composable,
  /**
   * @category type classes
   * @since 3.0.0
   */
  contravariant,
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
   * @category type classes
   * @since 3.0.0
   */
  ord,
  /**
   * @since 3.0.0
   */
  ordering,
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
   * @category type classes
   * @since 3.0.0
   */
  traversable
}
