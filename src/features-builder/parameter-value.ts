import { LanguageCode } from "../languages";
import { Translations } from "./translations";

export class ParameterValue {
	public identifier: string;
	public translations: Translations = {};

	constructor (identifier: string, translations: Translations) {
		this.identifier = identifier;
		this.translations = translations || {};
	}

	public addTranslation (name: string, description: string, languageCodes: LanguageCode[]): ParameterValue {
		for (const languageCode of languageCodes)
			this.translations[languageCode] = { name, description };

		return this;
	}
}
