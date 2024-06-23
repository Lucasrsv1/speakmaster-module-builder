import { LanguageCode } from "../languages";
import { Translations } from "../translatable";
import { Preference, PreferenceType } from "./preference";

export interface IBooleanPreference {
	defaultValue: boolean;
	identifier: string;
	defaultLanguage?: LanguageCode;
	dynamicDisable?: boolean;
	dynamicValue?: boolean;
	translations?: Translations;
}

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

	public static create (preference: IBooleanPreference): BooleanPreference {
		return new BooleanPreference(
			preference.identifier,
			preference.defaultValue,
			preference.defaultLanguage || LanguageCode.EN_US,
			preference.translations || {}
		)
			.useDynamicDisable(preference.dynamicDisable || false)
			.useDynamicValue(preference.dynamicValue || false);
	}
}
