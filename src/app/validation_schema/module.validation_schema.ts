import z from "zod";

const create = z.object({
  body: z.object({
    title: z
      .string({ error: "Title is required." })
      .min(10, { error: "Module title must be at least 10 characters long." })
      .max(100, { error: "Module title cannot exceed 100 characters." }),
  }),
});

const moduleValidationSchema = {
  create,
};

export default moduleValidationSchema;
