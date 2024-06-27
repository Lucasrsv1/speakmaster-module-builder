import { writeFileSync } from "fs";

import { Preference, PreferenceValue } from "./preference";
import { Translatable, Translations } from "../translatable";

export { ActionButtonPosition, ActionButtonPreference, IActionButtonPreference } from "./action-button-preference";
export { BooleanPreference, IBooleanPreference } from "./boolean-preference";
export { MultiSelectPreference, IMultiSelectPreference } from "./multi-select-preference";
export { INumberPreference, NumberPreference } from "./number-preference";
export { IOptionalMultiSelectPreference, OptionalMultiSelectPreference } from "./optional-multi-select-preference";
export { IOptionalNumberPreference, OptionalNumberPreference } from "./optional-number-preference";
export { IOptionalSingleSelectPreference, OptionalSingleSelectPreference } from "./optional-single-select-preference";
export { IOptionalStringPreference, OptionalStringPreference } from "./optional-string-preference";
export { Preference, PreferenceType, PreferenceValue } from "./preference";
export { SelectOption } from "./select-option";
export { ISingleSelectPreference, SingleSelectPreference } from "./single-select-preference";
export { SortedListPreference, ISortedListPreference } from "./sorted-list-preference";
export { IStringPreference, StringPreference } from "./string-preference";

const keysToIgnore = [
	"currentButtonIcon",
	"currentButtonText",
	"currentLabel",
	"currentList",
	"currentlyDisabled",
	"currentOptions",
	"currentValue",
	"changes"
];

export const EMPTY_PREFERENCE_SLOT = null;

export class PreferenceGroup extends Translatable {
	constructor (
		public preferenceRows: (Preference<PreferenceValue> | null)[][] = [],
		translations: Translations = {}
	) {
		super(translations);
	}

	// Minimum sizes:
	// xs: col-12 | 1 per row
	// md: col-6  | 2 per row
	// lg: col-4  | 3 per row
	// xl: col-3  | 4 per row

	public addPreferenceRow (preferences: (Preference<PreferenceValue> | null)[]): this;
	public addPreferenceRow (...preferences: (Preference<PreferenceValue> | null)[]): this;
	public addPreferenceRow (
		preferences: (Preference<PreferenceValue> | null)[] | Preference<PreferenceValue> | null,
		...restPreferences: (Preference<PreferenceValue> | null)[]
	): this {
		if (Array.isArray(preferences)) {
			// The first argument is an array, treat it as a single row
			this.preferenceRows.push(preferences);
		} else {
			// The first argument is not an array, treat all arguments as a row
			this.preferenceRows.push([preferences, ...restPreferences]);
		}

		return this;
	}
}

export class ModulePreferencesBuilder {
	public preferenceGroups: PreferenceGroup[];

	constructor () {
		this.preferenceGroups = [];
	}

	public addPreferenceGroup (...preferenceGroup: PreferenceGroup[]): ModulePreferencesBuilder {
		this.preferenceGroups = this.preferenceGroups.concat(preferenceGroup);
		return this;
	}

	public generateJSON (outputPath: string = "sm-module-preferences.json"): void {
		writeFileSync(outputPath, JSON.stringify(this.preferenceGroups, (key, value) => {
			if (value && typeof value === "object" && Object.keys(value).some(k => keysToIgnore.includes(k))) {
				const replacement = { ...value };

				if ("currentButtonIcon" in replacement)
					replacement.buttonIcon = replacement.currentButtonIcon;
				if ("currentButtonText" in replacement)
					replacement.buttonText = replacement.currentButtonText;
				if ("currentLabel" in replacement)
					replacement.label = replacement.currentLabel;
				if ("currentList" in replacement)
					replacement.list = replacement.currentList;
				if ("currentOptions" in replacement)
					replacement.options = replacement.currentOptions;

				return replacement;
			}

			if (keysToIgnore.includes(key))
				return undefined;

			return value;
		}));
	}
}
