import app from "../src/app.js";

describe("App Bootstrap", () => {
  it("loads without crashing", () => {
    expect(app).toBeDefined();
  });
});

