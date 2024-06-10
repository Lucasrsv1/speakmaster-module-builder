import { LanguageCode } from "../languages";
import { Translations } from "./translations";

export class ParameterValue {
	constructor (
		public identifier: string,
		public translations: Translations = {}
	) { }

	public addTranslation (name: string, description: string, languageCodes: LanguageCode[]): ParameterValue {
		for (const languageCode of languageCodes)
			this.translations[languageCode] = { name, description };

		return this;
	}
}
