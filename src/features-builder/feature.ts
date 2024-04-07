import { LanguageCode } from "../languages";
import { Parameter } from "./parameter";

export type FeatureTranslation = Partial<
	Record<
		LanguageCode, { name: string; description: string; }
	>
>;

export class Feature {
	public identifier: string;
	public defaultLanguage: LanguageCode;
	public parameters: Parameter[] = [];
	public translations: FeatureTranslation = {};

	constructor (identifier: string, defaultLanguage: LanguageCode, parameters: Parameter[] = [], translations: FeatureTranslation = {}) {
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
