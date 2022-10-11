# Development Conventions

## Instances

### prefer-lift

Prefer `lift` over `get` when there is only one argument.

Examples of **correct** code for this rule:

```ts
declare const liftEq: <A>(Eq: Eq<A>): Eq<Option<A>>
declare const getMonoid: <A>(Semigroup: Semigroup<A>) => Monoid<Option<A>>
```

Examples of **incorrect** code for this rule:

```ts
declare const getEq: <E, A>(EE: Eq<E>, EA: Eq<A>) => Eq<Result<E, A>>;
```
