const assert = require('assert');
const loadenv = require(`${process.cwd()}/lib/loadenv_`);

loadenv.init(`${__dirname}/test.env`);

// Generate an AssertionError to compare the error message later:
const { message } = new assert.AssertionError({
  actual: 1,
  expected: 2,
  operator: 'strictEqual'
});

let failingTests = 0;

try {
  assert.strictEqual(process.env.TOKEN, '9ujh63g61sban');
  console.log('passed 🔵');
} catch (err) {
  failingTests += 1;

  console.log(`${failingTests} test(s) are failing!\n`);
  console.log(`   Expected ${err.message} 🔴`);
  console.log(`     Expected -> ${err.expected}\n     Actual   -> ${err.actual}`);
}