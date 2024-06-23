import { writeFileSync } from "fs";

import { Preference, PreferenceValue } from "./preference";

// TODO: add preference exports

export class ModulePreferencesBuilder {
	public preferences: Preference<PreferenceValue>[];

	constructor () {
		this.preferences = [];
	}

	public addPreference (...preference: Preference<PreferenceValue>[]): ModulePreferencesBuilder {
		this.preferences = this.preferences.concat(preference);
		return this;
	}

	public generateJSON (outputPath: string = "sm-module-preferences.json"): void {
		writeFileSync(outputPath, JSON.stringify(this.preferences, (key, value) => {
			const ignoringKeys = ["currentValue", "currentlyDisabled"];
			if (ignoringKeys.includes(key))
				return undefined;

			return value;
		}));
	}
}
