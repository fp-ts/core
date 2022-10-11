# Development Conventions

## Instances

### prefer-lift

Prefer `lift` over `get` when there is only one argument.

Examples of **correct** code for this rule:

```ts
declare const liftEq: <A>(Eq: Eq<A>): Eq<Option<A>>
```

Examples of **incorrect** code for  this rule:

```ts
declare const getEq: <E, A>(EE: Eq<E>, EA: Eq<A>) => Eq<Result<E, A>>
```
