import { writeFileSync } from "fs";

import { Feature } from "./feature";

export { Feature } from "./feature";
export { Parameter } from "./parameter";
export { ParameterValue } from "./parameter-value";
export { Translations } from "./translations";

export class ModuleFeaturesBuilder {
	public features: Feature[];

	constructor () {
		this.features = [];
	}

	public addFeature (...feature: Feature[]): ModuleFeaturesBuilder {
		this.features = this.features.concat(feature);
		return this;
	}

	public generateJSON (outputPath: string = "sm-module-features.json"): void {
		writeFileSync(outputPath, JSON.stringify(this.features));
	}
}
