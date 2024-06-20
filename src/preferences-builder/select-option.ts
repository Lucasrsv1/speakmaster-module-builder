import { LanguageCode } from "../languages";
import { PreferenceValue } from "./preference";
import { Translations } from "../features-builder";

export class SelectOption<T extends PreferenceValue> {
	constructor (
		public value: T,
		public translations: Translations = {}
	) { }

	public addTranslation (name: string, description: string | null, languageCodes: LanguageCode[]): this {
		for (const languageCode of languageCodes)
			this.translations[languageCode] = { name, description };

		return this;
	}
}
