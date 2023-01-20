# @fp-ts/core

## next

**Breaking changes**

- `typeclass/Semiproduct`
  - rename `productFlatten` to `element`

**New Features**

- `Boolean`
  - add `not` combinator
- `Order`
  - add `array` combinator
  - add `bigint` instance
- `Monoid`
  - add `array`, `readonlyArray` combinators
- `Semigroup`
  - add `array`, `readonlyArray` combinators
- modules
  - `typeclass/Equivalence`
  - `typeclass/Filterable`
  - `typeclass/TraversableFilterable`
  - `Bigint`
  - `Boolean`
  - `Either`
  - `Function`
  - `Identity`
  - `Number`
  - `Option`
  - `Ordering`
  - `Predicate`
  - `ReadonlyArray`
  - `ReadonyRecord`
  - `String`
  - `Struct`
  - `Symbol`
  - `These`

## 0.0.11

### Patch Changes

- [#39](https://github.com/fp-ts/core/pull/39) [`c27db5e7`](https://github.com/fp-ts/core/commit/c27db5e796071966a64af1a860b56e417f99423e) Thanks [@gcanti](https://github.com/gcanti)! - revert 0.0.10 changes

## 0.0.10

### Patch Changes

- [#36](https://github.com/fp-ts/core/pull/36) [`51bb90bd`](https://github.com/fp-ts/core/commit/51bb90bd4f32bd878575a159a2bc0c8c3b3ff57b) Thanks [@gcanti](https://github.com/gcanti)! - remove readonly

## 0.0.9

### Patch Changes

- [#33](https://github.com/fp-ts/core/pull/33) [`c8246ea5`](https://github.com/fp-ts/core/commit/c8246ea56c07d44507b90be49bc529ddee2847d6) Thanks [@gcanti](https://github.com/gcanti)! - remove Compactable, Filterable, TraversableFilterable and /data folder

## 0.0.8

### Patch Changes

- [#29](https://github.com/fp-ts/core/pull/29) [`c2e0f09d`](https://github.com/fp-ts/core/commit/c2e0f09dc0d5aca2cc3c200adbe25991ff1a8c0c) Thanks [@gcanti](https://github.com/gcanti)! - NonEmptyAlternative: rename to SemiAlternative

- [#29](https://github.com/fp-ts/core/pull/29) [`adbf4dbc`](https://github.com/fp-ts/core/commit/adbf4dbc1e6d8ea2d85e897de8048be7ac6dd88c) Thanks [@gcanti](https://github.com/gcanti)! - NonEmptyProduct: rename to SemiProduct

- [#29](https://github.com/fp-ts/core/pull/29) [`07b7061b`](https://github.com/fp-ts/core/commit/07b7061bcef03d405a47777bc89e979c1b58e335) Thanks [@gcanti](https://github.com/gcanti)! - NonEmptyProduct: rename bindKind to andThenBind

- [#29](https://github.com/fp-ts/core/pull/29) [`1f116d3d`](https://github.com/fp-ts/core/commit/1f116d3ddfbb26afd9e92b7001de7f1425774d3e) Thanks [@gcanti](https://github.com/gcanti)! - NonEmptyApplicative: rename to SemiApplicative

- [#29](https://github.com/fp-ts/core/pull/29) [`d539285e`](https://github.com/fp-ts/core/commit/d539285e270d69bd995a3ebc4e98a84b74665f46) Thanks [@gcanti](https://github.com/gcanti)! - NonEmptyCoproduct: rename to SemiCoproduct

## 0.0.7

### Patch Changes

- [#26](https://github.com/fp-ts/core/pull/26) [`2aa35975`](https://github.com/fp-ts/core/commit/2aa35975d2803377c0a629603b308e3c2c6448b9) Thanks [@gcanti](https://github.com/gcanti)! - NonEmptyTraversable: rename nonEmptyTraverse to traverseNonEmpty, nonEmptySequence to sequenceNonEmpty

- [#26](https://github.com/fp-ts/core/pull/26) [`9d4ac0bb`](https://github.com/fp-ts/core/commit/9d4ac0bb2dc82a33a9959565b6af8289af0f4403) Thanks [@gcanti](https://github.com/gcanti)! - Traversable: add sequence as member

- [#26](https://github.com/fp-ts/core/pull/26) [`eb6020ca`](https://github.com/fp-ts/core/commit/eb6020ca6b8d1cbe3cb4ead58ab9b54cc9ce82a3) Thanks [@gcanti](https://github.com/gcanti)! - Foldable: remove reduceRight from typeclass

- [#28](https://github.com/fp-ts/core/pull/28) [`9f6a193e`](https://github.com/fp-ts/core/commit/9f6a193e4580aadc18ccc172a9e3cf6ffde5c19d) Thanks [@gcanti](https://github.com/gcanti)! - NonEmptyCoproduct / Coproduct: fix getSemigroup / getMonoid type params

- [#26](https://github.com/fp-ts/core/pull/26) [`29a94c17`](https://github.com/fp-ts/core/commit/29a94c17f0f018627892f1749acbdea07471374f) Thanks [@gcanti](https://github.com/gcanti)! - NonEmptyProduct: rename struct to nonEmptyStruct

- [#26](https://github.com/fp-ts/core/pull/26) [`577f9597`](https://github.com/fp-ts/core/commit/577f9597db0a53728fca14e9a945e1e0d7164957) Thanks [@gcanti](https://github.com/gcanti)! - Foldable: add a default `reduceRight` implementation

- [#26](https://github.com/fp-ts/core/pull/26) [`fc914c93`](https://github.com/fp-ts/core/commit/fc914c9319017abd3da4b11987342fbf56806eca) Thanks [@gcanti](https://github.com/gcanti)! - NonEmptyTraversable: add sequenceNonEmpty as member

- [#26](https://github.com/fp-ts/core/pull/26) [`fc4d0aae`](https://github.com/fp-ts/core/commit/fc4d0aaef2aeca6b63f10432695c62e808c6310b) Thanks [@gcanti](https://github.com/gcanti)! - NonEmptyProduct: rename tuple to nonEmptyTuple

## 0.0.6

### Patch Changes

- [#22](https://github.com/fp-ts/core/pull/22) [`e71d3d57`](https://github.com/fp-ts/core/commit/e71d3d57b0869ab3283a7bb68e76452bc0a2ffba) Thanks [@gcanti](https://github.com/gcanti)! - rename HKT params

## 0.0.5

### Patch Changes

- [#18](https://github.com/fp-ts/core/pull/18) [`be638f44`](https://github.com/fp-ts/core/commit/be638f44764484c8d93943d916d3fc0285466cbd) Thanks [@gcanti](https://github.com/gcanti)! - Semigroup: fix reverse implementation

- [#18](https://github.com/fp-ts/core/pull/18) [`ae9715f6`](https://github.com/fp-ts/core/commit/ae9715f6670fda76e25c955cdaab17c65af098ba) Thanks [@gcanti](https://github.com/gcanti)! - Foldable / FoldableWithIndex: add compositions

- [#18](https://github.com/fp-ts/core/pull/18) [`ba899d76`](https://github.com/fp-ts/core/commit/ba899d76debfd15031d0fff9079332fd33394f9b) Thanks [@gcanti](https://github.com/gcanti)! - Foldable / FlodableWithIndex: curry toReadonlyArrayWith and add toReadonlyArray

- [#18](https://github.com/fp-ts/core/pull/18) [`2d30a185`](https://github.com/fp-ts/core/commit/2d30a1852227ac4f5279ebafef46ac527f5048ee) Thanks [@gcanti](https://github.com/gcanti)! - add FunctorWithIndex module

- [#18](https://github.com/fp-ts/core/pull/18) [`9c531794`](https://github.com/fp-ts/core/commit/9c531794ca69346f38740e002687e4bd55fcb6b9) Thanks [@gcanti](https://github.com/gcanti)! - Semigroupal: remove useless zipWith export

- [#18](https://github.com/fp-ts/core/pull/18) [`9683f82d`](https://github.com/fp-ts/core/commit/9683f82d68e35bfa471a6b39d59830b078d868c9) Thanks [@gcanti](https://github.com/gcanti)! - Bounded: swap maximum, minimum arguments in fromSortable

## 0.0.4

### Patch Changes

- [#14](https://github.com/fp-ts/core/pull/14) [`1cac5547`](https://github.com/fp-ts/core/commit/1cac5547815673308916236780b94c6263825cde) Thanks [@gcanti](https://github.com/gcanti)! - rename Succeed typeclass to Pointed / of

- [#14](https://github.com/fp-ts/core/pull/14) [`6c9be695`](https://github.com/fp-ts/core/commit/6c9be6950e8bb004802dce959f8d133f7e911aa7) Thanks [@gcanti](https://github.com/gcanti)! - make all typeclass operations pipeable

- [#14](https://github.com/fp-ts/core/pull/14) [`8ae84df9`](https://github.com/fp-ts/core/commit/8ae84df993f63d1255a9b40a614fcc79fea8ad68) Thanks [@gcanti](https://github.com/gcanti)! - SemigroupKind: fix combineKind signature

- [#14](https://github.com/fp-ts/core/pull/14) [`51d62040`](https://github.com/fp-ts/core/commit/51d62040bf25ddc8e7911171d48b60282a35fb26) Thanks [@gcanti](https://github.com/gcanti)! - Ordering: remove sign function

- [#14](https://github.com/fp-ts/core/pull/14) [`89665e87`](https://github.com/fp-ts/core/commit/89665e8768e1c9fac1894c12b74e5941341a9473) Thanks [@gcanti](https://github.com/gcanti)! - remove Show typeclass

## 0.0.3

### Patch Changes

- [#12](https://github.com/fp-ts/core/pull/12) [`7c6fa2c4`](https://github.com/fp-ts/core/commit/7c6fa2c4992dd3aeffbd1e7a9aeb564a62c5f149) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - type class refactoring

## 0.0.2

### Patch Changes

- [#8](https://github.com/fp-ts/core/pull/8) [`79b1237c`](https://github.com/fp-ts/core/commit/79b1237c22a16f8354f8c5f086922585ce26b572) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - Fix package json repository urls

## 0.0.1

### Patch Changes

- [#1](https://github.com/fp-ts/core/pull/1) [`65983dd9`](https://github.com/fp-ts/core/commit/65983dd99a04cd2d1d6f503dabaa600df5c82d17) Thanks [@mikearnaldi](https://github.com/mikearnaldi)! - Dual ESM-CJS Support
