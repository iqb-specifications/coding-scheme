[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/%40iqbspecs%2Fcoding-scheme)](https://www.npmjs.com/package/@iqbspecs/coding-scheme)

This package contains of the data specification for coding assessment output.

* JSON Schema (see `coding-scheme.schema.json`)
* Schema documentation based on [AsyncAPI Generator](https://github.com/asyncapi/generator)
* type definitions for TypeScript (see npm-link above)

Read more:

* [All specifications of IQB](https://iqb-specifications.github.io/) (German only)
* [Learn about TBA](https://iqb-berlin.github.io/tba-info/) (German only)

# Change log

## 3.2

* `TAKE_NOT_REACHED_AS_VALUE_CHANGED` neuer Parameter für die Verarbeitung von Quell-Variablen
* `NUMERIC_FULL_RANGE` Regel >= Wert <= hinzugefügt
* `BASE_NO_VALUE` source type wird nicht zu den Antworten hinzugefügt
* Status `INTENDED_INCOMPLETE` und code type `INTENDED_INCOMPLETE` hinzugefügt
* Setze RuleMethodParameterCount -1 for NUMERIC_MATCH Regel

## 3.1
* neuer Wert für Property `valueArrayPos`: `LENGTH`; Werte Array muss angebene Länge haben
* neuer Wert für Property `valueArrayPos`: `ANY_OPEN`; dann wird - im Gegensatz zu `ANY` - erlaubt, dass Werte im Array sind, für die der Regelsatz nicht zutrifft
* Funktionalität für `valueArrayPos` - `ANY_OPEN` und `ANY` hinzugefügt bzw. korrigiert
* `IGNORE_CASE` führt jetzt zum `i`-Flag bei RegEx
* ein Werte-Array mit Länge 0 wird jetzt auch als 'leer' klassifiziert

## 3.0

* neue Property `version`; daher ist das gesamte Coding Scheme nicht mehr ein Array, sondern ein Objekt!
* neue Werte für code `type`: `RESIDUAL`, `RESIDUAL_AUTO`; ersetzt `ELSE`-Regel
* `ELSE`-Regel entfernt
* codingModel ist jetzt beschränkt auf `NONE`, `RULES_ONLY` und `MANUAL_ONLY`

## 2.2

* Neuer Wert für `codeModel`: `RULES_ONLY` - Ausblenden der Controls für die manuelle Kodierung
* Variable erhält neben der ID einen `alias`
* Code erhält einen `type`, um die Dokumentation zu erleichtern und die UI zu vereinfachen. Werte `UNSET`, `FULL_CREDIT`, `PARTIAL_CREDIT`, `NO_CREDIT` - `label` wurde hierfür immer missbraucht

## 2.1

* Neue Funktion `getVariableDependencyTree()`, um Zirkularbezüge festzustellen und die Reihenfolge der Ableitung bzw. Kodierung zu ermitteln. Außerdem werden hier Orte (page) abgeleiteter Variablen gesetzt. 

## 2.0

* Neue Ableitungsmethoden `UNIQUE_VALUES`, `SOLVER`
* neue Parameter 'sourceParameters' mit den Eigenschaften 'solverExpression' und 'processing' (mögliche Werte `TO_LOWER_CASE`, `TO_NUMBER`, `REMOVE_ALL_SPACES`, `REMOVE_DISPENSABLE_SPACES`, `TAKE_DISPLAYED_AS_VALUE_CHANGED`, `SORT`, `TAKE_EMPTY_AS_VALID`)
* Für Ableitungsmethode `CONCAT_CODE` eine Sortierungsoption `SORT` eingeführt
* processing `REMOVE_WHITE_SPACES` entfernt; stattdessen `IGNORE_ALL_SPACES`, `IGNORE_DISPENSABLE_SPACES`, `SORT_ARRAY`
* codeModelParameters entfernt
* Regel `NO_OTHER_MATCHES` entfernt (vorerst keine Unterstützung)

## 1.0

* id
* label
* sourceType `BASE`, `COPY_VALUE`, `CONCAT_CODE`, `SUM_CODE`, `SUM_SCORE`
* deriveSources
* processing `IGNORE_CASE`, `REPLAY_REQUIRED`, `ATTACHMENT`, `REMOVE_WHITE_SPACES`
* fragmenting
* manualInstruction
* codeModel `NONE`, `CHOICE`, `VALUE_LIST`, `NUMBER`, `MANUAL`
* codeModelParameters
* codes
  + id String | null
  + label
  + score
  + manualInstruction
  + ruleSetOperatorAnd
  + ruleSets
* page
