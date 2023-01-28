# The `These` data type

## A data structure providing "inclusive-or" as opposed to `Either`'s "exclusive-or".

If you interpret `Either<E, A>` as suggesting the computation may either fail or succeed (exclusively), then
`These<E, A>` may fail, succeed, or do both at the same time.

There are a few ways to interpret the `Both` case:

1.  You can think of a computation that has a non-fatal error.
2.  You can think of a computation that went as far as it could before erroring.
3.  You can think of a computation that keeps track of errors as it completes.

Another way you can think of `These<E, A>` is saying that we want to handle `E` kind of data, `A` kind of data, or
both `E` and `A` kind of data at the same time. This is particularly useful when it comes to displaying UI's.
