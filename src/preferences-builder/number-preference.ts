import { LanguageCode } from "../languages";
import { Translations } from "../translatable";
import { Preference, PreferenceType } from "./preference";

export interface INumberPreference {
	defaultValue: number;
	identifier: string;
	type: PreferenceType.INTEGER | PreferenceType.FLOAT;
	defaultLanguage?: LanguageCode;
	dynamicDisable?: boolean;
	dynamicValue?: boolean;
	max?: number;
	min?: number;
	translations?: Translations;
}

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

	public static create (preference: INumberPreference): NumberPreference {
		return new NumberPreference(
			preference.identifier,
			preference.type,
			preference.defaultValue,
			preference.min || null,
			preference.max || null,
			preference.defaultLanguage || LanguageCode.EN_US,
			preference.translations || {}
		)
			.useDynamicDisable(preference.dynamicDisable || false)
			.useDynamicValue(preference.dynamicValue || false);
	}
}
