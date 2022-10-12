/**
 * `Monad` instances represent type constructors which support sequential composition.
 *
 * Instances must satisfy the following laws in addition to the `Functor`:
 *
 * 1. Associativity: `flow(flatMap(afb), flatMap(bfc)) <-> flatMap(flow(afb, flatMap(bfc)))`
 * 2. Left identity: `of(a) |> flatMap(f) <-> f(a)`
 * 3. Right identity: `fa |> flatMap(of) <-> fa`
 *
 * Note. `Functor`'s `map` can be derived: `map = f => flatMap(flow(f, of))`
 *
 * @since 3.0.0
 */
import type { FlatMap } from "@fp-ts/core/FlatMap"
import type { TypeLambda } from "@fp-ts/core/HKT"
import type { Succeed } from "@fp-ts/core/Succeed"

/**
 * @category model
 * @since 3.0.0
 */
export interface Monad<F extends TypeLambda> extends Succeed<F>, FlatMap<F> {}
