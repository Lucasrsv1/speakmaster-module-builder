import { LanguageCode } from "../languages";

export type ParameterValueTranslation = Partial<
	Record<
		LanguageCode, { name: string; label: string; }
	>
>;

export class ParameterValue {
	public identifier: string;
	public translations: ParameterValueTranslation = {};

	constructor (identifier: string, translations: ParameterValueTranslation) {
		this.identifier = identifier;
		this.translations = translations || {};
	}

	public addTranslation (name: string, label: string, languageCodes: LanguageCode[]): ParameterValue {
		for (const languageCode of languageCodes)
			this.translations[languageCode] = { name, label };

		return this;
	}
}
