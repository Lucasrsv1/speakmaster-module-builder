import { EventEmitter } from "events";

import { LanguageCode } from "../languages";
import { Translatable, Translations } from "../translatable";

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

export type PreferenceValue = number | string | boolean | object | number[] | string[] | boolean[] | object[] | null;

export abstract class Preference<T extends PreferenceValue> extends Translatable {
	public readonly abstract type: PreferenceType;

	public dynamicValue: boolean = false;
	public dynamicDisable: boolean = false;

	protected currentValue: T;
	protected currentlyDisabled: boolean;
	readonly #valueChanges: EventEmitter;

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
		this.#valueChanges = new EventEmitter();
	}

	public get value (): T {
		return this.currentValue;
	}

	public set value (newValue: T) {
		this.currentValue = newValue;
		this.#valueChanges.emit("change", this.currentValue);
	}

	public get isDisabled (): boolean {
		return this.currentlyDisabled;
	}

	public set isDisabled (newValue: boolean) {
		this.currentlyDisabled = newValue;
	}

	public useDynamicValue (isDynamic: boolean = true): this {
		this.dynamicValue = isDynamic;
		return this;
	}

	public useDynamicDisable (isDynamic: boolean = true): this {
		this.dynamicDisable = isDynamic;
		return this;
	}

	public addChangeListener (listener: (value: T) => void): void {
		this.#valueChanges.on("change", listener);
	}

	public removeChangeListener (listener: (value: T) => void): void {
		this.#valueChanges.removeListener("change", listener);
	}

	public setDefaultLanguage (defaultLanguage: LanguageCode): this {
		this.defaultLanguage = defaultLanguage;
		return this;
	}
}
