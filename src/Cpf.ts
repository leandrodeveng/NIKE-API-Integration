const CPF_VALID_LENGTH = 11;
const FACTOR_FIRST_DIGIT = 10;
const FACTOR_SECOND_DIGIT = 11;
const MAX_DIGITS_FIRST = 9;
const MAX_DIGITS_SECOND = 10;

export class Cpf {
    private cpfValue: string;

    constructor(cpf: string) {
        const cpfDigits = this.extractDigits(cpf);
        if(this.isInvalidLength(cpfDigits)) throw new Error('Invalid CPF length');
        const firstDigit = this.calculateDigit(cpf, FACTOR_FIRST_DIGIT, MAX_DIGITS_FIRST);
        const secondDigit = this.calculateDigit(cpf, FACTOR_SECOND_DIGIT, MAX_DIGITS_SECOND);
        this.cpfValue = cpf
    }

    getCpf() {
        return this.cpfValue;
    }

    private extractDigits(cpf: string) {
        return cpf.replace(/\D/g, "");
    }

    private isInvalidLength(cpf: string) {
        return cpf.length !== CPF_VALID_LENGTH;
    }

    private calculateDigit(cpf: string, factor: number, max: number) {
        let total = 0;
        const digitArray = [...cpf].map(digit => parseInt(digit))
        for(const digit of digitArray.slice(0, max)) {
            total += digit * factor--;
        }
        return (total % 11 < 2) ? 0 : (11 - total % 11);
    }
}
