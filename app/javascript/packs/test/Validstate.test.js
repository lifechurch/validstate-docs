const Validstate = require('../validstate/validstate');
const validstate = new Validstate();

test('checks if value is required', () => {
  expect(validstate.required('')).toBe(false);
  expect(validstate.required('   ')).toBe(false);
  expect(validstate.required(null)).toBe(false);
  expect(validstate.required(undefined)).toBe(false);
  expect(validstate.required([])).toBe(false);
  expect(validstate.required({})).toBe(false);
  expect(validstate.required(NaN)).toBe(false);
  expect(validstate.required('I am required')).toBe(true);
});

test('checks if value has minLength', () => {
  const string = 'test';
  const array = [1,2,3,4];
  const object = {1: '1', 2: '2'};
  expect(validstate.minLength(string, 3)).toBe(true);
  expect(validstate.minLength(array, 5)).toBe(false);
  expect(validstate.minLength(object, 3)).toBe(false);
});

test('checks if value has maxLength', () => {
  const string = 'test';
  const array = [1,2,3,4];
  const object = {1: '1', 2: '2'};
  expect(validstate.maxLength(string, 3)).toBe(false);
  expect(validstate.maxLength(array, 5)).toBe(true);
  expect(validstate.maxLength(object, 3)).toBe(true);
});

test('checks if value length is between given range length', () => {
  expect(validstate.rangeLength('5', '0-6')).toBe(true);
  expect(validstate.rangeLength('State', '0-6')).toBe(true);
  expect(validstate.rangeLength(['City', 'State', 'Zip'], '0-3')).toBe(true);
  expect(validstate.rangeLength([], '0-3')).toBe(true);
  expect(validstate.rangeLength('email address', '0-6')).toBe(false);
  expect(validstate.rangeLength(5, '6-10')).toBe(false);
});

test('checks if value is greater than min parameter', () => {
  expect(validstate.min(4, 3)).toBe(true);
  expect(validstate.min(100, 5)).toBe(true);
  expect(validstate.min(100, '5')).toBe(true);
  expect(validstate.min(5000, 5000)).toBe(true);
  expect(validstate.min('5000', 4000)).toBe(true);
  expect(validstate.min(5000, 5500)).toBe(false);
  expect(validstate.min(5000, '5500')).toBe(false);
});

test('checks if value is less than max parameter', () => {
  expect(validstate.max(100, 500)).toBe(true);
  expect(validstate.max(100, 100)).toBe(true);
  expect(validstate.max('500', 3000)).toBe(true);
  expect(validstate.max(400, 300)).toBe(false);
  expect(validstate.max(301, 300)).toBe(false);
  expect(validstate.min('5000', 5500)).toBe(false);
});

test('checks if value is between given range', () => {
  expect(validstate.range('5', '0-6')).toBe(true);
  expect(validstate.range(5, '0-6')).toBe(true);
  expect(validstate.range(0, '0-3')).toBe(true);
  expect(validstate.range(3, '0-3')).toBe(true);
  expect(validstate.range(7, '0-6')).toBe(false);
  expect(validstate.range('5', '6-10')).toBe(false);
});

test('checks if value is in a given step', () => {
  expect(validstate.step('20', '5')).toBe(true);
  expect(validstate.step(15, '3')).toBe(true);
  expect(validstate.step('1000', 10)).toBe(true);
  expect(validstate.step(5, '3')).toBe(false);
  expect(validstate.step(70, '50')).toBe(false);
  expect(validstate.step('50', '100')).toBe(false);
});

test('checks if value is a valid email address', () => {
  expect(validstate.email('test@example.com')).toBe(true);
  expect(validstate.email('test@example.co.uk')).toBe(true);
  expect(validstate.email('test.user@example12.io')).toBe(true);
  expect(validstate.email('test.user.example.com')).toBe(false);
});

test('checks if value is a number', () => {
  expect(validstate.number(1.0)).toBe(true);
  expect(validstate.number(0)).toBe(true);
  expect(validstate.number(-1)).toBe(true);
  expect(validstate.number(-1.0)).toBe(true);
  expect(validstate.number('-1.0')).toBe(false);
  expect(validstate.number([-1.0])).toBe(false);
  expect(validstate.number({1: 'one'})).toBe(false);
});

test('checks if value is numeric', () => {
  expect(validstate.numeric(1.0)).toBe(true);
  expect(validstate.numeric(0)).toBe(true);
  expect(validstate.numeric(-1)).toBe(true);
  expect(validstate.numeric(-1.0)).toBe(true);
  expect(validstate.numeric('-1.0')).toBe(true);
  expect(validstate.numeric('1.0e65')).toBe(true);
  expect(validstate.numeric(1.0e65)).toBe(true);
  expect(validstate.numeric('1.0e65baba')).toBe(false);
  expect(validstate.numeric([-1.0])).toBe(false);
  expect(validstate.numeric({1: 'one'})).toBe(false);
});

test('checks if value is an integer', () => {
  expect(validstate.integer(10)).toBe(true);
  expect(validstate.integer(1.0)).toBe(true);
  expect(validstate.integer(0)).toBe(true);
  expect(validstate.integer(-1)).toBe(true);
  expect(validstate.integer(-0)).toBe(true);
  expect(validstate.integer('1.0e65')).toBe(false);
  expect(validstate.integer('abcdef')).toBe(false);
  expect(validstate.integer(-1.2)).toBe(false);
});

test('checks if value is a digit', () => {
  expect(validstate.digits(10)).toBe(true);
  expect(validstate.digits(0)).toBe(true);
  expect(validstate.digits(1.0)).toBe(true);
  expect(validstate.digits(1.01)).toBe(false);
  expect(validstate.digits('abcdef')).toBe(false);
});

test('soft comparison of one value to another', () => {
  expect(validstate.equalTo(10, '10')).toBe(true);
  expect(validstate.equalTo('1', true)).toBe(true);
  expect(validstate.equalTo(1, 5)).toBe(false);
  expect(validstate.equalTo('abcdef', false)).toBe(false);
});

test('strong comparison of one value to another', () => {
  expect(validstate.isEqualTo(10, 10)).toBe(true);
  expect(validstate.isEqualTo(true, true)).toBe(true);
  expect(validstate.isEqualTo(1, '1')).toBe(false);
  expect(validstate.isEqualTo('true', true)).toBe(false);
});
