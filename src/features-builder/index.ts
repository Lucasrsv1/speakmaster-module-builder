import { writeFileSync } from "fs";

import { Feature } from "./feature";

export { Feature, FeatureTranslation } from "./feature";
export { Parameter, ParameterTranslation } from "./parameter";
export { ParameterValue, ParameterValueTranslation } from "./parameter-value";

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
