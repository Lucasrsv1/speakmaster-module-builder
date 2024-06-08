import { LanguageCode } from "../languages";
import { Parameter } from "./parameter";
import { Translations } from "./translations";

export class Feature {
	public identifier: string;
	public defaultLanguage: LanguageCode;
	public parameters: Parameter[] = [];
	public translations: Translations = {};

	constructor (identifier: string, defaultLanguage: LanguageCode, parameters: Parameter[] = [], translations: Translations = {}) {
		this.identifier = identifier;
		this.defaultLanguage = defaultLanguage;
		this.parameters = parameters || [];
		this.translations = translations || {};
	}

	public addTranslation (name: string, description: string, languageCodes: LanguageCode[]): Feature {
		for (const languageCode of languageCodes)
			this.translations[languageCode] = { name, description };

		return this;
	}

	public addParameter (...parameter: Parameter[]): Feature {
		this.parameters = this.parameters.concat(parameter);
		return this;
	}
}
