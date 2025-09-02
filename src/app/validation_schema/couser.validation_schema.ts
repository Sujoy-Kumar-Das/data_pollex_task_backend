import z from "zod";

const create = z.object({
  body: z.object({
    title: z
      .string({
        error: "Course title is required.",
      })
      .min(3, "Course title must be at least 3 characters long."),

    thumbnail: z.url({
      error: "Course thumbnail URL is required.",
    }),

    description: z
      .string({
        error: "Course description is required.",
      })
      .min(500, "Course description must be at least 10 characters long."),

    price: z
      .number({
        error: "Course price is required.",
      })
      .min(0, "Course price must be greater than or equal to 0."),
  }),
});

const courseValidationSchema = {
  create,
};

export default courseValidationSchema;
