# The `Either` data type

The `Either` data type is a powerful and flexible tool for handling potentially failed computations in functional programming. It can be found in the `@fp-ts/core/Either` module, and it has two variants, `Left` and `Right`, which can be used to represent different outcomes.

The `Left` variant is used to represent a failure, and it can contain useful information such as an error message or a failure code. The `Right` variant, on the other hand, is used to represent a successful outcome, and it can contain the result of the computation.

Unlike the `Option` type, `Either` allows you to attach additional information to the failure case, making it more informative.
In this usage, `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`.

## Definition

The `Either` data type is the union of two members: `Left` and `Right`. The way chosen by the `@fp-ts/core` library to model this union in TypeScript is to use a feature of the language called [Discriminating Unions](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions):

> A common technique for working with unions is to have a single field which uses literal types which you can use to let TypeScript narrow down the possible current type

Here's the complete definition of the `Either` type:

```ts
export type Left<E> = {
  readonly _tag: "Left";
  readonly left: E;
};

export type Right<A> = {
  readonly _tag: "Right";
  readonly right: A;
};

export type Either<E, A> = Left<E> | Right<A>;
```

## Using `Either`

To create an instance of `Either`, you can use the `right` and `left` constructors, which construct a new `Either` holding a `Right` or `Left` value respectively.

```ts
import { left, right } from "@fp-ts/core/Either";

const success: Either<string, number> = right(1);
const failure: Either<string, number> = left("error message");
```

You can also use the `fromOption` function to convert an `Option` to an `Either`.

```ts
import { pipe } from "@fp-ts/core/Function";
import { fromOption } from "@fp-ts/core/Either";
import { none, some } from "@fp-ts/core/Option";

const success: Either<string, number> = pipe(
  some(1),
  fromOption("error message")
);
const failure: Either<string, number> = pipe(
  none(),
  fromOption("error message")
);
```

The `fromOption` function requires an argument because it needs to know what value to use for the `Left` variant of the `Either` type when given a `None`. In the example, the argument "error message" is used as the value for the `Left` variant when `None` is encountered. This allows `Either` to provide more information about why a failure occurred.

## Working with `Either`

Once you have an instance of `Either`, you can use the various functions provided in the `@fp-ts/core/Either` module to work with it.

The `map` and `mapLeft` functions can be used to transform the `Right` and `Left` values respectively.

```ts
import { pipe } from "@fp-ts/core/Function";
import { left, right, map, mapLeft } from "@fp-ts/core/Either";

const success: Either<string, number> = pipe(
  right(1),
  map((x) => x + 1)
); // right(2)

const failure: Either<string, number> = pipe(
  left("error message"),
  mapLeft((x) => x + "!")
); // left("error message!")
```

## Handling failing computations

Let's see how to use the `Either` data type to model a computation that can fail, such as a function that can throw an exception based on certain conditions. Let's take the case of the following function:

```ts
function parseNumber(s: string): number {
  const n = parseFloat(s);
  if (isNaN(n)) {
    throw new Error(`Cannot parse '${s}' as a number`);
  }
  return n;
}
```

An alternative to throwing an exception is to always return a value, but this value will be of type `Either<string, number>` instead of `number`, with the following interpretation:

- if `parseNumber` returns a `Left<string>` value, it means that the computation failed, and the `Left` contains an error message or other information about the failure
- if the result is instead a `Right<number>` value, it means that the computation succeeded and the computed value is wrapped inside the `Right`

Let's see how we can rewrite the `parseNumber` function without throwing exceptions and using the `Either` data type instead:

```ts
import { Either, left, right } from "@fp-ts/core/Either";

function parseNumber(s: string): Either<string, number> {
  const n = parseFloat(s);
  return isNaN(n) ? left(`Cannot parse '${s}' as a number`) : right(n);
}

console.log(parseNumber("2")); // right(2)
console.log(parseNumber("Not a number")); // left("Cannot parse 'Not a number' as a number")
```

## Pattern matching

The `match` function allows us to match on the `Left` and `Right` cases of an `Either` value and provide different actions for each.

We can use the `match` function to handle the `Either` value returned by `parseNumber` and decide what to do based on whether it's a `Left` or a `Right`.

```ts
import { pipe } from "@fp-ts/core/Function";
import { match } from "@fp-ts/core/Either";

// parseNumber returns an Either<string, number>
const result = parseNumber("Not a number");

// Using pipe and match to pattern match on the result
const output = pipe(
  result,
  match(
    // If the result is a Left, return an error string
    (error) => `Error: ${error}`,
    // If the result is a Right, return a string with the number
    (n) => `The number is ${n}`
  )
);

console.log(output); // Output: Error: Cannot parse 'Not a number' as a number
```
