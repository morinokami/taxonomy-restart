import * as v from "valibot";

export const OGImageSchema = v.object({
	heading: v.string(),
	type: v.string(),
	mode: v.optional(v.picklist(["light", "dark"]), "dark"),
});
