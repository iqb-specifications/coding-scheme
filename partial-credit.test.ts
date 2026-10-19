import Ajv from 'ajv';
import fs from 'fs';
import { CodingScheme, CodingSchemeVersionMinor } from './coding-scheme';
import type { CodingSchemeData } from './coding-scheme.interface';

const schema = JSON.parse(fs.readFileSync(`${__dirname}/coding-scheme.schema.json`, 'utf8'));
const validate = new Ajv().compile(schema);
const data: CodingSchemeData = JSON.parse(
  fs.readFileSync(`${__dirname}/test/test_valid/partial-credit-options.json`, 'utf8')
);

describe('partial-credit derivation options', () => {
  test('schema accepts both options and a regular text rule for 0_x', () => {
    expect(validate(data)).toBe(true);
    expect(CodingSchemeVersionMinor).toBe(5);
    expect(schema.$id).toBe('coding-scheme@iqb-standard@3.5');
  });

  test('reading, copying and exporting preserve opt-in parameters', () => {
    const copy = new CodingScheme(new CodingScheme(data).toString());
    const exported = JSON.parse(copy.toString());
    expect(exported.version).toBe('3.5');
    expect(exported.variableCodings[0].sourceParameters.processing)
      .toEqual(data.variableCodings[0].sourceParameters?.processing);
  });

  test('existing schemes keep the options disabled', () => {
    const scheme = new CodingScheme({ version: '3.4', variableCodings: [{ id: 'a', sourceType: 'BASE' }] });
    expect(scheme.variableCodings[0].sourceParameters?.processing || []).toEqual([]);
  });

  test('x remains a derived text value and is not accepted as a code ID', () => {
    const invalid = JSON.parse(JSON.stringify(data));
    invalid.variableCodings[0].codes[0].id = 'x';
    expect(validate(invalid)).toBe(false);
  });
});
