import { LanguageCode } from "../languages";

export type Translations = Partial<
	Record<
		LanguageCode, { name: string; description: string | null; }
	>
>;
