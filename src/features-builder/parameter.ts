import { LanguageCode } from "../languages";
import { ParameterValue } from "./parameter-value";

export type ParameterTranslation = Partial<
	Record<
		LanguageCode, { name: string; description: string; }
	>
>;

export class Parameter {
	public identifier: string;
	public allowedValues: ParameterValue[] = [];
	public translations: ParameterTranslation = {};

	constructor (identifier: string, allowedValues: ParameterValue[] = [], translations: ParameterTranslation = {}) {
		this.identifier = identifier;
		this.allowedValues = allowedValues || [];
		this.translations = translations || {};
	}

	public addTranslation (name: string, description: string, languageCodes: LanguageCode[]): Parameter {
		for (const languageCode of languageCodes)
			this.translations[languageCode] = { name, description };

		return this;
	}

	public addAllowedValue (...allowedValue: ParameterValue[]): Parameter {
		this.allowedValues = this.allowedValues.concat(allowedValue);
		return this;
	}
}
