import { LanguageCode } from "../languages";
import { Translations } from "../translatable";
import { Preference, PreferenceType } from "./preference";

export interface IStringPreference {
	defaultValue: string;
	identifier: string;
	defaultLanguage?: LanguageCode;
	dynamicDisable?: boolean;
	dynamicValue?: boolean;
	maxLength?: number;
	minLength?: number;
	translations?: Translations;
}

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

	public static create (preference: IStringPreference): StringPreference {
		return new StringPreference(
			preference.identifier,
			preference.defaultValue,
			preference.minLength || null,
			preference.maxLength || null,
			preference.defaultLanguage || LanguageCode.EN_US,
			preference.translations || {}
		)
			.useDynamicDisable(preference.dynamicDisable || false)
			.useDynamicValue(preference.dynamicValue || false);
	}
}
