const request = require("supertest");
const app = require("../server");

beforeAll(() => jest.setTimeout(90 * 1000));

  describe("Test get all blogs ", () => {
    test("It should give status 200", async () => {
      const response = await request(app).get("/api/blogs");
      expect(response.statusCode).toBe(200);
    }, 90000);
  });

  describe("Test get one blog by id", () => {
    test("It should give status 200", async () => {
      const response = await request(app).get("/api/blogs/63cda4044eed594c1e79571f");
      expect(response.statusCode).toBe(200);
    }, 30000);
  });

  describe("Test does the searching function works ", () => {
    test("It should give status 200", async () => {
      const response = await request(app).get("/api/blogs?title=stay");
      expect(response.statusCode).toBe(200);
    }, 30000);
  });

  describe("Test get all the published blogs", () => {
    test("It should give status 200", async () => {
      const response = await request(app).get("/api/blogs/published");
      expect(response.statusCode).toBe(200);
    }, 30000);
  });

  // auth test 

  describe("Test get public content ", () => {
    test("It should give status 200", async () => {
      const response = await request(app).get("/api/test/all");
      expect(response.statusCode).toBe(200);
    }, 30000);
  });

  // login test 

  describe("Test login by invalide user name ", () => {
    test("It should give status 404", async () => {
      const response = await request(app).post("/api/auth/signin").send({
          username: "Nom",
          password: "12345690"
      });
      expect(response.statusCode).toBe(404);
    }, 30000);
  });

  describe("Test login by incorrect password ", () => {
    test("It should give status 401", async () => {
      const response = await request(app).post("/api/auth/signin").send({
          username: "Niki",
          password: "123"
      });
      expect(response.statusCode).toBe(401);
    }, 30000);
  });

  describe("Test login by corect user ", () => {
    test("It should give status 200", async () => {
      const response = await request(app).post("/api/auth/signin").send({
          username: "Niki",
          password: "12345690"
      });
      expect(response.statusCode).toBe(200);
    }, 30000);
  });

  describe("Test loginout ", () => {
    test("It should give status 200", async () => {
      const response = await request(app).post("/api/auth/signout");
      expect(response.statusCode).toBe(200);
    }, 30000);
  });

  afterAll(() => jest.setTimeout(5 * 10000));
