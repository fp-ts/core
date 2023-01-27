# FAQ

## HKT implementation

**What’s that second branch of conditional type in `Kind` type?**

That's to enforce variance.

For example let's say we define the following typeclass

```ts
import { Kind, TypeClass, TypeLambda } from "@fp-ts/core/HKT";

export interface Zippable<F extends TypeLambda> extends TypeClass<F> {
  readonly zip: <S, R1, O1, E1, A, R2, O2, E2, B>(
    first: Kind<F, S, R1, O1, E1, A>,
    second: Kind<F, S, R2, O2, E2, B>
  ) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]>;
}
```

and then derive a `pipe`-able version of `zip`

```ts
export const zip =
  <F extends TypeLambda>(Zippable: Zippable<F>) =>
  <S, R2, O2, E2, B>(that: Kind<F, S, R2, O2, E2, B>) =>
  <R1, O1, E1, A>(
    self: Kind<F, S, R1, O1, E1, A>
  ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]> =>
    Zippable.zip(self, that);
```

Now let's say we make a mistake while typing the return type of `zip` (`R1` instead of `R1 & R2`)

```diff
-  ): Kind<F, S, R1 & R2, O1 | O2, E1 | E2, readonly [A, B]> =>
+  ): Kind<F, S, R1, O1 | O2, E1 | E2, readonly [A, B]> =>
```

It doesn't type check with the following error

```
Type 'Kind<F, S, R1 & R2, O2 | O1, E2 | E1, readonly [A, B]>' is not assignable to type 'Kind<F, S, R1, O2 | O1, E2 | E1, readonly [A, B]>'.
  Type '(F & { readonly InOut1: S; readonly In1: R1 & R2; readonly Out3: O2 | O1; readonly Out2: E2 | E1; readonly Out1: readonly [A, B]; })["type"] | { readonly F: F; ... 4 more ...; readonly Out1: () => readonly [...]; }' is not assignable to type 'Kind<F, S, R1, O2 | O1, E2 | E1, readonly [A, B]>'.
    Type 'F["type"]' is not assignable to type 'Kind<F, S, R1, O2 | O1, E2 | E1, readonly [A, B]>'.
      Type '{ readonly F: F; readonly InOut1: (_: S) => S; readonly In1: (_: R1 & R2) => void; readonly Out3: () => O2 | O1; readonly Out2: () => E2 | E1; readonly Out1: () => readonly [A, B]; }' is not assignable to type '{ readonly F: F; readonly InOut1: (_: S) => S; readonly In1: (_: R1) => void; readonly Out3: () => O2 | O1; readonly Out2: () => E2 | E1; readonly Out1: () => readonly [A, B]; }'.
        Types of property 'In1' are incompatible.
          Type '(_: R1 & R2) => void' is not assignable to type '(_: R1) => void'.
            Types of parameters '_' and '_' are incompatible.
              Type 'R1' is not assignable to type 'R1 & R2'.
```
