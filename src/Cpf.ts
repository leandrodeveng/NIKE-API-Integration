const CPF_WITHOUT_DIGIT_LENGTH = 11;

export class Cpf {
    private cpfValue: string;

    constructor(cpf: string) {
        const cpfDigits = this.extractDigits(cpf);
        if(this.isInvalidLength(cpfDigits)) throw new Error('Invalid CPF length');
        this.cpfValue = cpf
    }

    getCpf() {
        return this.cpfValue;
    }

    private extractDigits(cpf: string) {
        return cpf.replace(/\D/g, "");
    }

    private isInvalidLength(cpf: string) {
        return cpf.length !== CPF_WITHOUT_DIGIT_LENGTH;
    }
}
