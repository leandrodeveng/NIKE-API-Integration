import { Cpf } from './Cpf';

beforeEach(() => {});

test('Should return the CPF value', () => {
  const validCpf = '464.972.498-85';
  const cpf = new Cpf(validCpf);
  expect(cpf.getCpf()).toBe('464.972.498-85');
});

test('Should return wrong cpf length exception', () => {
  const invalidCpf = '4644.972.498-85';
  expect(() => new Cpf(invalidCpf)).toThrow(new Error('Invalid CPF length'));
});

test('Should return wrong digits exception', () => {
  const invalidCpf = '123.972.498-85';
  expect(() => new Cpf(invalidCpf)).toThrow(new Error('Invalid check digits'));
});

test('Should return invalid digits exception', () => {
  const invalidCpf = '111.111.111-11';
  expect(() => new Cpf(invalidCpf)).toThrow(new Error('Invalid CPF digits'));
});
