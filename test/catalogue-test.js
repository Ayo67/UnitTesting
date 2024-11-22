import { expect } from "chai";
import { Catalogue } from "../src/catalogue.js";
import { Product } from "../src/product.js";

let cat = null;
let batch = null;

// Test data
const p123 = new Product("A123", "Product 1", 100, 10, 10.0);
const p124 = new Product("A124", "Widget 1", 100, 10, 10.0);
const p125 = new Product("A125", "A Product 2", 100, 10, 10.0);
const p126 = new Product("A126", "A Widget 2", 100, 10, 10.0);
const p127 = new Product("A127", "Bracket 1", 100, 10, 10.0);
const p128 = new Product("A128", "A Product 3", 100, 10, 10.0);
// Bad data
const duplicate = new Product("A124", "A Product 4", 100, 10, 10.0);
const noPriceProduct = new Product("A129", "Product 5", 100, 10);
const noNameProduct = new Product("A1210", undefined, 100, 10, 12.4);

describe("checkReorder", () => {
  it("should return an empty array when no products need reordering", function () {
    const result = cat.checkReorders();
    expect(result.productIds).to.be.empty;
  });
  it("should report products that satisfy the reorder criteria", function () {
    cat.addProduct(new Product("B123", "Product 4", 10, 20, 10.0));
    cat.addProduct(new Product("B124", "Product 5", 10, 30, 10.0));
    const result = cat.checkReorders();
    expect(result.productIds).to.have.lengthOf(2);
    expect(result.productIds).to.have.members(["B123", "B124"]);
  });
  it("should include products just on their reorder level", function () {
    cat.addProduct(new Product("B125", "Product 6", 10, 10, 10.0));
    const result = cat.checkReorders();
    expect(result.productIds).to.have.members(["B125"]);
  });
  it("should handle an the empty catalogue case", function () {
    cat = new Catalogue("Test catalogue");
    const result = cat.checkReorders();
    expect(result.productIds).to.be.empty;
  });
});

  describe("removeProductById", () => {
    beforeEach(() => {
      cat.addProduct(p123);
      cat.addProduct(p124);
      cat.addProduct(p125);
      cat.addProduct(p126);
    });
    it("should return the removed product when the id is valid", function () {
      let result = cat.removeProductById("A124");
      expect(result.id).to.equal("A124");
      // Check object state
      result = cat.findProductById("A124");
      expect(result).to.be.undefined;
    });
    it("should return undefined when the product id is invalid", function () {
      const result = cat.removeProductById("A321");
      expect(result).to.be.undefined;
    });
  });