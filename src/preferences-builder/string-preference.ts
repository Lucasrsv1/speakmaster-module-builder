import { LanguageCode } from "../languages";
import { Translations } from "../features-builder";
import { Preference, PreferenceType } from "./preference";

export class StringPreference extends Preference<string> {
	public readonly type = PreferenceType.STRING;

	constructor (
		identifier: string,
		defaultValue: string,
		public minLength: number | null = null,
		public maxLength: number | null = null,
		defaultLanguage: LanguageCode = LanguageCode.EN_US,
		translations: Translations = {}
	) {
		super(identifier, defaultValue, defaultLanguage, translations);
	}
}
