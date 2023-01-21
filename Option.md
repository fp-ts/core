# The `Option` data type

The `Option` data type is a powerful and flexible tool for handling potentially failed computations in functional programming. It can be found in the `@fp-ts/core/Option` module, and it has two variants, `None` and `Some`, which can be used to represent different outcomes.

There are two possible interpretations of the `Option` data type:

1. as a representation of the result of a computation that can fail or return a value of type `A`
2. as a representation of an optional value of type `A`

In the first of these two interpretations, the `None` union member represents the result of a computation that has failed and therefore was not able to return any value, while the `Some<A>` union member represents the result of a computation that has succeeded and was able to return a value of type `A`.

In the second of these two interpretations, the `None` union member represents the absence of the value, while the `Some<A>` union member represents the presence of the value of type `A`

## Definition

The `Option` data type is the union of two members: `None` and `Some`. The way chosen by the `@fp-ts/core` library to model this union in TypeScript is to use a feature of the language called [Discriminating Unions](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions):

> A common technique for working with unions is to have a single field which uses literal types which you can use to let TypeScript narrow down the possible current type

Here's the complete definition of the `Option` type:

```ts
export type None = {
  readonly _tag: "None";
};

export type Some<A> = {
  readonly _tag: "Some";
  readonly value: A;
};

export type Option<A> = None | Some<A>;
```

## Using `Option`

To create an instance of `Option`, you can use the `some` and `none` constructors, which construct a new `Option` holding a `Some` or `None` value respectively.

```ts
import { none, some } from "@fp-ts/core/Either";

const success: Option<number> = some(1);
const failure: Option<number> = none();
```

## Working with `Option`

Once you have an instance of `Option`, you can use the various functions provided in the `@fp-ts/core/Option` module to work with it.

The `map` function can be used to transform the `Some` values.

```ts
import { pipe } from "@fp-ts/core/Function";
import { some, map } from "@fp-ts/core/Option";

const success: Option<number> = pipe(
  some(1),
  map((x) => x + 1)
); // some(2)
```

## Handling failing computations

Let's see how to use the `Option` data type to model a computation that can fail, such as a function that can throw an exception based on certain conditions. Let's take the case of the following function:

```ts
function parseNumber(s: string): number {
  const n = parseFloat(s);
  if (isNaN(n)) {
    throw new Error();
  }
  return n;
}
```

An alternative to throwing an exception is to always return a value, but this value will be of type `Option<number>` instead of `number`, with the following interpretation:

- if `parseNumber` returns a `None` value, it means that the computation failed
- if the result is instead a `Some<number>` value, it means that the computation succeeded and the computed value is wrapped inside the `Some`

Let's see how we can rewrite the `parseNumber` function without throwing exceptions and using the `Option` data type instead:

```ts
import { Option, none, some } from "@fp-ts/core/Option";

function parseNumber(s: string): Option<number> {
  const n = parseFloat(s);
  return isNaN(n) ? none() : some(n);
}

console.log(parseNumber("2")); // some(2)
console.log(parseNumber("Not a number")); // none()
```

## Pattern matching

The `match` function allows us to match on the `None` and `Some` cases of an `Option` value and provide different actions for each.

We can use the `match` function to handle the `Option` value returned by `parseNumber` and decide what to do based on whether it's a `None` or a `Some`.

```ts
import { pipe } from "@fp-ts/core/Function";
import { match } from "@fp-ts/core/Option";

// parseNumber returns an Option<number>
const result = parseNumber("Not a number");

// Using pipe and match to pattern match on the result
const output = pipe(
  result,
  match(
    // If the result is a None, return an error string
    () => `Error: ${error}`,
    // If the result is a Some, return a string with the number
    (n) => `The number is ${n}`
  )
);

console.log(output); // Output: Error: Cannot parse 'Not a number' as a number
```
