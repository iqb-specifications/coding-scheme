[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/%40iqbspecs%2Fcoding-scheme)](https://www.npmjs.com/package/@iqbspecs/coding-scheme)

This package contains the data specification for coding assessment output.

It provides:

-   **JSON Schema**: `coding-scheme.schema.json`
-   **Schema documentation**: generated into `public/` (based on [AsyncAPI Generator](https://github.com/asyncapi/generator))
-   **TypeScript types** for the schema (`CodingSchemeData`, `VariableCodingData`, `CodeData`, ...)
-   A small helper class **`CodingScheme`** for reading/writing versioned scheme JSON

## Installation

```bash
npm i @iqbspecs/coding-scheme
```

## Usage (TypeScript)

Import from the package root:

```ts
import {
    CodingScheme,
    type CodingSchemeData,
    type VariableCodingData,
    CodingSchemeVersionMajor,
    CodingSchemeVersionMinor,
} from "@iqbspecs/coding-scheme";
```

### Parse a scheme and re-serialize it

`CodingScheme` accepts either a JSON string or a parsed object.

```ts
const raw = '{"version":"3.4","variableCodings":[]}';
const scheme = new CodingScheme(raw);

// normalized, versioned JSON string
const normalized = scheme.toString();
```

### Check compatibility of a scheme version

```ts
const status = CodingScheme.checkVersion({
    version: "3.4",
    variableCodings: [],
} satisfies CodingSchemeData);

// 'OK' | 'MAJOR_LESS' | 'MAJOR_GREATER' | 'MINOR_GREATER'
```

The current library version constants are:

-   **`CodingSchemeVersionMajor`**: `3`
-   **`CodingSchemeVersionMinor`**: `5`

### Partial credit with empty source responses (3.5)

For `SUM_SCORE`, `SUM_CODE` and `CONCAT_CODE`, the derived variable can opt in
through `sourceParameters.processing`:

- `TAKE_DISPLAYED_AS_ZERO_IF_PARTIAL`: replace contributions from `DISPLAYED`
  sources, including displayed checkbox defaults such as `false`.
- `TAKE_EMPTY_AS_ZERO_IF_PARTIAL`: replace contributions from `INVALID` sources
  whose value is exactly `null`, `""` or `[]`. Neither `false` nor `0` is empty.

Both options are disabled by default. Replacement requires at least one source
with status `CODING_COMPLETE`. Pending codings are never replaced and yield
`DERIVE_PENDING` when all other sources are coded or explicitly allowed partials.
Otherwise the existing status and error precedence applies. With no coded or
pending source, the existing aggregation is preserved, including mixtures of
`DISPLAYED` and empty `INVALID`: there is no automatic zero score or `x_x`.

Replacement happens only inside this derivation; original source status, value,
code and score remain unchanged. The replacement contribution is score `0` for
`SUM_SCORE`, code `0` for `SUM_CODE`, and the text placeholder `x` for
`CONCAT_CODE`. Thus `0_x` differs from two genuinely coded zeros (`0_0`). The
placeholder is part of the derived text value, not a new code ID. Sorting also
applies to placeholders when `SORT` is enabled. Other derivation methods,
including the existing SOLVER policies, are unaffected.

### Types

The package exports the schema types from `coding-scheme.interface.ts`, including:

-   **`CodingSchemeData`**: top-level object with `version` and `variableCodings`
-   **`VariableCodingData`**: per-variable coding configuration
-   **`CodeData`**, **`RuleSet`**, **`CodingRule`**: rule-driven coding definitions

## Public API exports

In addition to the TypeScript types, the package exports constants and helpers from `coding-scheme.ts`:

-   **`CodingScheme`**
-   **State constants**:
    -   `validStatesForDerivingValue`
    -   `validStatesForDerivingCode`
    -   `validStatesToStartDeriving`
    -   `statesToReplaceByDeriveError`
-   **Rule constants**:
    -   `RuleMethodParameterCount`
    -   `numericRules`
    -   `booleanRules`
-   **Derive constants**:
    -   `deriveMethodsFromValue`
    -   `DeriveConcatDelimiter`

## Schema validation and documentation generation (repo)

This repository includes scripts to validate and generate documentation.

-   **Validate schema against test cases**:

```bash
npm run test_schema
```

-   **Generate HTML docs into `public/`**:

```bash
npm run generate_docs
```

## Read more

-   [All specifications of IQB](https://iqb-specifications.github.io/) (German only)
-   [Learn about TBA](https://iqb-berlin.github.io/tba-info/) (German only)
-   [Releases with change notes](https://github.com/iqb-specifications/coding-scheme/releases)
