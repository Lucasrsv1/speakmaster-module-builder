import { LanguageCode } from "../languages";
import { SelectOption } from "./select-option";
import { Translations } from "../translatable";
import { Preference, PreferenceType, PreferenceValue } from "./preference";

export interface IOptionalSingleSelectPreference<T extends PreferenceValue> {
	identifier: string;
	defaultLanguage?: LanguageCode;
	defaultValue?: T | null;
	dynamicDisable?: boolean;
	dynamicOptions?: boolean;
	dynamicValue?: boolean;
	options?: Array<SelectOption<T> | T>;
	translations?: Translations;
}

export class OptionalSingleSelectPreference<T extends PreferenceValue> extends Preference<T | null> {
	public readonly type = PreferenceType.SINGLE_SELECT;

	public dynamicOptions: boolean = false;
	public currentOptions: SelectOption<T>[];

	constructor (
		identifier: string,
		defaultValue: T | null = null,
		options: Array<SelectOption<T> | T> = [],
		defaultLanguage: LanguageCode = LanguageCode.EN_US,
		translations: Translations = {}
	) {
		super(identifier, defaultValue, defaultLanguage, translations, true);

		if (!options.length)
			this.currentOptions = [];
		else if (options[0] instanceof SelectOption)
			this.currentOptions = options as SelectOption<T>[];
		else
			this.currentOptions = (options as T[]).map(option => new SelectOption(option));
	}

	public get options (): SelectOption<T>[] {
		return this.currentOptions;
	}

	public set options (newOptions: SelectOption<T>[]) {
		this.currentOptions = newOptions;
		this.changes.emit("options", this.currentOptions);
		this.changes.emit("any");
	}

	public useDynamicOptions (isDynamic: boolean = true): this {
		this.dynamicOptions = isDynamic;
		return this;
	}

	public static create<T extends PreferenceValue> (preference: IOptionalSingleSelectPreference<T>): OptionalSingleSelectPreference<T> {
		return new OptionalSingleSelectPreference<T>(
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
