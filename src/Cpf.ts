export class Cpf {
    private value: string;

    constructor(cpf: string) {
        const cpfDigits = this.extractDigits(cpf);
        this.value = cpf
    }

    getCpf() {
        return this.value;
    }

    private extractDigits(cpf: string) {
        return cpf.replace(/\D/g, "");
    }
}
