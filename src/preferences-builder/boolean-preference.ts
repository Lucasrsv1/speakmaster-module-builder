import { LanguageCode } from "../languages";
import { Translations } from "../features-builder";
import { Preference, PreferenceType } from "./preference";

export class BooleanPreference extends Preference<boolean> {
	public readonly type = PreferenceType.BOOLEAN;

	constructor (
		identifier: string,
		defaultValue: boolean,
		defaultLanguage: LanguageCode = LanguageCode.EN_US,
		translations: Translations = {}
	) {
		super(identifier, defaultValue, defaultLanguage, translations);
	}
}
