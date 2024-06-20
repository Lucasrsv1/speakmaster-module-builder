import { LanguageCode } from "../languages";
import { SelectOption } from "./select-option";
import { Translations } from "../features-builder";
import { Preference, PreferenceType, PreferenceValue } from "./preference";

export class SortedListPreference<T extends PreferenceValue> extends Preference<T[]> {
	public readonly type = PreferenceType.SORTED_LIST;

	public dynamicList: boolean = false;
	public list: SelectOption<T>[];

	constructor (
		identifier: string,
		list: Array<SelectOption<T> | T> = [],
		defaultLanguage: LanguageCode = LanguageCode.EN_US,
		translations: Translations = {}
	) {
		let listOptions: SelectOption<T>[] = [];
		if (!list.length)
			listOptions = [];
		else if (list[0] instanceof SelectOption)
			listOptions = list as SelectOption<T>[];
		else
			listOptions = (list as T[]).map(option => new SelectOption(option));

		super(identifier, listOptions.map(o => o.value), defaultLanguage, translations);
		this.list = listOptions;
	}

	public useDynamicList (isDynamic: boolean = true): this {
		this.dynamicList = isDynamic;
		return this;
	}
}
