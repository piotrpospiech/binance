import z from "zod";

export const numericString = () =>
  z
    .string()
    .regex(/^-?\d+(\.\d+)?$/, "Must be a valid numeric string")
    .describe("Numeric value represented as string");
