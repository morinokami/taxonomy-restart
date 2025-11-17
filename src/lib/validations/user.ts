import * as v from "valibot";

export const UserNameSchema = v.object({
	firstName: v.pipe(v.string(), v.minLength(3), v.maxLength(32)),
	lastName: v.pipe(v.string(), v.minLength(3), v.maxLength(32)),
});
