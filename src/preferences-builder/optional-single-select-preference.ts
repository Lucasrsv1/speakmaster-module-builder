import { LanguageCode } from "../languages";
import { SelectOption } from "./select-option";
import { Translations } from "../features-builder";
import { Preference, PreferenceType, PreferenceValue } from "./preference";

export class OptionalSingleSelectPreference<T extends PreferenceValue> extends Preference<T | null> {
	public readonly type = PreferenceType.SINGLE_SELECT;

	public dynamicOptions: boolean = false;
	public options: SelectOption<T>[];

	constructor (
		identifier: string,
		defaultValue: T | null = null,
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
}
