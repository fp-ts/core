# The `Either` data type

The `Either` data type is a powerful and flexible tool for handling potentially failed computations in functional programming. It can be found in the `@fp-ts/core/Either` module, and it has two variants, `Left` and `Right`, which can be used to represent different outcomes.

The `Left` variant is used to represent a failure, and it can contain useful information such as an error message or a failure code. The `Right` variant, on the other hand, is used to represent a successful outcome, and it can contain the result of the computation.

Unlike the `Option` type, `Either` allows you to attach additional information to the failure case, making it more informative.
In this usage, `None` is replaced with a `Left` which can contain useful information. `Right` takes the place of `Some`.

# Definition

The `Either` data type is the union of two members: `Left` and `Right`. The way chosen by the `@fp-ts/core` library to model this union in TypeScript is to use a feature of the language called [Discriminating Unions](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions).

> A common technique for working with unions is to have a single field which uses literal types which you can use to let TypeScript narrow down the possible current type

By convention in `@fp-ts/core`, this single field which uses literal types is named "\_tag" (but you can use any name when defining your unions).

Furthermore, `Either` is a "polymorphic" data type, that is, it makes use of a feature of TypeScript named ["Generics"](https://www.typescriptlang.org/docs/handbook/2/generics.html), meaning that the `Either` data type is a container that can hold any type.

Here's the complete definition of the `Either` type:

```ts
// Holds the information for a failure case
export type Left<E> = {
  // Discriminating field used to identify the variant
  readonly _tag: "Left";
  // The actual error
  readonly left: E;
};

// Holds the result of a successful computation
export type Right<A> = {
  // Discriminating field used to identify the variant
  readonly _tag: "Right";
  // The actual value
  readonly right: A;
};

export type Either<E, A> = Left<E> | Right<A>;
```

The `Either` data type is defined as a union of two other types, `Left` and `Right`, that represent the two possible outcomes of a computation: a failure or a success.

The type parameters `E` and `A` are used to specify the type of the failure value and the success value that the `Either` holds respectively.

The `_tag` field is used to distinguish between the two variants, `Left` and `Right`.

# Using `Either`

To create an instance of `Either`, you can use the `right` and `left` constructors, which construct a new `Either` holding a `Right` or `Left` value respectively.

```ts
import { left, right } from "@fp-ts/core/Either";

const success: Either<string, number> = right(1);
const failure: Either<string, number> = left("error message");
```

Let's summarize the two cases in a table:

**Cheat sheet** (constructors)

| Name    | Given | To                 |
| ------- | ----- | ------------------ |
| `right` | `A`   | `Either<never, A>` |
| `left`  | `E`   | `Either<E, never>` |

# Conversions

You can also use the `fromOption` function to convert an `Option` to an `Either`.

```ts
import { Either, fromOption } from "@fp-ts/core/Either";
import { none, some } from "@fp-ts/core/Option";

const success: Either<string, number> = fromOption(
  some(1),
  () => "error message"
);
const failure: Either<string, number> = fromOption(
  none(),
  () => "error message"
);
```

The `fromOption` function requires a second argument because it needs to know what value to use for the `Left` variant of the `Either` type when given a `None`. In the example, the argument "error message" is used as the value for the `Left` variant when `None` is encountered. This allows `Either` to provide more information about why a failure occurred.

**Cheat sheet** (conversions)

| Name           | Given                                | To                 | Note                |
| -------------- | ------------------------------------ | ------------------ | ------------------- |
| `fromOption`   | `Option<A>`, `onNone: LazyArg<E>`    | `Either<E, A>`     |                     |
| `toOption`     | `Either<E, A>`                       | `Option<A>`        |                     |
| `getRight`     | `Either<E, A>`                       | `Option<A>`        | alias of `toOption` |
| `getLeft`      | `Either<E, A>`                       | `Option<E>`        |                     |
| `toRefinement` | `A => Either<E, B>`                  | `Refinement<A, B>` |                     |
| `fromIterable` | `Iterable<A>`, `onEmpty: LazyArg<E>` | `Either<E, A>`     |                     |
| `toArray`      | `Either<E, A>`                       | `Array<A>`         |                     |

# Working with `Either`

Once you have an instance of `Either`, you can use the various functions provided in the `@fp-ts/core/Either` module to work with it.

The `map` function can be used to transform the `Right` values:

```ts
import { pipe } from "@fp-ts/core/Function";
import { Either, right, map } from "@fp-ts/core/Either";

const success: Either<string, number> = pipe(
  right(1),
  map((x) => x + 1)
); // right(2)
```

As you can see you can transform the result of your computation without unwrapping and wrapping the underlying value of `Either`.

What is very convenient about `Either` is how the absence of value (i.e. a `Left`) is handled. See the example below:

```ts
import { pipe } from "@fp-ts/core/Function";
import { Either, left, map } from "@fp-ts/core/Either";

const failure: Either<string, number> = pipe(
  left("error"),
  // tries to map the value inside the `Right`, but it does not exist, resulting in `Left`
  map((x) => x + 1)
);
```

As you can see, even though we started with a `Left` value, we can still operate on our `Either`. No errors are thrown or shown to the user, unless we do it intentionally. What happens is that when the `Either` is `Left`, the mapping doesn't even happen and the `Left` value representing the failed computation is returned unchanged.

In case you want to map the value contained in the `Left`, for example to change the type of error you want to express, you can use the `mapLeft` API which acts like `map` but this time on the `Left` part of an `Either`:

```ts
import { pipe } from "@fp-ts/core/Function";
import { Either, left, mapLeft } from "@fp-ts/core/Either";

const failure: Either<string, number> = pipe(
  left("error message"),
  mapLeft((x) => x + "!")
); // left("error message!")
```

# Handling failing computations

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

What happens if we add a call to the `parseNumber` function to a pipeline that already involves an `Either`?

```ts
const result = pipe(
  right("2"),
  map((s) => parseNumber(s)),
  map((n) => n2) // type-checker error!
);
```

There's something wrong, we received an error from the type checker, what happened?

The problem is that in the second `map` the parameter `n` is of type `Either<string, number>` and not `number`.

```ts
const result = pipe(
  right("2"),
  map((s) => parseNumber(s)),
  map((x: Either<string, number>) => ...)
);
```

Fortunately, the fix is simple, when adding a computation that returns an `Either` to our pipeline we should use the `flatMap` function instead of the `map` function:

```ts
import { pipe } from "@fp-ts/core/Function";
import { right, flatMap, map } from "@fp-ts/core/Either";

const result = pipe(
  right("2"),
  flatMap((s) => parseNumber(s)),
  map((n) => n2) // ok! now `n` has type `number`
);
```

Let's summarize the two cases in a table:

**Cheat sheet** (sequencing)

| Name      | Given                                  | To                    |
| --------- | -------------------------------------- | --------------------- |
| `map`     | `Either<E, A>`, `A => B`               | `Either<E, B>`        |
| `flatMap` | `Either<E1, A>`, `E1 => Either<E2, B>` | `Either<E1 \| E2, B>` |

The `flatMap` function offers the same convenience as the `map` function, which only continues with the computations contained in the pipeline if a `Left` value is **not** encountered:

**Happy path, starting with a valid input**

```ts
import { pipe } from "@fp-ts/core/Function";
import { Either, right, flatMap, map } from "@fp-ts/core/Either";

const success: Either<string, number> = pipe(
  right("2"),
  flatMap((s) => parseNumber(s)), // parse the input to number
  map((x) => x2), // double the parsed number
  map((x) => x - 3) // subtract 3
); // right(1)
```

**Error path, starting with an invalid input**

```ts
import { pipe } from "@fp-ts/core/Function";
import { Either, right, flatMap, map } from "@fp-ts/core/Either";

const failure: Either<string, number> = pipe(
  right("Not a number"),
  flatMap((s) => parseNumber(s)), // parse the input to number
  map((x) => x2), // This will not be executed because parseNumber will return Left
  map((x) => x - 3) // This will not be executed
); // left("Cannot parse 'Not a number' as a number")
```

**Error path, starting with None**

```ts
import { pipe } from "@fp-ts/core/Function";
import { Either, left, flatMap, map } from "@fp-ts/core/Either";

const leftStart: Either<string, number> = pipe(
  left("error message"),
  flatMap((s) => parseNumber(s)), // This will not be executed because it starts with Left
  map((x) => x2), // This will not be executed
  map((x) => x - 3) // This will not be executed
); // left("error message")
```

When using this approach, the **desired outcome** is always in clear view while defining your pipeline. This allows you to focus on the expected result, while leaving it to `Either` to handle any potential errors that may arise seamlessly and transparently.

You can focus on the successful scenario and let `Either` handle the tedious task of managing potential errors at every step of the pipeline, without the need for explicit handling.

# Debugging

At any time, it is possible to inspect what is happening in your pipeline using two utility functions:

**Cheat sheet** (debugging)

| Name           | Given                       | To             | Note                                  |
| -------------- | --------------------------- | -------------- | ------------------------------------- |
| `inspectRight` | `Either<E, A>`, `A => void` | `Either<E, A>` | callback called if it is a `Right<A>` |
| `inspectLeft`  | `Either<E, A>`, `E => void` | `Either<E, A>` | callback called if it is a `Left<E>`  |

Let's see an example where both are in action:

```ts
import { pipe } from "@fp-ts/core/Function";
import {
  Either,
  right,
  inspectRight,
  flatMap,
  inspectLeft,
  map,
} from "@fp-ts/core/Option";

const failure: Either<string, number> = pipe(
  right("Not a number"),
  inspectRight(console.log),
  flatMap((s) => parseNumber(s)),
  inspectLeft(console.error),
  map((x) => x2),
  map((x) => x - 3)
);
// "Not a number"
// "Cannot parse 'Not a number' as a number"
```

Please note that these two functions should only be used for debugging purposes and it is not recommended to use them for performing side effects or encoding business logic.

# Pattern matching and error handling

We have seen how easy and convenient it is to build pipelines involving the `Either` data type, leaving it to handle any errors that may occur at any step. However, at some point, you will be interested in manually handling the error to understand the overall result obtained from the pipeline and decide what to do accordingly.

The fastest way to get the value wrapped in an `Either` is to call the `getOrThrow` function, but be aware that, as the name suggests, an exception will be thrown in case the `Either` you are querying is a `Left`:

```ts
import { getOrThrow } from "@fp-ts/core/Either";

console.log(getOrThrow(right(10)); // 10
console.log(getOrThrow(left("error message")); // throws new Error("getOrThrow called on a Left")
```

A more safe alternative is using the `isRight` and `isLeft` guards:

```ts
import { right, left, isRight, isLeft } from "@fp-ts/core/Either";

const success = some(1);

// Use the `isRight` function to check if the `success` is an instance of `Right`
if (isRight(success)) {
  console.log(`Either has a value: ${success.right}`);
} else {
  console.log(`Either is a Left.`);
}
// Either has a value: 1

const failure = left("error message");

// Use the `isLeft` function to check if the `failure` is an instance of `Left`
if (isLeft(failure)) {
  console.log(`Either has error: ${failure.left}`);
} else {
  console.log(`Either is a Right.`);
}
// Either has error: error message
```

Another alternative is [pattern matching](https://github.com/gvergnaud/ts-pattern#what-is-pattern-matching) on the `Either`.

The `match` function allows us to match on the `Left` and `Right` cases of an `Either` value and provide different actions for each.

```ts
import { pipe } from "@fp-ts/core/Function";
import { right, match } from "@fp-ts/core/Either";

const either = right(1);

/**
 * Use the `match` function to conditionally return a string based on whether the `Either` is `Left` or `Right`.
 * If the `Either` is `Left`, the `left` will be passed to the first function.
 * If the `Either` is `Right`, the `right` will be passed to the second function.
 */
const output = match(
  option,
  (left) => `Either has error. ${left}`,
  (right) => `Either has a value: ${right}`
);

console.log(output); // Either has a value: 1
```

One reason to use `match` instead of `isRight` or `isLeft` is that `match` is more expressive and provides a clear way to handle both cases of an `Either`. With `match`, you can directly provide two functions to handle the case of the `Either` being `Left` or `Right`, respectively. On the other hand, with `isRight` or `isLeft`, you would need to manually check the value and take separate actions based on whether it's `Right` or `Left`. With `match`, the code can be more concise and easy to understand. Additionally, if you have complex logic to handle both cases, using `match` can make the code easier to read and maintain.

There are specializations of `match` to make working with code that does not use `Either` more convenient and faster, particularly `getOrNull` and `getOrUndefined`.

```ts
import { getOrNull, getOrUndefined, right, left } from "@fp-ts/core/Either";

getOrNull(right(5)); // 5
getOrNull(left("error")); // null

getOrUndefined(right(5)); // 5
getOrUndefined(left("error")); // undefined
```

For greater flexibility, there is also the `getOrElse` function which allows you to set what value corresponds to the `Left` case:

```ts
import { getOrElse, right, left } from "@fp-ts/core/Either";

getOrElse(right(5), () => 0); // 5
getOrElse(left("error"), () => 0); // 0
```

It often happens that the action you want to take when a computation returns `None` is to continue with another computation that returns an `Option`, in this case you can use the `orElse` API:

```ts
import { pipe } from "@fp-ts/core/Function";
import { Either, some, none, orElse } from "@fp-ts/core/Either";

const fetchData = (): Either<string, string> => {
  // Imagine we have a function that returns an `Either` of data
  return Math.random() < 0.5
    ? right("Data fetched successfully")
    : left("Data fetched unsuccessfully");
};

const retryFetchData = (): Either<string, string> =>
  pipe(
    fetchData(), // Call the function for the first time
    orElse(() => fetchData()) // If it fails, call it again
  );

const result = retryFetchData();
```

**Cheat sheet** (error handling)

| Name             | Given                                               | To                   |
| ---------------- | --------------------------------------------------- | -------------------- |
| `match`          | `Either<E, A>`, `onLeft: E => B`, `onRight: A => C` | `B \| C`             |
| `getOrThrow`     | `Either<E, A>`                                      | `A` (may throw)      |
| `getOrNull`      | `Either<E, A>`                                      | `A \| null`          |
| `getOrUndefined` | `Either<E, A>`                                      | `A \| undefined`     |
| `getOrElse`      | `Either<E, A>`, `onLeft: E => B`                    | `A \| B`             |
| `orElse`         | `Either<E1, A>`, `LazyArg<Either<E2, B>>`           | `Either<E1, A \| B>` |
| `firstRightOf`   | `Either<E, A>`, `Iterable<Either<E, A>>`            | `Either<E, A>`       |

# Interop

A need that arises quickly when using the `Either` data type is the ability to interoperate with code that does not share the same style, in particular code that for example uses `undefined` or `null` to indicate that a value is optional, or code that throws exceptions.

The `Either` data type offers a series of APIs to make this task easier, let's start with the first of the two cases, that is when the need is to interoperate with code that use a nullable type to indicate that a value is optional.

It is possible to create an `Eitehr` from a nullable value using the `fromNullable` API, let's see an example:

```ts
import { fromNullable, right, left } from "@fp-ts/core/Either";

console.log(fromNullable(null, () => "error")); // left("erro")
console.log(fromNullable(undefined, () => "error")); // left("erro")
console.log(fromNullable(1, () => "error")); // right(1)
```

Instead of a single value, we can also modify the definition of a function that returns a nullable value to a function that returns an `Either` (a process that goes by the name of "lifting"):

```ts
import { liftNullable, left, right } from "@fp-ts/core/Either";

const parse = (s: string): number | undefined => {
  const n = parseFloat(s);
  return isNaN(n) ? undefined : n;
};

// const parseEither: (s: string) => Either<string, number>
const parseEither = liftNullable(
  parse,
  (s) => `Cannot parse '${s}' as a number`
);

console.log(parseEither("1")); // right(1)
console.log(parseEither("not a number")); // left("Cannot parse 'not a number' as a number")
```

On the other hand, if we have a value of type `Either` and we want to convert it into a nullable value we have two possibilities:

- convert `Left` to `null`
- convert `Left` to `undefined`

The two APIs `getOrNull` and `getOrUndefined` respectively achieve these two tasks:

```ts
import { getOrNull, getOrUndefined, right, left } from "@fp-ts/core/Either";

console.log(getOrNull(right(1))); // 1
console.log(getOrNull(left("error message"))); // null

console.log(getOrUndefined(right(1))); // 1
console.log(getOrUndefined(left("error message"))); // undefined
```

**Cheat sheet** (interop - nullable)

| Name              | Given                                                             | To                                      |
| ----------------- | ----------------------------------------------------------------- | --------------------------------------- |
| `fromNullable`    | `A`, `A => E`                                                     | `Either<E, NonNullable<A>>`             |
| `liftNullable`    | `(...a: A) => B \| null \| undefined`, `(...a: A) => E`           | `(...a: A) => Either<E, NonNullable<B>` |
| `flatMapNullable` | `Either<E1, A>`, `(...a: A) => B \| null \| undefined`, `A => E2` | `Either<E1 \| E2, NonNullable<B>>`      |
| `getOrNull`       | `Either<E, A>`                                                    | `A \| null`                             |
| `getOrUndefined`  | `Either<E, A>`                                                    | `A \| undefined`                        |

Now let's see the other case, that is when we need to interoperate with code that throws exceptions.

In a previous section, we saw how to convert the following function that can throw exceptions:

```ts
function parseNumber(s: string): number {
  const n = parseFloat(s);
  if (isNaN(n)) {
    throw new Error(`Cannot parse '${s}' as a number`);
  }
  return n;
}
```

into a function that returns a `Option`:

```ts
import { Either, left, right } from "@fp-ts/core/Either";

function parseNumber(s: string): Either<string, number> {
  const n = parseFloat(s);
  return isNaN(n) ? left(`Cannot parse '${s}' as a number`) : right(n);
}
```

However, this involves tedious, error-prone, and boilerplate-heavy work. It would be much more convenient not to have to rewrite the `parseNumber` function from scratch but only to transform it into the desired result in one step, and that's exactly what the `fromThrowable` API takes care of doing:

```ts
import { liftThrowable } from "@fp-ts/core/Either";

const parse = liftThrowable(JSON.parse, () => "parse error");

console.log(parse("1")); // right(1)
console.log(parse("")); // left("parse error")
```

On the other hand, if we have a value of type `Option` and want to get the wrapped value, accepting the fact that if the `Option` is a `None` we will get an exception, we can use the `getOrThrow` API:

```ts
import { getOrThrow, right, left } from "@fp-ts/core/Either";

console.log(getOrThrow(right(10)); // 10
console.log(getOrThrow(left("error message")); // throws new Error("getOrThrow called on a Left")
```

**Cheat sheet** (interop - throwing)

| Name            | Given                                        | To                          |
| --------------- | -------------------------------------------- | --------------------------- |
| `liftThrowable` | `(...a: A) => B` (may throw), `unknown => E` | `(...a: A) => Either<E, B>` |
| `getOrThrow`    | `Either<E, A>`                               | `A` (may throw)             |

# Combining two or more `Either`s

The `zipWith` function allows you to combine two `Either`s using a provided function. The resulting value is a new `Either` that holds the combined value of both original `Either`s.

Let's consider the following example where we have two `Either`s that hold values of two different types, `string` and `number`:

```ts
import { Either, right } from "@fp-ts/core/Either";

const name: Either<string, string> = right("John");
const age: Either<string, number> = right(25);
```

If we want to combine these two `Either`s into a single `Either` that holds an object with properties `name` and `age`, we can use the `zipWith` function:

```ts
import { zipWith } from "@fp-ts/core/Either";

const combine = zipWith(name, age, (n, a) => ({ name: n, age: a }));
console.log(combine); // right({ name: 'John', age: 25 })
```

The `zipWith` function takes three arguments: the two `Either`s that you want to combine, and a function that takes two arguments - the values held by the two `Either`s - and returns the combined value.

If either of the two `Either`s is `Left`, the resulting `Either` will be `Left` as well:

```ts
const name: Either<string, string> = left("missing name");
const age: Either<string, number> = right(25);
const combine = zipWith(name, age, (n, a) => ({ name: n, age: a }));
console.log(combine); // left("missing name")
```

This is because the `zipWith` function only combines the values if both `Either`s are `Right`.

**Cheat sheet** (combining)

| Name      | Given                                           | To                    |
| --------- | ----------------------------------------------- | --------------------- |
| `zipWith` | `Either<E1, A>`, `Either<E2, B>`, `(A, B) => C` | `Either<E1 \| E2, C>` |
| `ap`      | `Either<E1, (a: A) => B>`, `Either<E2, A>`      | `Either<E1 \| E2, B>` |

For convenience, a series of algebraic operations such as sums and products are exported.

```ts
import { right, left, sum } from "@fp-ts/core/Either";

const num1 = right(3);
const num2 = right(4);
const num3 = left("not a number");

// Summing two `Right` values will result in a `Right` with the sum of the values
const sumOfRight = sum(num1, num2);
console.log(sumOfRight); // right(7)

// Summing a `Right` and a `Left` will result in a `Left`
const sumOfRightAndLeft = sum(num1, num3);
console.log(sumOfRightAndLeft); // left("not a number")
```

**Cheat sheet** (algebraic operations)

| Name       | Given                                      | To                         |
| ---------- | ------------------------------------------ | -------------------------- |
| `sum`      | `Either<E1, number>`, `Either<E2, number>` | `Either<E1 \| E2, number>` |
| `multiply` | `Either<E1, number>`, `Either<E2, number>` | `Either<E1 \| E2, number>` |
| `subtract` | `Either<E1, number>`, `Either<E2, number>` | `Either<E1 \| E2, number>` |
| `divide`   | `Either<E1, number>`, `Either<E2, number>` | `Either<E1 \| E2, number>` |
