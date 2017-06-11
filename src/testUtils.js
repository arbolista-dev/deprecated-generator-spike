import fs from 'fs';
// eslint-disable-next-line
import assert from 'yeoman-assert';

// eslint-disable-next-line import/prefer-default-export
export async function assertFixtureMatch(path, fixturePath) {
  const content = await new Promise((fnResolve, fnReject) => {
    fs.readFile(fixturePath, 'utf8', (err, data) => {
      if (err) return fnReject(err);
      return fnResolve(data);
    });
  });
  assert.fileContent(path, content.trim());
}
