import { EventEmitter } from "events";

import { LanguageCode } from "../languages";
import { Translatable, Translations } from "../translatable";

import { SelectOption } from "./select-option";

export enum PreferenceType {
	ACTION_BUTTON = "ACTION_BUTTON",
	BOOLEAN = "BOOLEAN",
	FLOAT = "FLOAT",
	INTEGER = "INTEGER",
	MULTI_SELECT = "MULTI_SELECT",
	SINGLE_SELECT = "SINGLE_SELECT",
	SORTED_LIST = "SORTED_LIST",
	STRING = "STRING"
}

export interface IPreferenceUpdate<T extends PreferenceValue> {
	identifier: string;
	isDisabled: boolean;
	value: T;
	buttonIcon?: string | null;
	buttonText?: string;
	label?: string | null;
	list?: SelectOption<T>[];
	options?: SelectOption<T>[];
}

export interface IPreferenceChanges<T extends PreferenceValue> {
	any: [];
	buttonIcon: [string | null];
	buttonText: [string];
	isDisabled: [boolean];
	label: [string | null];
	list: [SelectOption<PreferenceValue>[]];
	options: [SelectOption<PreferenceValue>[]];
	value: [T];
}

export type PreferenceValue = number | string | boolean | object | number[] | string[] | boolean[] | object[] | null;

export abstract class Preference<T extends PreferenceValue> extends Translatable {
	public readonly abstract type: PreferenceType;
	public readonly changes: EventEmitter<IPreferenceChanges<T>>;

	public dynamicValue: boolean = false;
	public dynamicDisable: boolean = false;

	protected currentValue: T;
	protected currentlyDisabled: boolean;

	constructor (
		public identifier: string,
		public defaultValue: T,
		public defaultLanguage: LanguageCode = LanguageCode.EN_US,
		translations: Translations = {},
		public isOptional: boolean = false
	) {
		super(translations);
		this.currentValue = defaultValue;
		this.currentlyDisabled = false;
		this.changes = new EventEmitter();
	}

	public get value (): T {
		return this.currentValue;
	}

	public set value (newValue: T) {
		this.currentValue = newValue;
		this.changes.emit("value", this.currentValue);
		this.changes.emit("any");
	}

	public get isDisabled (): boolean {
		return this.currentlyDisabled;
	}

	public set isDisabled (newValue: boolean) {
		this.currentlyDisabled = newValue;
		this.changes.emit("isDisabled", this.currentlyDisabled);
		this.changes.emit("any");
	}

	public useDynamicValue (isDynamic: boolean = true): this {
		this.dynamicValue = isDynamic;
		return this;
	}

	public useDynamicDisable (isDynamic: boolean = true): this {
		this.dynamicDisable = isDynamic;
		return this;
	}

	public setDefaultLanguage (defaultLanguage: LanguageCode): this {
		this.defaultLanguage = defaultLanguage;
		return this;
	}
}
