const CPF_VALID_LENGTH = 11;
const FACTOR_FIRST_DIGIT = 10;
const FACTOR_SECOND_DIGIT = 11;
const MAX_DIGITS_FIRST = 9;
const MAX_DIGITS_SECOND = 10;

export class Cpf {
	private cpfValue: string;

	constructor(cpf: string) {
		const cpfDigits = this.extractDigits(cpf);
		if (this.isInvalidLength(cpfDigits))
			throw new Error('Invalid CPF length');
		if (this.isBlocked(cpfDigits)) throw new Error('Invalid CPF digits');
		const firstDigit = this.calculateDigit(
			cpfDigits,
			FACTOR_FIRST_DIGIT,
			MAX_DIGITS_FIRST,
		);
		const secondDigit = this.calculateDigit(
			cpfDigits,
			FACTOR_SECOND_DIGIT,
			MAX_DIGITS_SECOND,
		);
		if (!this.isCheckDigitValid(cpfDigits, firstDigit, secondDigit))
			throw new Error('Invalid check digits');
		this.cpfValue = cpf;
	}

	getCpf() {
		return this.cpfValue;
	}

	private extractDigits(cpf: string) {
		return cpf.replace(/\D/g, '');
	}

	private isInvalidLength(cpf: string) {
		return cpf.length !== CPF_VALID_LENGTH;
	}

	private isBlocked(cpf: string) {
		const [digit1] = cpf;
		return cpf.split('').every((digit) => digit === digit1);
	}

	private calculateDigit(cpf: string, factor: number, max: number) {
		let total = 0;
		const digitArray = [...cpf].map((digit) => parseInt(digit));
		for (const digit of digitArray.slice(0, max)) {
			total += digit * factor--;
		}
		return total % 11 < 2 ? 0 : 11 - (total % 11);
	}

	private isCheckDigitValid(
		cpf: string,
		firstDigit: number,
		secondDigit: number,
	) {
		return cpf.slice(9) === `${firstDigit}${secondDigit}`;
	}
}
