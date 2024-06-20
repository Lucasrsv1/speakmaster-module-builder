import { LanguageCode } from "../languages";
import { Translations } from "../features-builder";
import { Preference, PreferenceType, PreferenceValue } from "./preference";

export enum ActionButtonPosition {
	BOTTOM_CENTER = "BOTTOM_CENTER",
	BOTTOM_LEFT = "BOTTOM_LEFT",
	BOTTOM_RIGHT = "BOTTOM_RIGHT",
	LEFT = "LEFT",
	RIGHT = "RIGHT",
	TOP_CENTER = "TOP_CENTER",
	TOP_LEFT = "TOP_LEFT",
	TOP_RIGHT = "TOP_RIGHT"
}

export class ActionButtonPreference<T extends PreferenceValue> extends Preference<T | null> {
	public readonly type = PreferenceType.ACTION_BUTTON;

	public dynamicLabel: boolean = false;
	public dynamicButtonTextAndIcon: boolean = false;

	constructor (
		identifier: string,
		public buttonText: string = "",
		public label: string | null = null,
		public buttonIcon: string | null = null,
		public position: ActionButtonPosition = ActionButtonPosition.BOTTOM_CENTER,
		defaultLanguage: LanguageCode = LanguageCode.EN_US,
		translations: Translations = {}
	) {
		super(identifier, null, defaultLanguage, translations);
		this.useDynamicValue();
	}

	public setPosition (position: ActionButtonPosition): this {
		this.position = position;
		return this;
	}

	public useDynamicValue (): this {
		this.dynamicValue = true;
		return this;
	}

	public useDynamicLabel (isDynamic: boolean = true): this {
		this.dynamicLabel = isDynamic;
		return this;
	}

	public useDynamicButtonTextAndIcon (isDynamic: boolean = true): this {
		this.dynamicButtonTextAndIcon = isDynamic;
		return this;
	}
}
