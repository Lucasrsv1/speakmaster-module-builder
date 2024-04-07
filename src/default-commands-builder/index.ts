import { writeFileSync } from "fs";

import { Command } from "./command";
import { LanguageCode } from "../languages";

export { Command, CommandParameter, CommandParameterTypes } from "./command";

export class DefaultCommandsBuilder {
	public commandsByLanguage: Partial<Record<LanguageCode, Command[]>>;

	constructor () {
		this.commandsByLanguage = {};
	}

	public addCommand (languageCodes: LanguageCode[], command: Command): DefaultCommandsBuilder {
		for (const languageCode of languageCodes) {
			if (!this.commandsByLanguage[languageCode])
				this.commandsByLanguage[languageCode] = [];

			this.commandsByLanguage[languageCode]!.push(command);
		}

		return this;
	}

	public generateJSON (outputPath = "sm-module-default-commands.json"): void {
		writeFileSync(outputPath, JSON.stringify(this.commandsByLanguage));
	}
}
