import { LanguageCode } from "../languages";
import { Translations } from "../translatable";
import { Preference, PreferenceType, PreferenceValue } from "./preference";

export enum ActionButtonColor {
	PRIMARY = "btn-primary",
	SECONDARY = "btn-secondary",
	SUCCESS = "btn-success",
	WARNING = "btn-warning",
	DANGER = "btn-danger",
	INFO = "btn-info",
	LIGHT = "btn-light",
	DARK = "btn-dark",
	LINK = "btn-link",
	OUTLINE_PRIMARY = "btn-outline-primary",
	OUTLINE_SECONDARY = "btn-outline-secondary",
	OUTLINE_SUCCESS = "btn-outline-success",
	OUTLINE_WARNING = "btn-outline-warning",
	OUTLINE_DANGER = "btn-outline-danger",
	OUTLINE_INFO = "btn-outline-info",
	OUTLINE_LIGHT = "btn-outline-light",
	OUTLINE_DARK = "btn-outline-dark"
}

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
	color?: ActionButtonColor;
	position?: ActionButtonPosition;
	translations?: Translations;
}

export class ActionButtonPreference<T extends PreferenceValue> extends Preference<T | null> {
	public readonly type = PreferenceType.ACTION_BUTTON;

	public dynamicLabel: boolean = false;
	public dynamicButtonTextAndIcon: boolean = false;

	protected currentButtonIcon: string | null;
	protected currentButtonText: string;
	protected currentLabel: string | null;

	constructor (
		identifier: string,
		buttonText: string = "",
		label: string | null = null,
		buttonIcon: string | null = null,
		public color: ActionButtonColor = ActionButtonColor.INFO,
		public position: ActionButtonPosition = ActionButtonPosition.BOTTOM_CENTER,
		defaultLanguage: LanguageCode = LanguageCode.EN_US,
		translations: Translations = {}
	) {
		super(identifier, null, defaultLanguage, translations);
		this.currentButtonIcon = buttonIcon;
		this.currentButtonText = buttonText;
		this.currentLabel = label;
		this.useDynamicValue();
	}

	public get buttonIcon (): string | null {
		return this.currentButtonIcon;
	}

	public set buttonIcon (newValue: string | null) {
		this.currentButtonIcon = newValue;
		this.changes.emit("buttonIcon", this.currentButtonIcon);
		this.changes.emit("any");
	}

	public get buttonText (): string {
		return this.currentButtonText;
	}

	public set buttonText (newValue: string) {
		this.currentButtonText = newValue;
		this.changes.emit("buttonText", this.currentButtonText);
		this.changes.emit("any");
	}

	public get label (): string | null {
		return this.currentLabel;
	}

	public set label (newValue: string | null) {
		this.currentLabel = newValue;
		this.changes.emit("label", this.currentLabel);
		this.changes.emit("any");
	}

	public setColor (color: ActionButtonColor): this {
		this.color = color;
		return this;
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
			preference.color || ActionButtonColor.INFO,
			preference.position || ActionButtonPosition.BOTTOM_CENTER,
			preference.defaultLanguage || LanguageCode.EN_US,
			preference.translations || {}
		)
			.useDynamicDisable(preference.dynamicDisable || false)
			.useDynamicLabel(preference.dynamicLabel || false)
			.useDynamicButtonTextAndIcon(preference.dynamicButtonTextAndIcon || false);
	}
}
