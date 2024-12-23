import { expect } from "jsr:@std/expect"
import { subtract } from "./api.ts"

Deno.test("should work", () => {
  expect(subtract(3, 1)).toEqual(2)
})
