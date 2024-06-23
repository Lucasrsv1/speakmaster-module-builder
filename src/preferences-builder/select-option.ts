import { PreferenceValue } from "./preference";
import { Translatable, Translations } from "../translatable";

export class SelectOption<T extends PreferenceValue> extends Translatable {
	constructor (
		public value: T,
		translations: Translations = {}
	) {
		super(translations);
	}
}
