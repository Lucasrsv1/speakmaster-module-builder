import { LanguageCode } from "../languages";
import { SelectOption } from "./select-option";
import { Translations } from "../translatable";
import { Preference, PreferenceType, PreferenceValue } from "./preference";

export interface IOptionalMultiSelectPreference<T extends PreferenceValue> {
	identifier: string;
	defaultLanguage?: LanguageCode;
	defaultValue?: T[] | null;
	dynamicDisable?: boolean;
	dynamicOptions?: boolean;
	dynamicValue?: boolean;
	options?: Array<SelectOption<T> | T>;
	translations?: Translations;
}

export class OptionalMultiSelectPreference<T extends PreferenceValue> extends Preference<T[] | null> {
	public readonly type = PreferenceType.MULTI_SELECT;

	public dynamicOptions: boolean = false;
	public options: SelectOption<T>[];

	constructor (
		identifier: string,
		defaultValue: T[] | null = null,
		options: Array<SelectOption<T> | T> = [],
		defaultLanguage: LanguageCode = LanguageCode.EN_US,
		translations: Translations = {}
	) {
		super(identifier, defaultValue, defaultLanguage, translations, true);

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

	public static create<T extends PreferenceValue> (preference: IOptionalMultiSelectPreference<T>): OptionalMultiSelectPreference<T> {
		return new OptionalMultiSelectPreference<T>(
			preference.identifier,
			preference.defaultValue || null,
			preference.options || [],
			preference.defaultLanguage || LanguageCode.EN_US,
			preference.translations || {}
		)
			.useDynamicDisable(preference.dynamicDisable || false)
			.useDynamicValue(preference.dynamicValue || false)
			.useDynamicOptions(preference.dynamicOptions || false);
	}
}
