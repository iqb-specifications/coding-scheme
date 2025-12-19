export type ResponseValueSingleType = null | string | number | boolean;
export type ResponseValueType =
    | ResponseValueSingleType
    | ResponseValueSingleType[];
export type TransformedResponseValueType = ResponseValueType | string[][];

export type RuleMethod =
    | 'MATCH'
    | 'MATCH_REGEX'
    | 'NUMERIC_MATCH'
    | 'NUMERIC_RANGE'
    | 'NUMERIC_FULL_RANGE'
    | 'NUMERIC_LESS_THAN'
    | 'NUMERIC_MORE_THAN'
    | 'NUMERIC_MAX'
    | 'NUMERIC_MIN'
    | 'IS_EMPTY'
    | 'IS_NULL'
    | 'IS_TRUE'
    | 'IS_FALSE';

export type ProcessingParameterType =
    | 'IGNORE_CASE'
    | 'IGNORE_ALL_SPACES'
    | 'IGNORE_DISPENSABLE_SPACES'
    | 'SORT_ARRAY'
    | 'REPLAY_REQUIRED'
    | 'ATTACHMENT'
    | 'CODER_TRAINING_REQUIRED';
export type CodeModelType = 'MANUAL_AND_RULES' | 'RULES_ONLY' | 'MANUAL_ONLY';
export type CodeType =
    | 'UNSET'
    | 'FULL_CREDIT'
    | 'PARTIAL_CREDIT'
    | 'NO_CREDIT'
    | 'TO_CHECK'
    | 'RESIDUAL'
    | 'RESIDUAL_AUTO'
    | 'INTENDED_INCOMPLETE';
export type SourceType =
    | 'BASE'
    | 'BASE_NO_VALUE'
    | 'MANUAL'
    | 'COPY_VALUE'
    | 'CONCAT_CODE'
    | 'SUM_CODE'
    | 'SUM_SCORE'
    | 'UNIQUE_VALUES'
    | 'SOLVER';
export type SourceProcessingType =
    | 'TO_LOWER_CASE'
    | 'TO_NUMBER'
    | 'REMOVE_ALL_SPACES'
    | 'REMOVE_DISPENSABLE_SPACES'
    | 'TAKE_DISPLAYED_AS_VALUE_CHANGED'
    | 'TAKE_EMPTY_AS_VALID'
    | 'SORT'
    | 'TAKE_NOT_REACHED_AS_VALUE_CHANGED';

export type CodingSchemeProblemType =
    | 'VACANT'
    | 'SOURCE_MISSING'
    | 'INVALID_SOURCE'
    | 'RULE_PARAMETER_COUNT_MISMATCH'
    | 'MORE_THAN_ONE_SOURCE'
    | 'ONLY_ONE_SOURCE'
    | 'VALUE_COPY_NOT_FROM_BASE';

export interface CodingRule {
  method: RuleMethod;
  parameters?: string[];
  fragment?: number;
}

export interface RuleSet {
  rules: CodingRule[];
  ruleOperatorAnd?: boolean;
  valueArrayPos?: number | 'ANY' | 'ANY_OPEN' | 'SUM' | 'LENGTH';
}

export interface CodeData {
  id: number | 'INVALID' | 'INTENDED_INCOMPLETE';
  type?: CodeType;
  label?: string;
  score?: number;
  manualInstruction?: string;
  ruleSetOperatorAnd?: boolean;
  ruleSets?: RuleSet[];
}

export interface CodingSchemeData {
  version: string;
  variableCodings: VariableCodingData[];
}

export interface VariableSourceParameters {
  solverExpression?: string;
  processing?: SourceProcessingType[];
}

export interface VariableCodingData {
  id: string;
  sourceType: SourceType;
  alias?: string;
  label?: string;
  sourceParameters?: VariableSourceParameters;
  deriveSources?: string[];
  processing?: ProcessingParameterType[];
  fragmenting?: string;
  manualInstruction?: string;
  codeModel?: CodeModelType;
  page?: string;
  codes?: CodeData[];
}
