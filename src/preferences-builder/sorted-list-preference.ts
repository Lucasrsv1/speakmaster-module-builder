import { LanguageCode } from "../languages";
import { SelectOption } from "./select-option";
import { Translations } from "../translatable";
import { Preference, PreferenceType, PreferenceValue } from "./preference";

export interface ISortedListPreference<T extends PreferenceValue> {
	identifier: string;
	defaultLanguage?: LanguageCode;
	dynamicDisable?: boolean;
	dynamicList?: boolean;
	dynamicValue?: boolean;
	list?: Array<SelectOption<T> | T>;
	translations?: Translations;
}

export class SortedListPreference<T extends PreferenceValue> extends Preference<T[]> {
	public readonly type = PreferenceType.SORTED_LIST;

	public dynamicList: boolean = false;
	public currentList: SelectOption<T>[];

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
		this.currentList = listOptions;
	}

	public get list (): SelectOption<T>[] {
		return this.currentList;
	}

	public set list (newList: SelectOption<T>[]) {
		this.currentList = newList;
		this.changes.emit("list", this.currentList);
		this.changes.emit("any");
	}

	public useDynamicList (isDynamic: boolean = true): this {
		this.dynamicList = isDynamic;
		return this;
	}

	public static create<T extends PreferenceValue> (preference: ISortedListPreference<T>): SortedListPreference<T> {
		return new SortedListPreference<T>(
			preference.identifier,
			preference.list || [],
			preference.defaultLanguage || LanguageCode.EN_US,
			preference.translations || {}
		)
			.useDynamicDisable(preference.dynamicDisable || false)
			.useDynamicValue(preference.dynamicValue || false)
			.useDynamicList(preference.dynamicList || false);
	}
}
