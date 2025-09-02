import z from "zod";

const lectureSchema = z.object({
  title: z
    .string({
      error: "Title is required",
    })
    .min(10, "Title must be at least 10 characters long")
    .max(100, "Title must be at most 100 characters long"),

  video: z.url({
    error: "Video URL is required",
  }),

  notes: z.array(z.url({ error: "Note is required." })).optional(),
  module: z.string({ error: "Module is required." }),
});

export const create = z.object({
  body: z.object({
    lecture: z
      .array(lectureSchema)
      .min(1, { error: "Minimum 1 lecture is required." })
      .refine(
        (lectures) => {
          const firstModuleId = lectures[0].module;

          return lectures.every((lecture) => lecture.module === firstModuleId);
        },
        {
          error: "Every lecture should be the same module.",
        }
      ),
  }),
});

const lectureValidationSchema = {
  create,
};

export default lectureValidationSchema;
