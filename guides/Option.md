# The `Option` data type

The `Option` data type represents an optional value: every `Option` is either `Some` and contains a value, or `None`, and does not. `Option` types are very common in functional programming, as they have a number of uses:

- Initial values
- Return values for functions that are not defined over their entire input range (partial functions)
- Return value for otherwise reporting simple errors, where `None` is returned on error
- Optional struct fields
- Optional function arguments

# Definition

The `Option` data type is a union of two members: `None` and `Some`. The `@fp-ts/core` library models this union in TypeScript using a feature called [Discriminating Unions](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminatory-unions).

A common approach for working with unions is to have a single field that uses literal types, which helps TypeScript narrow down the possible current type. In `@fp-ts/core`, this single field is named "\_tag" (but any name can be used when defining your own unions).

The `Option` data type is a "polymorphic" data type, which makes use of a feature of TypeScript named ["Generics"](https://www.typescriptlang.org/docs/handbook/2/generics.html). This means that the `Option` data type is a container that can hold any type.

Here is the complete definition of the `Option` data type:

```ts
// Represents the absence of a value
export type None = {
  // Discriminating field used to identify the variant
  readonly _tag: "None";
};

// Represents the presence of a value
export type Some<A> = {
  // Discriminatory field used to identify the variant
  readonly _tag: "Some";
  // The actual value
  readonly value: A;
};

// Define the `Option` data type as the union of `None` and `Some`
export type Option<A> = None | Some<A>;
```

The type parameter `A` is used to specify the type of the `value` that the `Option` holds.
The `_tag` field is used to distinguish between the two variants, `None` and `Some`.

# Using `Option`

The `Option` data type can be used to handle the presence or absence of a value in a safe and predictable manner. The `Option` data type has two constructors `some` and `none` that can be used to create a new instance of `Option` holding either a `Some` value or a `None` value, respectively.

## Constructing a `Some` value

The `some` constructor takes a value of type `A` and returns an instance of `Option<A>` that holds that value:

```ts
import { some } from "@fp-ts/core/Option";

const value: Option<number> = some(1); // an Option holding the number 1
```

## Constructing a `None` value

The `none` constructor returns an instance of `Option<never`> representing the absence of a value:

```ts
import { none } from "@fp-ts/core/Option";

const empty: Option<never> = none(); // an Option holding no value
```

By default, `none` returns an instance of `Option<never>`, which can be assigned to any `Option<A>` regardless of the type `A`:

```ts
const optionNumber: Option<number> = none();
const optionString: Option<string> = none();
const optionBoolean: Option<boolean> = none();
```

However, if you prefer, you can specify the desired type at the call site by explicitly indicating the type `A` you're interested in. In this case, you won't need to provide type annotations:

```ts
const optionNumber = none<number>();
const optionString = none<string>();
const optionBoolean = none<boolean>();
```

Here's a quick reference guide for the two constructors:

**Cheat sheet** (constructors)

| **Function** | **Given input** | **Resulting Output** |
| ------------ | --------------- | -------------------- |
| `some`       | `A`             | `Option<A>`          |
| `none`       |                 | `Option<never>`      |

With these two constructors, you can construct an `Option` holding either a `Some` value or a `None` value, depending on your needs.

# Conversions

The following table provides a quick reference for the various conversion functions available in this module:

**Cheat sheet** (conversions)

| **Function**   | **Given input**                   | **Resulting Output** |
| -------------- | --------------------------------- | -------------------- | --------------------- |
| `fromEither`   | `Either<E, A>`                    | `Option<A>`          |                       |
| `toEither`     | `Option<A>`, `onNone: LazyArg<E>` | `Either<E, A>`       |                       |
| `getRight`     | `Either<E, A>`                    | `Option<A>`          | alias of `fromEither` |
| `getLeft`      | `Either<E, A>`                    | `Option<E>`          |                       |
| `toRefinement` | `A => Option<B>`                  | `Refinement<A, B>`   |                       |
| `fromIterable` | `Iterable<A>`                     | `Option<A>`          |                       |
| `toArray`      | `Option<A>`                       | `Array<A>`           |                       |

## fromEither

The `fromEither` function takes in an `Either<E, A>` value and returns an `Option<A>`. This is useful when you have a value that can either be of type `E` (an error) or `A` (the correct value), and you want to convert it to an `Option` discarding the error.

Example:

```ts
import * as O from "@fp-ts/core/Option";
import * as E from "@fp-ts/core/Either";

console.log(O.fromEither(E.right(1))); // some(1)
console.log(O.fromEither(E.left("error message"))); // none()
```

In this example, `fromEither` is used to convert the `Either` value `E.right(1)` to an `Option<number>`. The result is `some(1)`, which indicates that the input `Either` was of type `Right` and contained the value `1`.

If the input `Either` was of type `Left` (`E.left("error message")` in this case), the result would be `none()`, which indicates that the input contained an error and no valid value was present.

## toEither

The `toEither` function takes in an `Option<A>` value and a `LazyArg<E>` value and returns an `Either<E, A>`.

The `LazyArg<E>` value is a lazy (or "deferred") argument that is only executed if the input `Option` is `None`. If the input `Option` is `None`, the `toEither` function returns an `Either<E, A>` with the `Left` value being the result of the lazy argument. If the input `Option` is `Some`, the `toEither` function returns an `Either<E, A>` with the `Right` value being the value contained in the `Some` case of the `Option`.

Here's an example of how to use toEither:

```ts
import { pipe } from "@fp-ts/core/Function";
import * as O from "@fp-ts/core/Option";
import * as E from "@fp-ts/core/Either";

const onNone = () => "error";
console.log(pipe(O.some(1), O.toEither(onNone))); // right(1)
console.log(pipe(O.none(), O.toEither(onNone))); // left("error")
```

## getRight

The `getRight` function is an alias for `fromEither`, and is used to convert an `Either<E, A>` value to an `Option<A>`. See the explanation and example for `fromEither` for more information.

## getLeft

The `getLeft` function is a utility function that is used to extract the `Left` value from an `Either<E, A>` value. The function takes in a single argument - an `Either<E, A>` value and returns an `Option<E>` value.

```ts
import * as O from "@fp-ts/core/Option";
import * as E from "@fp-ts/core/Either";

console.log(O.getLeft(E.right("ok"))); // none()
console.log(O.getLeft(E.left("error"))); // some("error")
```

Note that the `Option<E>` value returned by the `getLeft` function will be `Some(value)` if the input `Either<E, A>` value is a `Left` value, and `None` if the input `Either<E, A>` value is a `Right` value.

## toRefinement

This function allows to convert a function `A => Option<B>` into a `(a: A) => a is B`, which can be used as a predefined type guard.
A type guard function is used to check if a value is of a certain type.

The `toRefinement` ensures that a type guard definition is type-safe.

Here is an example of using `toRefinement` to create a type guard for positive numbers:

```ts
import * as O from "@fp-ts/core/Option";

// This function checks if a given number is positive
const parsePositive = (n: number): O.Option<number> =>
  n > 0 ? O.some(n) : O.none();

// convert the `parsePositive` function into a type guard
const isPositive = O.toRefinement(parsePositive);

console.log(isPositive(1)); // true
console.log(isPositive(-1)); // false
```

In this example, `parsePositive` is a function that takes in a number and returns an `Option<number>`. If the number is positive, it returns `some(n)`, where `n` is the positive number. If the number is not positive, it returns `none()`.

`toRefinement` takes in the `parsePositive` function and returns a type guard function `isPositive`. The `isPositive` function can be used to check if a value is a positive number and can be used in type refinement statements to provide type-safety for your code.

## fromIterable

The `fromIterable` function takes an iterable (something you can loop over, for example arrays, sets, maps, etc.) and returns an `Option` value.

If the iterable is not empty (i.e., it has at least one item), `fromIterable` returns the first value of the iterable wrapped in a `Some` value. If the iterable is empty, `fromIterable` returns `None`.

Here are two examples to demonstrate the usage of `fromIterable`:

```ts
import { fromIterable, some, none } from "@fp-ts/core/Option";

console.log(fromIterable([1, 2, 3])); // some(1)
```

In this example, `fromIterable` is passed an array with three values. Since the array is not empty, `fromIterable` returns the first value, `1`, wrapped in a `Some` value.

```ts
console.log(fromIterable([])); // none()
```

In this example, `fromIterable` is passed an empty array. Since the array is empty, `fromIterable` returns `None`.

## toArray

The `toArray` function takes in an `Option` value and returns an array.

If the input is a `Some` value, the value inside the `Some` is wrapped in an array and returned.

If the input is a `None` value, an empty array is returned.

Here are two examples of how `toArray` can be used:

```ts
import * as O from "@fp-ts/core/Option";

console.log(O.toArray(O.some(1))); // [1]
```

In this example, `some(1)` is passed as the argument to `toArray`, which returns an array with the value `1`.

```ts
console.log(O.toArray(O.none())); // []
```

In this example, `none()` is passed as the argument to `toArray`, which returns an empty array.

# Modeling optional properties with `Option`

Here is an example of a `User` model where the `email` field is of type `Option<string>`. This means that the value of the `email` field may or may not be present and will be of type `string` when it is present.

```ts
interface User {
  id: number;
  username: string;
  email: Option<string>;
}

import { some, none } from "@fp-ts/core/Option";

// case with email
const user1: User = {
  id: 1,
  username: "john_doe",
  email: some("john.doe@example.com"),
};

// case without email
const user2: User = {
  id: 2,
  username: "jane_doe",
  email: none(),
};
```

It's important to note that the optionality only concerns the **value** of the `email` field, while the key `"email"` will always be present in the object.

# Working with `Option`

Once you have an instance of `Option`, you can use the various functions provided in the `@fp-ts/core/Option` module to work with it.

The `map` function can be used to transform the `Some` values:

```ts
import { pipe } from "@fp-ts/core/Function";
import { Opiton, some, map } from "@fp-ts/core/Option";

const success: Option<number> = pipe(
  some(1),
  // maps the value inside the Option, adding 1, resulting in some(2)
  map((x) => x + 1)
);
```

As you can see you can transform the result of your computation without unwrapping and wrapping the underlying value of `Option`.
This allows for a safe and convenient way of transforming optional values.

What is also convenient about `Option` is how the absence of value (i.e. a `None`) is handled. See the example below:

```ts
import { pipe } from "@fp-ts/core/Function";
import { Option, none, map } from "@fp-ts/core/Option";

const failure: Option<number> = pipe(
  none(),
  // tries to map the value inside the `Some`, but it does not exist, resulting in `None`
  map((x) => x + 1)
);
```

As you can see, even though we started with a `None` value, we can still operate on our `Option`. No errors are thrown or shown to the user, unless we do it intentionally. When the `Option` is `None, the mapping doesn't even occur, and the `None` value representing the absence of value is returned unchanged.

# Handling failing computations

In software development, there are times when a function can "fail" to produce a result, either because of invalid inputs, lack of data, or other reasons. The `Option` data type helps us to handle these cases in a clean and functional way.

Here's an example of a function `parseNumber` that takes a `string` as input and returns either a `number` or `null` depending on the input:

```ts
function parseNumber(s: string): number | null {
  const n = parseFloat(s);
  if (isNaN(n)) {
    return null;
  }
  return n;
}
```

A better way to handle these types of computations is to use the `Option` data type. This data type offers a cleaner way to model the "success" or "failure" of a computation. With `Option`, we can eliminate the need to return a `null` value. Instead, we will always return a value, but this value will be of type `Option<number>`.

- if `parseNumber` returns a `None` value, it means that the computation "failed"
- if the result is a `Some<number>` value, it means that the computation "succeeded" and the computed value is wrapped inside the `Some`

Here's how the `parseNumber` function would look using the `Option` data type:

```ts
import { Option, none, some } from "@fp-ts/core/Option";

function parseNumber(s: string): Option<number> {
  const n = parseFloat(s);
  return isNaN(n) ? none() : some(n);
}

console.log(parseNumber("2")); // some(2)
console.log(parseNumber("Not a number")); // none()
```

Now, let's say we have a pipeline of computations that already involves the `Option` data type and we want to add a call to the `parseNumber` function. We might run into an issue with the following code:

```ts
import { pipe } from "@fp-ts/core/Function";
import { some, map } from "@fp-ts/core/Option";

const result = pipe(
  some("2"),
  map((s) => parseNumber(s)),
  map((n) => n2) // type-checker error!
);
```

The code above generates a type-checker error. This happens because the second `map` function expects the input `n` to be of type `number`, but `n` is of type `Option<number>`.

```ts
const result = pipe(
  some("2"),
  map((s) => parseNumber(s)),
  map((x: Option<number>) => ...)
);
```

To solve this issue, we need to use the `flatMap` function instead of the `map` function when adding a computation that returns an `Option` to our pipeline:

```ts
import { pipe } from "@fp-ts/core/Function";
import { some, flatMap, map } from "@fp-ts/core/Option";

const result = pipe(
  some("2"),
  flatMap((s) => parseNumber(s)),
  map((n) => n2) // ok! now `n` has type `number`
);
```

Let's summarize the two cases in a table:

**Cheat sheet** (sequencing)

| **Function** | **Given input**               | **Resulting Output** |
| ------------ | ----------------------------- | -------------------- |
| `map`        | `Option<A>`, `A => B`         | `Option<B>`          |
| `flatMap`    | `Option<A>`, `A => Option<B>` | `Option<B>`          |

The `flatMap` function works similarly to the `map` function, but with the added feature of only continuing with the computations if a `None` value is not encountered. Let's look at some code examples to understand how these functions work in practice.

**Example 1: Successful Path with Valid Input**

```ts
import { pipe } from "@fp-ts/core/Function";
import { Option, some, flatMap, map } from "@fp-ts/core/Option";

const success: Option<number> = pipe(
  some("2"),
  flatMap((s) => parseNumber(s)), // parse the input to number
  map((x) => x2), // double the parsed number
  map((x) => x - 3) // subtract 3
); // some(1)
```

In this example, the `pipe` function is used to chain together a series of computations, starting with a string value of `"2"`. This value is first passed to the `flatMap` function which applies the `parseNumber` function to parse the input string to a number. If the parsing is successful, the resulting number is then passed to the `map` function which doubles it. Finally, the resulting value is passed to another `map` function which subtracts `3` from it. The final output of the pipeline is the `Option` value of `some(1)`.

**Example 2: Error Path with Invalid Input**

```ts
import { pipe } from "@fp-ts/core/Function";
import { Option, some, flatMap, map } from "@fp-ts/core/Option";

const failure: Option<number> = pipe(
  some("Not a number"),
  flatMap((s) => parseNumber(s)), // parse the input to number
  map((x) => x2), // This will not be executed because parseNumber will return None
  map((x) => x - 3) // This will not be executed
); // none()
```

In this example, the input to the pipeline is the string value of `"Not a number"`. When this value is passed to the `flatMap` function which applies the `parseNumber` function, it will return `None` as the string cannot be parsed to a number. This means that the following `map `functions will not be executed and the final output of the pipeline will be `None`.

**Example 3: Error Path Starting with None**

```ts
import { pipe } from "@fp-ts/core/Function";
import { Option, none, flatMap, map } from "@fp-ts/core/Option";

const noneStart: Option<number> = pipe(
  none,
  flatMap((s) => parseNumber(s)), // This will not be executed because it starts with None
  map((x) => x2), // This will not be executed
  map((x) => x - 3) // This will not be executed
); // none()
```

In this example, we start the pipeline with the `None` value, which represents an absent or empty value. This means that the `flatMap` step will not be executed and any subsequent steps in the pipeline will not be executed either.

The advantage of using this approach is that the desired outcome is always in clear view while defining your pipeline. This allows you to focus on the expected result, while leaving it to the `Option` type to handle any potential errors that may arise seamlessly and transparently.

You can concentrate on the successful scenario and let `Option` handle the management of potential errors at every step of the pipeline, without the need for explicit error handling.

# Debugging

Debugging your code can be difficult, especially when you have multiple transformations happening in a pipeline. The `Option` module provides two utility functions, `inspectSome` and `inspectNone`, that can help you inspect what is happening in your code and diagnose issues.

The `inspectSome` function returns the original `Option<A>` value, but if it is a `Some<A>`, the provided callback function is called with the value wrapped inside the `Some`.

The `inspectNone` function returns the original `Option<A>` value, but if it is a `None`, the provided callback function is called without any arguments.

Here is an example of how you can use `inspectSome` and `inspectNone` to debug a pipeline:

```ts
import { pipe } from "@fp-ts/core/Function";
import * as O from "@fp-ts/core/Option";

const failure: O.Option<number> = pipe(
  O.some("Not a number"), // start with a Some containing the string "Not a number"
  O.inspectSome(console.log), // log the value if it is a Some
  O.flatMap((s) => parseNumber(s)), // attempt to parse the string as a number
  O.inspectNone(() => console.error("none")), // log an error if the parseNumber function returns None
  O.map((x) => x * 2), // double the number if it is a Some
  O.map((x) => x - 3) // subtract 3 from the number if it is a Some
);
// logs "Not a number" to the console
// logs "none" to the console (because the parseNumber function returns None)
```

It is important to note that `inspectSome` and `inspectNone` should only be used for debugging purposes, and it is not recommended to use them for performing side effects or encoding business logic.

**Cheat sheet** (debugging)

| **Function**  | **Given input**           | **Resulting Output** | **Note**                             |
| ------------- | ------------------------- | -------------------- | ------------------------------------ |
| `inspectSome` | `Option<A>`, `A => void`  | `Option<A>`          | callback called if it is a `Some<A>` |
| `inspectNone` | `Option<A>`, `() => void` | `Option<A>`          | callback called if it is a `None`    |

# Pattern matching

We have seen how easy and convenient it is to build pipelines involving the `Option` data type, leaving it to handle any errors that may occur at any step. However, at some point, you will be interested in manually handling the error to understand the overall result obtained from the pipeline and decide what to do accordingly.

## Getting the value from an `Option`

To extract the value from an `Option`, you can use the `getOrThrow` function, which retrieves the value wrapped in an `Option`, or throws an error if the `Option` you are querying is a `None`.

Here's an example of how you can use `getOrThrow`:

```ts
import { getOrThrow, some, none } from "@fp-ts/core/Option";

console.log(getOrThrow(some(10)); // 10
console.log(getOrThrow(none()); // throws new Error("getOrThrow called on a None")
```

However, using `getOrThrow` can lead to exceptions being thrown in your code, which can lead to unexpected behavior and crashes. To avoid this, you can use the `isSome` and `isNone` guards:

```ts
import { some, isSome } from "@fp-ts/core/Option";

const option = some(1);

// Use the `isSome` function to check if the `option` is an instance of `Some`
if (isSome(option)) {
  console.log(`Option has a value: ${option.value}`);
} else {
  console.log(`Option is empty.`);
}
// Output: Option has a value: 1
```

## Pattern matching with `Option`

An alternative way to handle the cases of an `Option` being `None` or `Some` is by using the `match` function. The `match` function allows you to provide different actions for each case of the `Option` value.

```ts
import { pipe } from "@fp-ts/core/Function";
import { some, match } from "@fp-ts/core/Option";

const option = some(1);

/**
 * Use the `match` function to conditionally return a string based on whether the `Option` is `None` or `Some`.
 * If the `Option` is `None`, the first function will be called with no arguments.
 * If the `Option` is `Some`, the `value` will be passed to the second function.
 */
const output = match(
  option,
  () => `Option is empty.`,
  (value) => `Option has a value: ${value}`
);

console.log(output); // Output: Option has a value: 1
```

Using `match` instead of `isSome` or `isNone` can be more expressive and provide a clear way to handle both cases of an `Option`. Additionally, if you have complex logic to handle both cases, using `match` can make your code easier to read and maintain.

## Other functions for extracting values from an `Option`

To make working with code that does not use `Option` more convenient, there are specializations of `match` called `getOrNull` and `getOrUndefined`, which allow you to retrieve the value of an `Option` or `null` or `undefined`, respectively.

Here's an example of how you can use `getOrNull` and `getOrUndefined`:

```ts
import * as O from "@fp-ts/core/Option";

O.getOrNull(O.some(5)); // 5
O.getOrNull(O.none()); // null

O.getOrUndefined(O.some(5)); // 5
O.getOrUndefined(O.none()); // undefined
```

`getOrElse` allows you to specify a default value that should be returned if the `Option` is `None`. Here's an example of how you can use `getOrElse`:

```ts
import * as O from "@fp-ts/core/Option";

O.getOrElse(O.some(5), () => 0); // 5
O.getOrElse(O.none(), () => 0); // 0
```

Sometimes, when a computation returns `None`, you may want to continue with another computation that returns an `Option`. In this case, you can use the `orElse` function. This is useful for implementing retry logic, for example, where you want to attempt a computation multiple times until you either succeed or exhaust all possible attempts.

Here's an example:

```ts
import { pipe } from "@fp-ts/core/Function";
import * as O from "@fp-ts/core/Option";

const tryToConnect = (): O.Option<string> => {
  // Imagine we have a function that returns an `Option` of connection status
  return Math.random() < 0.5 ? O.some("Connected successfully") : O.none();
};

const retryConnect = (attemptsLeft: number): O.Option<string> =>
  pipe(
    tryToConnect(), // Try to connect for the first time
    O.orElse(() => {
      // If it fails, check if we still have attempts left
      if (attemptsLeft > 0) {
        return retryConnect(attemptsLeft - 1); // If we do, try again with one less attempt
      }
      return O.none(); // If we don't, return none
    })
  );

const result = retryConnect(3); // Try to connect three times
```

In this example, the function `tryToConnect` returns an `Option` representing the connection status. We use `orElse` to implement retry logic by attempting the connection again if the first attempt fails (returns `None`) and we still have attempts left. If all attempts fail, `retryConnect` returns `None`.

The `firstSomeOf` function is used to retrieve the first value that is present within an `Iterable` of `Option` values. The function takes an `Iterable` of `Option` values and returns the first `Option` value that is `Some`, or `None` if there are no `Some` values in the `Iterable`.

Here is an example of how you can use `firstSomeOf`:

```ts
import * as O from "@fp-ts/core/Option";

const arr = [O.none(), O.some(2), O.none(), O.some(3)];

const first = O.firstSomeOf(arr); // some(2)
```

**Cheat sheet** (pattern matching)

| **Function**     | **Given input**                                     | **Resulting Output** |
| ---------------- | --------------------------------------------------- | -------------------- |
| `match`          | `Option<A>`, `onNone: LazyArg<B>`, `onSome: A => C` | `B \| C`             |
| `getOrThrow`     | `Option<A>`                                         | `A` (may throw)      |
| `getOrThrowWith` | `Option<A>`, `onNone: () => unknown`                | `A` (may throw)      |
| `getOrNull`      | `Option<A>`                                         | `A \| null`          |
| `getOrUndefined` | `Option<A>`                                         | `A \| undefined`     |
| `getOrElse`      | `Option<A>`, `onNone: LazyArg<B>`                   | `A \| B`             |
| `orElse`         | `Option<A>`, `LazyArg<Option<B>>`                   | `Option<A \| B>`     |
| `firstSomeOf`    | `Iterable<Option<A>>`                               | `Option<A>`          |

# Interop with Code Using Nullable Types

When using the `Option` data type, you may need to interact with code that uses `undefined` or `null` to indicate optional values. The `Option` data type provides several APIs to make this task easier.

## Converting a Nullable Value to an Option

You can create an `Option` from a nullable value using the `fromNullable` API.

```ts
import * as O from "@fp-ts/core/Option";

console.log(O.fromNullable(null)); // none()
console.log(O.fromNullable(undefined)); // none()
console.log(O.fromNullable(1)); // some(1)
```

You can also modify a function that returns a nullable value to a function that returns an `Option` using the `liftNullable` API. This process is known as "lifting."

```ts
import * as O from "@fp-ts/core/Option";

const parse = (s: string): number | undefined => {
  const n = parseFloat(s);
  return isNaN(n) ? undefined : n;
};

// const parseOption: (s: string) => Option<number>
const parseOption = O.liftNullable(parse);

console.log(parseOption("1")); // some(1)
console.log(parseOption("not a number")); // none()
```

## Converting an Option to a Nullable Value

If you have a value of type `Option` and want to convert it to a nullable value, you have two options:

- Convert `None` to `null` using the `getOrNull` API
- Convert `None` to `undefined` using the `getOrUndefined` API

```ts
import * as O from "@fp-ts/core/Option";

console.log(O.getOrNull(O.some(1))); // 1
console.log(O.getOrNull(O.none())); // null

console.log(O.getOrUndefined(O.some(1))); // 1
console.log(O.getOrUndefined(O.none())); // undefined
```

**Cheat sheet** (interop - nullable)

| **Function**      | **Given input**                                    | **Resulting Output**                 |
| ----------------- | -------------------------------------------------- | ------------------------------------ |
| `fromNullable`    | `A`                                                | `Option<NonNullable<A>>`             |
| `liftNullable`    | `(...a: A) => B \| null \| undefined`              | `(...a: A) => Option<NonNullable<B>` |
| `flatMapNullable` | `Option<A>`, `(...a: A) => B \| null \| undefined` | `Option<NonNullable<B>>`             |
| `getOrNull`       | `Option<A>`                                        | `A \| null`                          |
| `getOrUndefined`  | `Option<A>`                                        | `A \| undefined`                     |

# Combining two or more `Option`s

The `zipWith` function allows you to combine two `Option`s using a provided function. The resulting value is a new `Option` that holds the combined value of both original `Option`s.

Let's consider the following example where we have two `Option`s that hold values of two different types, `string` and `number`:

```ts
import { Option, some } from "@fp-ts/core/Option";

const name: Option<string> = some("John");
const age: Option<number> = some(25);
```

If we want to combine these two `Option`s into a single `Option` that holds an object with properties `name` and `age`, we can use the `zipWith` function:

```ts
import { zipWith } from "@fp-ts/core/Option";

const combine = zipWith(name, age, (n, a) => ({ name: n, age: a }));
console.log(combine); // some({ name: 'John', age: 25 })
```

The `zipWith` function takes three arguments:

- The first `Option` you want to combine
- The second `Option` you want to combine
- A function that takes two arguments, which are the values held by the two `Options`, and returns the combined value

It's important to note that if either of the two `Option`s is `None`, the resulting `Option` will also be `None`. This is because the `zipWith` function only combines the values if both `Option`s are `Some`.

For example:

```ts
const name: Option<string> = none();
const age: Option<number> = some(25);
const combine = zipWith(name, age, (n, a) => ({ name: n, age: a }));
console.log(combine); // none()
```

**Cheat sheet** (combining)

| **Function** | **Given input**                         | **Resulting Output** |
| ------------ | --------------------------------------- | -------------------- |
| `zipWith`    | `Option<A>`, `Option<B>`, `(A, B) => C` | `Option<C>`          |
| `productAll` | `Iterable<Option<A>>`                   | `Option<A[]>`        |
| `ap`         | `Option<(a: A) => B>`, `Option<A>`      | `Option<B>`          |

## Algebraic operations with `Option`s

In addition to `zipWith`, a series of algebraic operations such as sums, products, subtractions, and divisions are exported to make it easier to work with `Option`s.

For example, consider the following `Option`s holding numbers:

```ts
import * as O from "@fp-ts/core/Option";

const num1 = O.some(3);
const num2 = O.some(4);
const num3 = O.none();
```

Summing two `Some` values will result in a `Some` with the sum of the values:

```ts
// Summing two `Some` values will result in a `Some` with the sum of the values
const sumOfSome = sum(num1, num2);
console.log(sumOfSome); // some(7)
```

Summing a `Some` and a `None` will result in a `None`:

```ts
// Summing a `Some` and a `None` will result in a `None`
const sumOfSomeAndNone = sum(num1, num3);
console.log(sumOfSomeAndNone); // none()
```

**Cheat sheet** (algebraic operations)

| **Function** | **Given input**                    | **Resulting Output** |
| ------------ | ---------------------------------- | -------------------- |
| `sum`        | `Option<number>`, `Option<number>` | `Option<number>`     |
| `multiply`   | `Option<number>`, `Option<number>` | `Option<number>`     |
| `subtract`   | `Option<number>`, `Option<number>` | `Option<number>`     |
| `divide`     | `Option<number>`, `Option<number>` | `Option<number>`     |
