import * as path from 'path';
import { test, Test } from 'tap';
import { getCommand } from '../../lib';
import * as os from 'os';

test("should return 'mvn' when no mvnw present in path", async (t) => {
  const cmd = getCommand(
    '.',
    path.join(__dirname, '..', 'fixtures/path with spaces', 'pom.xml'),
  );

  t.equals(cmd, 'mvn', 'should return mvn');
});

test("should return 'mvnw' when 'mvnw' present in path", async (t) => {
  const cmd = getCommand(
    '.',
    path.join(__dirname, '..', 'fixtures/maven-with-mvnw', 'pom.xml'),
  );

  const isWinLocal = /^win/.test(os.platform());

  if (isWinLocal) {
    const expectedCommand =
      '"' +
      path.join(__dirname, '..', 'fixtures/maven-with-mvnw', 'mvnw.cmd') +
      '"';
    t.equals(cmd, expectedCommand, 'should return mvnw.cmd');
  } else {
    const expectedCommand =
      "'" +
      path.join(__dirname, '..', 'fixtures/maven-with-mvnw', 'mvnw') +
      "'";
    t.equals(cmd, expectedCommand, 'should return mvnw');
  }
});
