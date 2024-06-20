import { LanguageCode } from "../languages";
import { Parameter } from "./parameter";
import { Translations } from "./translations";

export class Feature {
	constructor (
		public identifier: string,
		public defaultLanguage: LanguageCode,
		public parameters: Parameter[] = [],
		public translations: Translations = {}
	) { }

	public addTranslation (name: string, description: string | null, languageCodes: LanguageCode[]): Feature {
		for (const languageCode of languageCodes)
			this.translations[languageCode] = { name, description };

		return this;
	}

	public addParameter (...parameter: Parameter[]): Feature {
		this.parameters = this.parameters.concat(parameter);
		return this;
	}
}
