import * as v from "valibot";

export const PostPatchSchema = v.object({
	title: v.pipe(v.string(), v.minLength(3), v.maxLength(128)),

	// TODO: Type this properly from editorjs block types?
	content: v.any(),
});
