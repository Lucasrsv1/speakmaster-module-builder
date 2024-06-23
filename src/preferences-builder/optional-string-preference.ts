import { LanguageCode } from "../languages";
import { Translations } from "../translatable";
import { Preference, PreferenceType } from "./preference";

export interface IOptionalStringPreference {
	identifier: string;
	defaultLanguage?: LanguageCode;
	defaultValue?: string | null;
	dynamicDisable?: boolean;
	dynamicValue?: boolean;
	maxLength?: number;
	minLength?: number;
	translations?: Translations;
}

export class OptionalStringPreference extends Preference<string | null> {
	public readonly type = PreferenceType.STRING;

	constructor (
		identifier: string,
		defaultValue: string | null = null,
		public minLength: number | null = null,
		public maxLength: number | null = null,
		defaultLanguage: LanguageCode = LanguageCode.EN_US,
		translations: Translations = {}
	) {
		super(identifier, defaultValue, defaultLanguage, translations, true);
	}

	public static create (preference: IOptionalStringPreference): OptionalStringPreference {
		return new OptionalStringPreference(
			preference.identifier,
			preference.defaultValue || null,
			preference.minLength || null,
			preference.maxLength || null,
			preference.defaultLanguage || LanguageCode.EN_US,
			preference.translations || {}
		)
			.useDynamicDisable(preference.dynamicDisable || false)
			.useDynamicValue(preference.dynamicValue || false);
	}
}
