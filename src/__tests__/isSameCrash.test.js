//import React from 'react';
import { isSameCrash } from "../pages/Map";

// test('two coords are same crash', () => {
//   expect(isSameCrash(34.41359, -119.84634,34.41342,-119.84635)).toBe(true);
// });

describe("src/pages/", () => {
  describe("isSameCrash", () => {
    it("same return true, when coords within 200ft", () => {
      expect(isSameCrash(34.41359, -119.84634, 34.41342, -119.84635)).toBe(
        true
      );
    });
  });
});
