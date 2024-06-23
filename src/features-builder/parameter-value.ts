import { Translatable, Translations } from "../translatable";

export class ParameterValue extends Translatable {
	constructor (
		public identifier: string,
		translations: Translations = {}
	) {
		super(translations);
	}
}
