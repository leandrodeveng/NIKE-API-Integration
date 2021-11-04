export class Cpf {
    private value: string;

    constructor(cpf: string) {
        this.value = cpf
    }

    getCpf() {
        return this.value;
    }
}
