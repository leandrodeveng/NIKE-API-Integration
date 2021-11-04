import { Cpf } from "./Cpf";

beforeEach(() => {

});

test('Should return the CPF value', () => {
    const validCpf = '464.972.498-85'
    const cpf = new Cpf(validCpf);
    expect(cpf.getCpf()).toBe("464.972.498-85");
});
