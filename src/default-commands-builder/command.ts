export enum CommandParameterTypes {
	CONSTANT = "CONSTANT",
	RESTRICTED_VARIABLE = "RESTRICTED_VARIABLE",
	UNDEFINED = "UNDEFINED",
	VARIABLE = "VARIABLE"
}

export class CommandParameter {
	public identifier: string;
	public type: CommandParameterTypes;
	public optional: boolean;

	public value?: string;
	public variableName?: string;
	public variableValues?: string[];

	constructor (identifier: string, optional: boolean = false) {
		this.identifier = identifier;
		this.optional = optional;

		this.type = CommandParameterTypes.UNDEFINED;
		this.value = undefined;
		this.variableName = undefined;
		this.variableValues = undefined;
	}

	public useConstant (value: string): CommandParameter {
		this.type = CommandParameterTypes.CONSTANT;
		this.value = value;
		return this;
	}

	public useRestrictedVariable (variableName: string, variableValues: string[]): CommandParameter {
		this.type = CommandParameterTypes.RESTRICTED_VARIABLE;
		this.variableName = variableName;
		this.variableValues = variableValues;
		return this;
	}

	public useVariable (variableName: string): CommandParameter {
		this.type = CommandParameterTypes.VARIABLE;
		this.variableName = variableName;
		return this;
	}
}

export class Command {
	public command: string;
	public featureIdentifier: string;

	public parameters?: CommandParameter[];

	constructor (command: string, featureIdentifier: string, parameters: CommandParameter | CommandParameter[] | undefined = undefined) {
		this.command = command;
		this.featureIdentifier = featureIdentifier;

		if (parameters && !Array.isArray(parameters))
			this.parameters = [parameters];
		else
			this.parameters = parameters;
	}
}
