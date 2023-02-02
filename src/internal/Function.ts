/**
 * @since 1.0.0
 */

/** @internal */
export const dual = <
  DataLast extends (...args: Array<any>) => any,
  DataFirst extends (...args: Array<any>) => any
>(
  dataFirstArity: Parameters<DataFirst>["length"],
  body: DataFirst
): DataLast & DataFirst => {
  // @ts-expect-error
  return function() {
    if (arguments.length >= dataFirstArity) {
      // @ts-expect-error
      return body.apply(this, arguments)
    }
    return ((self: any) => body(self, ...arguments)) as any
  }
}
