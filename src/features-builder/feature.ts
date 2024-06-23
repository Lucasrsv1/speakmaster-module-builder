import { LanguageCode } from "../languages";
import { Parameter } from "./parameter";
import { Translatable, Translations } from "../translatable";

export class Feature extends Translatable {
	constructor (
		public identifier: string,
		public defaultLanguage: LanguageCode = LanguageCode.EN_US,
		public parameters: Parameter[] = [],
		translations: Translations = {}
	) {
		super(translations);
	}

	public addParameter (...parameter: Parameter[]): Feature {
		this.parameters = this.parameters.concat(parameter);
		return this;
	}
}
