import z from "zod";

const login = z.object({
  body: z.object({
    email: z.email({ error: "Invalid email address" }),
    password: z
      .string({ error: "Password is required." })
      .min(8, { error: "Password should be 8 characters long." })
      .max(32, { error: "Password should not be over 32 characters" }),
  }),
});

const authValidationSchema = {
  login,
};

export default authValidationSchema;
