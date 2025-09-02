import z from "zod";

const createStudent = z.object({
  body: z.object({
    name: z
      .string({ error: "Name is required." })
      .min(2, { error: "Name minimum 2 characters long" })
      .max(50, { error: "Name should not be maximum 50 characters" }),
    email: z.email({ error: "Invalid email address." }),
    password: z
      .string({ error: "Password is required." })
      .min(8, { error: "Password should be at least 8 characters long." })
      .regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        error: "Password must contain at least one lowercase letter.",
      })
      .regex(/[0-9]/, { error: "Password must contain at least one number." })
      .regex(/[@$!%*?&]/, {
        error: "Password must contain at least one special character.",
      })
      .max(32, {
        error: "Password should not be longer than 32 characters.",
      }),
  }),
});

const userValidationSchema = {
  createStudent,
};

export default userValidationSchema;
