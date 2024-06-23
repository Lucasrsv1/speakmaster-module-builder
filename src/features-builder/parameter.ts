import { ParameterValue } from "./parameter-value";
import { Translatable, Translations } from "../translatable";

export class Parameter extends Translatable {
	constructor (
		public identifier: string,
		public optional: boolean = false,
		public autoSort: boolean = false,
		public allowedValues: ParameterValue[] = [],
		translations: Translations = {}
	) {
		super(translations);
	}

	public addAllowedValue (...allowedValue: ParameterValue[]): Parameter {
		this.allowedValues = this.allowedValues.concat(allowedValue);
		return this;
	}
}
