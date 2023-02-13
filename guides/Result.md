# The `Result` data type

The `Result` data type is a powerful and flexible tool for handling potentially failed computations in functional programming. It can be found in the `@fp-ts/core/Result` module, and it has two variants, `Failure` and `Success`, which can be used to represent different outcomes.

The `Failure` variant is used to represent a failure, and it can contain useful information such as an error message or a failure code. The `Success` variant, on the other hand, is used to represent a successful outcome, and it can contain the result of the computation.

Unlike the `Option` type, `Result` allows you to attach additional information to the failure case, making it more informative.
In this usage, `None` is replaced with a `Failure` which can contain useful information. `Success` takes the place of `Some`.

# Definition

The `Result` data type is the union of two members: `Failure` and `Success`. The way chosen by the `@fp-ts/core` library to model this union in TypeScript is to use a feature of the language called [Discriminating Unions](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions).

> A common technique for working with unions is to have a single field which uses literal types which you can use to let TypeScript narrow down the possible current type

By convention in `@fp-ts/core`, this single field which uses literal types is named "\_tag" (but you can use any name when defining your unions).

Furthermore, `Result` is a "polymorphic" data type, that is, it makes use of a feature of TypeScript named ["Generics"](https://www.typescriptlang.org/docs/handbook/2/generics.html), meaning that the `Result` data type is a container that can hold any type.

Here's the complete definition of the `Result` type:

```ts
// Define the `Result` data type as the union of `Failure` and `Success`
export type Result<E, A> = Failure<E> | Success<A>;

// Holds the information for a failure case
export type Failure<E> = {
  // Discriminating field used to identify the variant
  readonly _tag: "Failure";
  // The actual error
  readonly failure: E;
};

// Holds the result of a successful computation
export type Success<A> = {
  // Discriminating field used to identify the variant
  readonly _tag: "Success";
  // The actual value
  readonly success: A;
};
```

The `Result` data type is defined as a union of two other types, `Failure` and `Success`, that represent the two possible outcomes of a computation: a failure or a success.

The type parameters `E` and `A` are used to specify the type of the failure value and the success value that the `Result` holds respectively.

The `_tag` field is used to distinguish between the two variants, `Failure` and `Success`.

# Using `Result`

To create an instance of `Result`, you can use the `success` and `failure` constructors, which construct a new `Result` holding a `Success` or `Failure` value respectively.

```ts
import { failure, success } from "@fp-ts/core/Result";

const success: Result<string, number> = success(1);
const failure: Result<string, number> = failure("error message");
```

Let's summarize the two cases in a table:

**Cheat sheet** (constructors)

| Name      | Given | To                 |
| --------- | ----- | ------------------ |
| `success` | `A`   | `Result<never, A>` |
| `failure` | `E`   | `Result<E, never>` |

# Conversions

You can also use the `fromOption` function to convert an `Option` to an `Result`.

```ts
import { Result, fromOption } from "@fp-ts/core/Result";
import { none, some } from "@fp-ts/core/Option";

const success: Result<string, number> = fromOption(
  some(1),
  () => "error message"
);
const failure: Result<string, number> = fromOption(
  none(),
  () => "error message"
);
```

The `fromOption` function requires a second argument because it needs to know what value to use for the `Failure` variant of the `Result` type when given a `None`. In the example, the argument "error message" is used as the value for the `Failure` variant when `None` is encountered. This allows `Result` to provide more information about why a failure occurred.

**Cheat sheet** (conversions)

| Name           | Given                                | To                 | Note                |
| -------------- | ------------------------------------ | ------------------ | ------------------- |
| `fromOption`   | `Option<A>`, `onNone: LazyArg<E>`    | `Result<E, A>`     |                     |
| `toOption`     | `Result<E, A>`                       | `Option<A>`        |                     |
| `getSuccess`   | `Result<E, A>`                       | `Option<A>`        | alias of `toOption` |
| `getFailure`   | `Result<E, A>`                       | `Option<E>`        |                     |
| `toRefinement` | `A => Result<E, B>`                  | `Refinement<A, B>` |                     |
| `fromIterable` | `Iterable<A>`, `onEmpty: LazyArg<E>` | `Result<E, A>`     |                     |
| `toArray`      | `Result<E, A>`                       | `Array<A>`         |                     |

# Working with `Result`

Once you have an instance of `Result`, you can use the various functions provided in the `@fp-ts/core/Result` module to work with it.

The `map` function can be used to transform the `Success` values:

```ts
import { pipe } from "@fp-ts/core/Function";
import { Result, success, map } from "@fp-ts/core/Result";

const success: Result<string, number> = pipe(
  success(1),
  map((x) => x + 1)
); // success(2)
```

As you can see you can transform the result of your computation without unwrapping and wrapping the underlying value of `Result`.

What is very convenient about `Result` is how the absence of value (i.e. a `Failure`) is handled. See the example below:

```ts
import { pipe } from "@fp-ts/core/Function";
import { Result, failure, map } from "@fp-ts/core/Result";

const failure: Result<string, number> = pipe(
  failure("error"),
  // tries to map the value inside the `Success`, but it does not exist, resulting in `Failure`
  map((x) => x + 1)
);
```

As you can see, even though we started with a `Failure` value, we can still operate on our `Result`. No errors are thrown or shown to the user, unless we do it intentionally. What happens is that when the `Result` is `Failure`, the mapping doesn't even happen and the `Failure` value representing the failed computation is returned unchanged.

In case you want to map the value contained in the `Failure`, for example to change the type of error you want to express, you can use the `mapFailure` API which acts like `map` but this time on the `Failure` part of an `Result`:

```ts
import { pipe } from "@fp-ts/core/Function";
import { Result, failure, mapFailure } from "@fp-ts/core/Result";

const failure: Result<string, number> = pipe(
  failure("error message"),
  mapFailure((x) => x + "!")
); // failure("error message!")
```

# Handling failing computations

Let's see how to use the `Result` data type to model a computation that can fail, such as a function that can throw an exception based on certain conditions. Let's take the case of the following function:

```ts
function parseNumber(s: string): number {
  const n = parseFloat(s);
  if (isNaN(n)) {
    throw new Error(`Cannot parse '${s}' as a number`);
  }
  return n;
}
```

An alternative to throwing an exception is to always return a value, but this value will be of type `Result<string, number>` instead of `number`, with the following interpretation:

- if `parseNumber` returns a `Failure<string>` value, it means that the computation failed, and the `Failure` contains an error message or other information about the failure
- if the result is instead a `Success<number>` value, it means that the computation succeeded and the computed value is wrapped inside the `Success`

Let's see how we can rewrite the `parseNumber` function without throwing exceptions and using the `Result` data type instead:

```ts
import { Result, failure, success } from "@fp-ts/core/Result";

function parseNumber(s: string): Result<string, number> {
  const n = parseFloat(s);
  return isNaN(n) ? failure(`Cannot parse '${s}' as a number`) : success(n);
}

console.log(parseNumber("2")); // success(2)
console.log(parseNumber("Not a number")); // failure("Cannot parse 'Not a number' as a number")
```

What happens if we add a call to the `parseNumber` function to a pipeline that already involves an `Result`?

```ts
const result = pipe(
  success("2"),
  map((s) => parseNumber(s)),
  map((n) => n2) // type-checker error!
);
```

There's something wrong, we received an error from the type checker, what happened?

The problem is that in the second `map` the parameter `n` is of type `Result<string, number>` and not `number`.

```ts
const result = pipe(
  success("2"),
  map((s) => parseNumber(s)),
  map((x: Result<string, number>) => ...)
);
```

Fortunately, the fix is simple, when adding a computation that returns an `Result` to our pipeline we should use the `flatMap` function instead of the `map` function:

```ts
import { pipe } from "@fp-ts/core/Function";
import { success, flatMap, map } from "@fp-ts/core/Result";

const result = pipe(
  success("2"),
  flatMap((s) => parseNumber(s)),
  map((n) => n2) // ok! now `n` has type `number`
);
```

Let's summarize the two cases in a table:

**Cheat sheet** (sequencing)

| Name      | Given                                  | To                    |
| --------- | -------------------------------------- | --------------------- |
| `map`     | `Result<E, A>`, `A => B`               | `Result<E, B>`        |
| `flatMap` | `Result<E1, A>`, `E1 => Result<E2, B>` | `Result<E1 \| E2, B>` |

The `flatMap` function offers the same convenience as the `map` function, which only continues with the computations contained in the pipeline if a `Failure` value is **not** encountered:

**Happy path, starting with a valid input**

```ts
import { pipe } from "@fp-ts/core/Function";
import { Result, success, flatMap, map } from "@fp-ts/core/Result";

const success: Result<string, number> = pipe(
  success("2"),
  flatMap((s) => parseNumber(s)), // parse the input to number
  map((x) => x2), // double the parsed number
  map((x) => x - 3) // subtract 3
); // success(1)
```

**Error path, starting with an invalid input**

```ts
import { pipe } from "@fp-ts/core/Function";
import { Result, success, flatMap, map } from "@fp-ts/core/Result";

const failure: Result<string, number> = pipe(
  success("Not a number"),
  flatMap((s) => parseNumber(s)), // parse the input to number
  map((x) => x2), // This will not be executed because parseNumber will return Failure
  map((x) => x - 3) // This will not be executed
); // failure("Cannot parse 'Not a number' as a number")
```

**Error path, starting with None**

```ts
import { pipe } from "@fp-ts/core/Function";
import { Result, failure, flatMap, map } from "@fp-ts/core/Result";

const failureStart: Result<string, number> = pipe(
  failure("error message"),
  flatMap((s) => parseNumber(s)), // This will not be executed because it starts with Failure
  map((x) => x2), // This will not be executed
  map((x) => x - 3) // This will not be executed
); // failure("error message")
```

When using this approach, the **desired outcome** is always in clear view while defining your pipeline. This allows you to focus on the expected result, while leaving it to `Result` to handle any potential errors that may arise seamlessly and transparently.

You can focus on the successful scenario and let `Result` handle the tedious task of managing potential errors at every step of the pipeline, without the need for explicit handling.

# Debugging

At any time, it is possible to inspect what is happening in your pipeline using two utility functions:

**Cheat sheet** (debugging)

| Name             | Given                       | To             | Note                                    |
| ---------------- | --------------------------- | -------------- | --------------------------------------- |
| `inspectSuccess` | `Result<E, A>`, `A => void` | `Result<E, A>` | callback called if it is a `Success<A>` |
| `inspectFailure` | `Result<E, A>`, `E => void` | `Result<E, A>` | callback called if it is a `Failure<E>` |

Let's see an example where both are in action:

```ts
import { pipe } from "@fp-ts/core/Function";
import {
  Result,
  success,
  inspectSuccess,
  flatMap,
  inspectFailure,
  map,
} from "@fp-ts/core/Option";

const failure: Result<string, number> = pipe(
  success("Not a number"),
  inspectSuccess(console.log),
  flatMap((s) => parseNumber(s)),
  inspectFailure(console.error),
  map((x) => x2),
  map((x) => x - 3)
);
// "Not a number"
// "Cannot parse 'Not a number' as a number"
```

Please note that these two functions should only be used for debugging purposes and it is not recommended to use them for performing side effects or encoding business logic.

# Pattern matching and error handling

We have seen how easy and convenient it is to build pipelines involving the `Result` data type, leaving it to handle any errors that may occur at any step. However, at some point, you will be interested in manually handling the error to understand the overall result obtained from the pipeline and decide what to do accordingly.

The fastest way to get the value wrapped in an `Result` is to call the `getOrThrow` function, but be aware that, as the name suggests, an exception will be thrown in case the `Result` you are querying is a `Failure`:

```ts
import { getOrThrow } from "@fp-ts/core/Result";

console.log(getOrThrow(success(10)); // 10
console.log(getOrThrow(failure("error message")); // throws new Error("getOrThrow called on a Failure")
```

A more safe alternative is using the `isSuccess` and `isFailure` guards:

```ts
import { success, failure, isSuccess, isFailure } from "@fp-ts/core/Result";

const value1 = success(1);

// Use the `isSuccess` function to check if the `value1` is an instance of `Success`
if (isSuccess(value1)) {
  console.log(`Result has a value: ${value1.success}`);
} else {
  console.log(`Result is a Failure.`);
}
// Result has a value: 1

const value2 = failure("error message");

// Use the `isFailure` function to check if the `value2` is an instance of `Failure`
if (isFailure(value2)) {
  console.log(`Result has error: ${value2.failure}`);
} else {
  console.log(`Result is a Success.`);
}
// Result has error: error message
```

Another alternative is [pattern matching](https://github.com/gvergnaud/ts-pattern#what-is-pattern-matching) on the `Result`.

The `match` function allows us to match on the `Failure` and `Success` cases of an `Result` value and provide different actions for each.

```ts
import { pipe } from "@fp-ts/core/Function";
import { success, match } from "@fp-ts/core/Result";

const result = success(1);

/**
 * Use the `match` function to conditionally return a string based on whether the `Result` is `Failure` or `Success`.
 * If the `Result` is `Failure`, the `failure` will be passed to the first function.
 * If the `Result` is `Success`, the `success` will be passed to the second function.
 */
const output = match(
  result,
  (failure) => `Result has error. ${failure}`,
  (success) => `Result has a value: ${success}`
);

console.log(output); // Result has a value: 1
```

One reason to use `match` instead of `isSuccess` or `isFailure` is that `match` is more expressive and provides a clear way to handle both cases of an `Result`. With `match`, you can directly provide two functions to handle the case of the `Result` being `Failure` or `Success`, respectively. On the other hand, with `isSuccess` or `isFailure`, you would need to manually check the value and take separate actions based on whether it's `Success` or `Failure`. With `match`, the code can be more concise and easy to understand. Additionally, if you have complex logic to handle both cases, using `match` can make the code easier to read and maintain.

There are specializations of `match` to make working with code that does not use `Result` more convenient and faster, particularly `getOrNull` and `getOrUndefined`.

```ts
import {
  getOrNull,
  getOrUndefined,
  success,
  failure,
} from "@fp-ts/core/Result";

getOrNull(success(5)); // 5
getOrNull(failure("error")); // null

getOrUndefined(success(5)); // 5
getOrUndefined(failure("error")); // undefined
```

For greater flexibility, there is also the `getOrElse` function which allows you to set what value corresponds to the `Failure` case:

```ts
import { getOrElse, success, failure } from "@fp-ts/core/Result";

getOrElse(success(5), () => 0); // 5
getOrElse(failure("error"), () => 0); // 0
```

It often happens that the action you want to take when a computation returns `None` is to continue with another computation that returns an `Option`, in this case you can use the `orElse` API:

```ts
import { pipe } from "@fp-ts/core/Function";
import { Result, success, failure, orElse } from "@fp-ts/core/Result";

const fetchData = (): Result<string, string> => {
  // Imagine we have a function that returns an `Result` of data
  return Math.random() < 0.5
    ? success("Data fetched successfully")
    : failure("Data fetched unsuccessfully");
};

const retryFetchData = (): Result<string, string> =>
  pipe(
    fetchData(), // Call the function for the first time
    orElse(() => fetchData()) // If it fails, call it again
  );

const result = retryFetchData();
```

**Cheat sheet** (error handling)

| Name             | Given                                                    | To                   |
| ---------------- | -------------------------------------------------------- | -------------------- |
| `match`          | `Result<E, A>`, `onFailure: E => B`, `onSuccess: A => C` | `B \| C`             |
| `getOrThrow`     | `Result<E, A>`                                           | `A` (may throw)      |
| `getOrNull`      | `Result<E, A>`                                           | `A \| null`          |
| `getOrUndefined` | `Result<E, A>`                                           | `A \| undefined`     |
| `getOrElse`      | `Result<E, A>`, `onFailure: E => B`                      | `A \| B`             |
| `orElse`         | `Result<E1, A>`, `LazyArg<Result<E2, B>>`                | `Result<E1, A \| B>` |
| `firstSuccessOf` | `Result<E, A>`, `Iterable<Result<E, A>>`                 | `Result<E, A>`       |

# Interop

A need that arises quickly when using the `Result` data type is the ability to interoperate with code that does not share the same style, in particular code that for example uses `undefined` or `null` to indicate that a value is optional, or code that throws exceptions.

The `Result` data type offers a series of APIs to make this task easier, let's start with the first of the two cases, that is when the need is to interoperate with code that use a nullable type to indicate that a value is optional.

It is possible to create an `Eitehr` from a nullable value using the `fromNullable` API, let's see an example:

```ts
import { fromNullable, success, failure } from "@fp-ts/core/Result";

console.log(fromNullable(null, () => "error")); // failure("error")
console.log(fromNullable(undefined, () => "error")); // failure("error")
console.log(fromNullable(1, () => "error")); // success(1)
```

Instead of a single value, we can also modify the definition of a function that returns a nullable value to a function that returns an `Result` (a process that goes by the name of "lifting"):

```ts
import { liftNullable, success, failure } from "@fp-ts/core/Result";

const parse = (s: string): number | undefined => {
  const n = parseFloat(s);
  return isNaN(n) ? undefined : n;
};

// const parseResult: (s: string) => Result<string, number>
const parseResult = liftNullable(
  parse,
  (s) => `Cannot parse '${s}' as a number`
);

console.log(parseResult("1")); // success(1)
console.log(parseResult("not a number")); // failure("Cannot parse 'not a number' as a number")
```

On the other hand, if we have a value of type `Result` and we want to convert it into a nullable value we have two possibilities:

- convert `Failure` to `null`
- convert `Failure` to `undefined`

The two APIs `getOrNull` and `getOrUndefined` respectively achieve these two tasks:

```ts
import {
  getOrNull,
  getOrUndefined,
  success,
  failure,
} from "@fp-ts/core/Result";

console.log(getOrNull(success(1))); // 1
console.log(getOrNull(failure("error message"))); // null

console.log(getOrUndefined(success(1))); // 1
console.log(getOrUndefined(failure("error message"))); // undefined
```

**Cheat sheet** (interop - nullable)

| Name              | Given                                                             | To                                      |
| ----------------- | ----------------------------------------------------------------- | --------------------------------------- |
| `fromNullable`    | `A`, `A => E`                                                     | `Result<E, NonNullable<A>>`             |
| `liftNullable`    | `(...a: A) => B \| null \| undefined`, `(...a: A) => E`           | `(...a: A) => Result<E, NonNullable<B>` |
| `flatMapNullable` | `Result<E1, A>`, `(...a: A) => B \| null \| undefined`, `A => E2` | `Result<E1 \| E2, NonNullable<B>>`      |
| `getOrNull`       | `Result<E, A>`                                                    | `A \| null`                             |
| `getOrUndefined`  | `Result<E, A>`                                                    | `A \| undefined`                        |
| `merge`           | `Result<E, A>`                                                    | `E \| A`                                |

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
import { Result, success, failure } from "@fp-ts/core/Result";

function parseNumber(s: string): Result<string, number> {
  const n = parseFloat(s);
  return isNaN(n) ? failure(`Cannot parse '${s}' as a number`) : success(n);
}
```

However, this involves tedious, error-prone, and boilerplate-heavy work. It would be much more convenient not to have to rewrite the `parseNumber` function from scratch but only to transform it into the desired result in one step, and that's exactly what the `fromThrowable` API takes care of doing:

```ts
import { liftThrowable } from "@fp-ts/core/Result";

const parse = liftThrowable(JSON.parse, () => "parse error");

console.log(parse("1")); // success(1)
console.log(parse("")); // failure("parse error")
```

On the other hand, if we have a value of type `Option` and want to get the wrapped value, accepting the fact that if the `Option` is a `None` we will get an exception, we can use the `getOrThrow` API:

```ts
import { getOrThrow, success, failure } from "@fp-ts/core/Result";

console.log(getOrThrow(success(10)); // 10
console.log(getOrThrow(failure("error message")); // throws new Error("getOrThrow called on a Failure")
```

**Cheat sheet** (interop - throwing)

| Name            | Given                                        | To                          |
| --------------- | -------------------------------------------- | --------------------------- |
| `liftThrowable` | `(...a: A) => B` (may throw), `unknown => E` | `(...a: A) => Result<E, B>` |
| `getOrThrow`    | `Result<E, A>`                               | `A` (may throw)             |

# Combining two or more `Result`s

The `zipWith` function allows you to combine two `Result`s using a provided function. The resulting value is a new `Result` that holds the combined value of both original `Result`s.

Let's consider the following example where we have two `Result`s that hold values of two different types, `string` and `number`:

```ts
import { Result, success } from "@fp-ts/core/Result";

const name: Result<string, string> = success("John");
const age: Result<string, number> = success(25);
```

If we want to combine these two `Result`s into a single `Result` that holds an object with properties `name` and `age`, we can use the `zipWith` function:

```ts
import { zipWith } from "@fp-ts/core/Result";

const combine = zipWith(name, age, (n, a) => ({ name: n, age: a }));
console.log(combine); // success({ name: 'John', age: 25 })
```

The `zipWith` function takes three arguments: the two `Result`s that you want to combine, and a function that takes two arguments - the values held by the two `Result`s - and returns the combined value.

If either of the two `Result`s is `Failure`, the resulting `Result` will be `Failure` as well:

```ts
const name: Result<string, string> = failure("missing name");
const age: Result<string, number> = success(25);
const combine = zipWith(name, age, (n, a) => ({ name: n, age: a }));
console.log(combine); // failure("missing name")
```

This is because the `zipWith` function only combines the values if both `Result`s are `Success`.

**Cheat sheet** (combining)

| Name            | Given                                           | To                                             |
| --------------- | ----------------------------------------------- | ---------------------------------------------- |
| `zipWith`       | `Result<E1, A>`, `Result<E2, B>`, `(A, B) => C` | `Result<E1 \| E2, C>`                          |
| `tuple`         | `[Result<E1, A>, Result<E1, B>, ...]`           | `Result<E1 \| E2 \| ..., [A, B, ...]>`         |
| `struct`        | `{ a: Result<E1, A>, b: Result<E1, B>, ... }`   | `Result<E1 \| E2 \| ..., { a: A, b: B, ... }>` |
| `all`           | `Iterable<Result<E, A>>`                        | `Result<E, A[]>`                               |
| `appendElement` | `Result<E1, [A, B, ...]>`, `Result<E2, C>`      | `Result<E1 \| E2, [A, B, ..., C]>`             |
| `ap`            | `Result<E1, (a: A) => B>`, `Result<E2, A>`      | `Result<E1 \| E2, B>`                          |

For convenience, a series of algebraic operations such as sums and products are exported.

```ts
import { success, failure, sum } from "@fp-ts/core/Result";

const num1 = success(3);
const num2 = success(4);
const num3 = failure("not a number");

// Summing two `Success` values will result in a `Success` with the sum of the values
const sumOfSuccess = sum(num1, num2);
console.log(sumOfSuccess); // success(7)

// Summing a `Success` and a `Failure` will result in a `Failure`
const sumOfSuccessAndFailure = sum(num1, num3);
console.log(sumOfSuccessAndFailure); // failure("not a number")
```

**Cheat sheet** (algebraic operations)

| Name       | Given                                      | To                         |
| ---------- | ------------------------------------------ | -------------------------- |
| `sum`      | `Result<E1, number>`, `Result<E2, number>` | `Result<E1 \| E2, number>` |
| `multiply` | `Result<E1, number>`, `Result<E2, number>` | `Result<E1 \| E2, number>` |
| `subtract` | `Result<E1, number>`, `Result<E2, number>` | `Result<E1 \| E2, number>` |
| `divide`   | `Result<E1, number>`, `Result<E2, number>` | `Result<E1 \| E2, number>` |
