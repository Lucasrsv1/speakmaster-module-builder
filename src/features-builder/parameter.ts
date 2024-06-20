import { LanguageCode } from "../languages";
import { ParameterValue } from "./parameter-value";
import { Translations } from "./translations";

export class Parameter {
	constructor (
		public identifier: string,
		public optional: boolean = false,
		public autoSort: boolean = false,
		public allowedValues: ParameterValue[] = [],
		public translations: Translations = {}
	) { }

	public addTranslation (name: string, description: string | null, languageCodes: LanguageCode[]): Parameter {
		for (const languageCode of languageCodes)
			this.translations[languageCode] = { name, description };

		return this;
	}

	public addAllowedValue (...allowedValue: ParameterValue[]): Parameter {
		this.allowedValues = this.allowedValues.concat(allowedValue);
		return this;
	}
}
