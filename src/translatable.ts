import { LanguageCode } from "./languages";

export type Translations = Partial<
	Record<
		LanguageCode, { name: string; description?: string; }
	>
>;

export class Translatable {
	constructor (public translations: Translations = {}) {}

	public addTranslation (name: string, languageCodes: LanguageCode[]): this;
	public addTranslation (name: string, description: string, languageCodes: LanguageCode[]): this;
	public addTranslation (name: string, descriptionOrLanguageCodes: string | LanguageCode[], languageCodes?: LanguageCode[]): this {
		let description: string | undefined;
		if (typeof descriptionOrLanguageCodes === "string")
			description = descriptionOrLanguageCodes;
		else
			languageCodes = descriptionOrLanguageCodes as LanguageCode[];

		for (const languageCode of languageCodes!)
			this.translations[languageCode] = { name, description };

		return this;
	}
}
