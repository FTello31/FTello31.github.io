// @ts-expect-error -- Bun runs this test; the site does not ship Bun's ambient types.
import { describe, expect, test } from "bun:test";
import { carouselIndex } from "./carousel";

describe("carouselIndex", () => {
	test("rounds and clamps the active slide", () => {
		expect(carouselIndex(0, 500, 3)).toBe(0);
		expect(carouselIndex(260, 500, 3)).toBe(1);
		expect(carouselIndex(2000, 500, 3)).toBe(2);
		expect(carouselIndex(-500, 500, 3)).toBe(0);
	});
});
