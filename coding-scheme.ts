import type {
  CodeData,
  ProcessingParameterType,
  RuleSet,
  VariableCodingData
} from './coding-scheme.interface';

export const validStatesForDerivingValue = [
  'VALUE_CHANGED',
  'NO_CODING',
  'CODING_INCOMPLETE',
  'CODING_ERROR',
  'CODING_COMPLETE'
];
export const validStatesForDerivingCode = ['CODING_COMPLETE'];
export const validStatesToStartDeriving = [
  'UNSET',
  'CODING_ERROR',
  'CODING_INCOMPLETE'
];
export const statesToReplaceByDeriveError = [
  'NO_CODING',
  'CODING_INCOMPLETE',
  'CODING_ERROR'
];
export const deriveMethodsFromValue = ['SOLVER', 'COPY_VALUE', 'UNIQUE_VALUES'];

export const RuleMethodParameterCount = {
  MATCH: -1,
  MATCH_REGEX: -1,
  NUMERIC_MATCH: -1,
  NUMERIC_RANGE: 2,
  NUMERIC_FULL_RANGE: 2,
  NUMERIC_LESS_THAN: 1,
  NUMERIC_MORE_THAN: 1,
  NUMERIC_MAX: 1,
  NUMERIC_MIN: 1,
  IS_EMPTY: 0,
  IS_NULL: 0,
  IS_TRUE: 0,
  IS_FALSE: 0
};
export const numericRules = [
  'NUMERIC_MATCH',
  'NUMERIC_LESS_THAN',
  'NUMERIC_MAX',
  'NUMERIC_MORE_THAN',
  'NUMERIC_MIN',
  'NUMERIC_RANGE'
];
export const booleanRules = ['IS_TRUE', 'IS_FALSE'];

export const DeriveConcatDelimiter = '_';

export const CodingSchemeVersionMajor = 3;
export const CodingSchemeVersionMinor = 3;

