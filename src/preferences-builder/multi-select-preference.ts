import { LanguageCode } from "../languages";
import { SelectOption } from "./select-option";
import { Translations } from "../translatable";
import { Preference, PreferenceType, PreferenceValue } from "./preference";

export interface IMultiSelectPreference<T extends PreferenceValue> {
	identifier: string;
	defaultLanguage?: LanguageCode;
	defaultValue?: T[];
	dynamicDisable?: boolean;
	dynamicOptions?: boolean;
	dynamicValue?: boolean;
	options?: Array<SelectOption<T> | T>;
	translations?: Translations;
}

export class MultiSelectPreference<T extends PreferenceValue> extends Preference<T[]> {
	public readonly type = PreferenceType.MULTI_SELECT;

	public dynamicOptions: boolean = false;
	public options: SelectOption<T>[];

	constructor (
		identifier: string,
		defaultValue: T[] = [],
		options: Array<SelectOption<T> | T> = [],
		defaultLanguage: LanguageCode = LanguageCode.EN_US,
		translations: Translations = {}
	) {
		super(identifier, defaultValue, defaultLanguage, translations);

		if (!options.length)
			this.options = [];
		else if (options[0] instanceof SelectOption)
			this.options = options as SelectOption<T>[];
		else
			this.options = (options as T[]).map(option => new SelectOption(option));
	}

	public useDynamicOptions (isDynamic: boolean = true): this {
		this.dynamicOptions = isDynamic;
		return this;
	}

	public static create<T extends PreferenceValue> (preference: IMultiSelectPreference<T>): MultiSelectPreference<T> {
		return new MultiSelectPreference<T>(
			preference.identifier,
			preference.defaultValue || [],
			preference.options || [],
			preference.defaultLanguage || LanguageCode.EN_US,
			preference.translations || {}
		)
			.useDynamicDisable(preference.dynamicDisable || false)
			.useDynamicValue(preference.dynamicValue || false)
			.useDynamicOptions(preference.dynamicOptions || false);
	}
}
