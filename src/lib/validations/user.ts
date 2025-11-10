import * as v from "valibot";

export const userNameSchema = v.object({
	firstName: v.pipe(v.string(), v.minLength(3), v.maxLength(32)),
	lastName: v.pipe(v.string(), v.minLength(3), v.maxLength(32)),
});