export class CodingScheme {
  variableCodings: VariableCodingData[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(givenScheme: any) {
    const transformedScheme =
            typeof givenScheme === 'string' ?
              JSON.parse(givenScheme) :
              givenScheme;
    let codingSchemeMajorVersion = 0;
    // let codingSchemeMinorVersion = 0;
    if (!Array.isArray(transformedScheme) && transformedScheme.version) {
      const versionMatches = /^(\d+)\.(\d+)$/.exec(
        transformedScheme.version
      );
      if (versionMatches && versionMatches.length > 2) {
        codingSchemeMajorVersion = Number.parseInt(
          versionMatches[1],
          10
        );
        // codingSchemeMinorVersion = Number.parseInt(versionMatches[2], 10);
      }
    }
    const givenCodings = Array.isArray(transformedScheme) ?
      transformedScheme :
      transformedScheme.variableCodings || [];
    givenCodings.forEach((c: any) => {
      this.variableCodings.forEach(vc => {
        vc.codes?.forEach(code => {
          if (code.id === null) code.id = 'INVALID';
        });
      });
      if (codingSchemeMajorVersion < 3) {
        this.variableCodings.push(
          CodingScheme.getCodeVersionLessThan3(c)
        );
      } else {
        this.variableCodings.push(c);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static getCodeVersionLessThan3(
    givenCoding: any
  ): VariableCodingData {
    const codes: CodeData[] = [];
    let valueProcessing: string[] =
            givenCoding.processing ||
            givenCoding.preProcessing ||
            givenCoding.valueTransformations ||
            [];
    if (
      valueProcessing &&
            valueProcessing.includes('REMOVE_WHITE_SPACES')
    ) {
      valueProcessing = valueProcessing.filter(
        vp => vp !== 'REMOVE_WHITE_SPACES'
      );
      valueProcessing.push('IGNORE_ALL_SPACES');
    }
    const newCoding: VariableCodingData = {
      id: givenCoding.id,
      alias: givenCoding.alias || givenCoding.id,
      label: givenCoding.label || '',
      sourceType: 'BASE',
      sourceParameters: {
        solverExpression: givenCoding.sourceParameters ?
          givenCoding.sourceParameters.solverExpression || '' :
          '',
        processing: givenCoding.sourceParameters ?
          givenCoding.sourceParameters.processing || [] :
          []
      },
      deriveSources: givenCoding.deriveSources || [],
      processing: valueProcessing as ProcessingParameterType[],
      fragmenting: givenCoding.fragmenting || '',
      manualInstruction: givenCoding.manualInstruction || '',
      codeModel: givenCoding.codeModel || 'MANUAL_AND_RULES',
      page: givenCoding.page || '0',
      codes
    };
    if (givenCoding.sourceType === 'DERIVE_CONCAT') {
      if (givenCoding.deriveSourceType === 'VALUE') {
        newCoding.sourceType = 'COPY_VALUE';
      } else {
        newCoding.sourceType = 'CONCAT_CODE';
      }
    } else if (givenCoding.sourceType === 'DERIVE_SUM') {
      if (givenCoding.deriveSourceType === 'VALUE') {
        newCoding.sourceType = 'COPY_VALUE';
      } else if (givenCoding.deriveSourceType === 'CODE') {
        newCoding.sourceType = 'SUM_CODE';
      } else {
        newCoding.sourceType = 'SUM_SCORE';
      }
    } else if (givenCoding.sourceType === 'COPY_FIRST_VALUE') {
      newCoding.sourceType = 'COPY_VALUE';
    } else {
      newCoding.sourceType = givenCoding.sourceType;
    }
    if (givenCoding.codeModel && givenCoding.codeModel !== 'NONE') {
      newCoding.codeModel =
                givenCoding.codeModel === 'MANUAL' ?
                  'MANUAL_ONLY' :
                  'MANUAL_AND_RULES';
    }
    if (givenCoding.codes && Array.isArray(givenCoding.codes)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      givenCoding.codes.forEach((code: any) => {
        if (code.ruleSets) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const elseRule = code.ruleSets.find(
            (rs: any) => !!rs.rules.find((r: any) => r.method === 'ELSE')
          );
          if (elseRule) {
            codes.push(<CodeData>{
              id: code.id,
              type: 'RESIDUAL_AUTO',
              label: code.label,
              score: 0,
              ruleSetOperatorAnd: false,
              ruleSets: [],
              manualInstruction: code.manualInstruction
            });
          } else {
            if (!code.type) code.type = 'UNSET';
            codes.push(code);
          }
        } else if (code.rules && Array.isArray(code.rules)) {
          codes.push(<CodeData>{
            id: code.id,
            type: 'UNSET',
            label: code.label || '',
            score: code.score || 0,
            ruleSetOperatorAnd: false,
            ruleSets: [
                            <RuleSet>{
                              ruleOperatorAnd: code.ruleOperatorAnd || false,
                              rules: code.rules
                            }
            ],
            manualInstruction: code.manualInstruction || ''
          });
        }
      });
    }
    return newCoding;
  }

  static checkVersion(
    givenScheme: any
  ): 'OK' | 'MAJOR_LESS' | 'MAJOR_GREATER' | 'MINOR_GREATER' {
    const transformedScheme =
            typeof givenScheme === 'string' ?
              JSON.parse(givenScheme) :
              givenScheme;
    let localCodingSchemeVersionMajor = 0;
    let localCodingSchemeVersionMinor = 0;
    if (!Array.isArray(transformedScheme) && transformedScheme.version) {
      const versionMatches = /^(\d+)\.(\d+)$/.exec(
        transformedScheme.version
      );
      if (versionMatches && versionMatches.length > 2) {
        localCodingSchemeVersionMajor = Number.parseInt(
          versionMatches[1],
          10
        );
        localCodingSchemeVersionMinor = Number.parseInt(
          versionMatches[2],
          10
        );
      }
    }
    if (CodingSchemeVersionMajor < localCodingSchemeVersionMajor) return 'MAJOR_GREATER';
    if (CodingSchemeVersionMajor > localCodingSchemeVersionMajor) return 'MAJOR_LESS';
    if (CodingSchemeVersionMinor < localCodingSchemeVersionMinor) return 'MINOR_GREATER';
    return 'OK';
  }

  toString(): string {
    return JSON.stringify({
      version: `${CodingSchemeVersionMajor}.${CodingSchemeVersionMinor}`,
      variableCodings: this.variableCodings
    });
  }
}
