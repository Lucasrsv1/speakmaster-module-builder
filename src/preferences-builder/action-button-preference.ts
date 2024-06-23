import { LanguageCode } from "../languages";
import { Translations } from "../translatable";
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

export interface IActionButtonPreference {
	identifier: string;
	buttonIcon?: string;
	buttonText?: string;
	defaultLanguage?: LanguageCode;
	dynamicButtonTextAndIcon?: boolean;
	dynamicDisable?: boolean;
	dynamicLabel?: boolean;
	label?: string;
	position?: ActionButtonPosition;
	translations?: Translations;
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

	public static create<T extends PreferenceValue> (preference: IActionButtonPreference): ActionButtonPreference<T> {
		return new ActionButtonPreference<T>(
			preference.identifier,
			preference.buttonText || "",
			preference.label || null,
			preference.buttonIcon || null,
			preference.position || ActionButtonPosition.BOTTOM_CENTER,
			preference.defaultLanguage || LanguageCode.EN_US,
			preference.translations || {}
		)
			.useDynamicDisable(preference.dynamicDisable || false)
			.useDynamicLabel(preference.dynamicLabel || false)
			.useDynamicButtonTextAndIcon(preference.dynamicButtonTextAndIcon || false);
	}
}
