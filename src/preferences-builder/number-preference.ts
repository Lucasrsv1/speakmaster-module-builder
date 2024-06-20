import { LanguageCode } from "../languages";
import { Translations } from "../features-builder";
import { Preference, PreferenceType } from "./preference";

export class NumberPreference extends Preference<number> {
	constructor (
		identifier: string,
		public readonly type: PreferenceType.INTEGER | PreferenceType.FLOAT,
		defaultValue: number,
		public min: number | null = null,
		public max: number | null = null,
		defaultLanguage: LanguageCode = LanguageCode.EN_US,
		translations: Translations = {}
	) {
		super(identifier, defaultValue, defaultLanguage, translations);
	}
}
