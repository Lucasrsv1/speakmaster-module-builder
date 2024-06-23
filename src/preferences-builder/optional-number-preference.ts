import { LanguageCode } from "../languages";
import { Translations } from "../translatable";
import { Preference, PreferenceType } from "./preference";

export interface IOptionalNumberPreference {
	identifier: string;
	type: PreferenceType.INTEGER | PreferenceType.FLOAT;
	defaultLanguage?: LanguageCode;
	defaultValue?: number | null;
	dynamicDisable?: boolean;
	dynamicValue?: boolean;
	max?: number;
	min?: number;
	translations?: Translations;
}

export class OptionalNumberPreference extends Preference<number | null> {
	constructor (
		identifier: string,
		public readonly type: PreferenceType.INTEGER | PreferenceType.FLOAT,
		defaultValue: number | null = null,
		public min: number | null = null,
		public max: number | null = null,
		defaultLanguage: LanguageCode = LanguageCode.EN_US,
		translations: Translations = {}
	) {
		super(identifier, defaultValue, defaultLanguage, translations, true);
	}

	public static create (preference: IOptionalNumberPreference): OptionalNumberPreference {
		return new OptionalNumberPreference(
			preference.identifier,
			preference.type,
			preference.defaultValue || null,
			preference.min || null,
			preference.max || null,
			preference.defaultLanguage || LanguageCode.EN_US,
			preference.translations || {}
		)
			.useDynamicDisable(preference.dynamicDisable || false)
			.useDynamicValue(preference.dynamicValue || false);
	}
}
