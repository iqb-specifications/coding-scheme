/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
// options can be passed, e.g. {allErrors: true}
import Ajv, { ValidateFunction } from 'ajv';
import fs from 'fs';
import { log, error } from "console";

const ajv = new Ajv();
const schemaFilename = process.argv[3];
const testDataFolder = process.argv[4];

describe(testDataFolder, () => {
  const schemaFileContent = fs.readFileSync(schemaFilename, 'utf8');
  let compiledSchema: ValidateFunction<unknown> | null = ajv.compile(JSON.parse(schemaFileContent));
  test('schema valid as json file', () => {
    expect(compiledSchema).not.toBeNull();
  });
  describe('valid cases', () => {
    const validFolder = `${__dirname}/${testDataFolder}/test_valid`;
    if (compiledSchema && fs.existsSync(validFolder)) {
      fs.readdirSync(validFolder).forEach((file: string) => {
        const data = fs.readFileSync(`${validFolder}/${file}`, 'utf8');
        const valid = compiledSchema ? compiledSchema(JSON.parse(data)) : null;
        test(file, () => {
          expect(valid).toBeTruthy();
        });
      })
    }
  })
  describe('invalid cases', () => {
    const invalidFolder = `${__dirname}/${testDataFolder}/test_invalid`;
    if (compiledSchema && fs.existsSync(invalidFolder)) {
      fs.readdirSync(invalidFolder).forEach((file: string) => {
        const data = fs.readFileSync(`${invalidFolder}/${file}`, 'utf8');
        const valid = compiledSchema ? compiledSchema(JSON.parse(data)) : null;
        test(file, () => {
          expect(valid).not.toBeTruthy();
        });
      })
    }
  })
});
