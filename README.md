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
const raw = '{"version":"3.3","variableCodings":[]}';
const scheme = new CodingScheme(raw);

// normalized, versioned JSON string
const normalized = scheme.toString();
```

### Check compatibility of a scheme version

```ts
const status = CodingScheme.checkVersion({
    version: "3.3",
    variableCodings: [],
} satisfies CodingSchemeData);

// 'OK' | 'MAJOR_LESS' | 'MAJOR_GREATER' | 'MINOR_GREATER'
```

The current library version constants are:

-   **`CodingSchemeVersionMajor`**: `3`
-   **`CodingSchemeVersionMinor`**: `3`

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
