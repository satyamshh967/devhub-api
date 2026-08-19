const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");
const connectDB = require("../config/db");

const User = require("../models/User");
const Project = require("../models/Project");

let testEmail;
let secondUserEmail;

const testPassword = "password123";

let token;
let secondUserToken;
let projectId;

beforeAll(async () => {
    await connectDB();

    testEmail = `test${Date.now()}@example.com`;
    secondUserEmail = `second${Date.now()}@example.com`;

    await request(app)
        .post("/auth/register")
        .send({
            name: "Test User",
            email: testEmail,
            password: testPassword
        });

    await request(app)
        .post("/auth/register")
        .send({
            name: "Second User",
            email: secondUserEmail,
            password: testPassword
        });

    const loginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: testEmail,
            password: testPassword
        });

    token = loginResponse.body.token;

    const secondLoginResponse = await request(app)
        .post("/auth/login")
        .send({
            email: secondUserEmail,
            password: testPassword
        });

    secondUserToken = secondLoginResponse.body.token;
});

afterAll(async () => {
    await User.deleteMany({
        email: {
            $in: [testEmail, secondUserEmail]
        }
    });

    await Project.deleteMany({
        name: {
            $in: [
                "Automated Test Project",
                "Updated Test Project",
                "Patched Test Project",
                "Second User Project"
            ]
        }
    });

    await mongoose.connection.close();
});

describe("Authentication", () => {

    test("should login with valid credentials", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: testEmail,
                password: testPassword
            });

        expect(response.statusCode).toBe(200);

        expect(response.body)
            .toHaveProperty("token");
    });

    test("should reject invalid password", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: testEmail,
                password: "wrongpassword"
            });

        expect(response.statusCode).toBe(401);

        expect(response.body)
            .toHaveProperty("message");
    });

    test("should reject login when email is missing", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                password: testPassword
            });

        expect(response.statusCode).toBe(400);
    });

});

describe("Project API", () => {

    test("should reject unauthenticated request", async () => {
        const response = await request(app)
            .get("/projects");

        expect(response.statusCode).toBe(401);
    });

    test("should allow authenticated request", async () => {
        const response = await request(app)
            .get("/projects")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
    });

    test("should reject project with invalid status", async () => {
        const response = await request(app)
            .post("/projects")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Invalid Project",
                status: "invalid-status"
            });

        expect(response.statusCode).toBe(400);
    });

    test("should reject project with missing name", async () => {
        const response = await request(app)
            .post("/projects")
            .set("Authorization", `Bearer ${token}`)
            .send({
                status: "active"
            });

        expect(response.statusCode).toBe(400);
    });

    test("should create a project", async () => {
        const response = await request(app)
            .post("/projects")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Automated Test Project",
                status: "active"
            });

        expect(response.statusCode).toBe(201);

        expect(response.body)
            .toHaveProperty("_id");

        expect(response.body.name)
            .toBe("Automated Test Project");

        expect(response.body.status)
            .toBe("active");

        projectId = response.body._id;
    });

    test("should get the created project", async () => {
        const response = await request(app)
            .get(`/projects/${projectId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body._id)
            .toBe(projectId);
    });

    test("should completely update the project", async () => {
        const response = await request(app)
            .put(`/projects/${projectId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Updated Test Project",
                status: "completed"
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.name)
            .toBe("Updated Test Project");

        expect(response.body.status)
            .toBe("completed");
    });

    test("should partially update the project", async () => {
        const response = await request(app)
            .patch(`/projects/${projectId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Patched Test Project"
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.name)
            .toBe("Patched Test Project");

        expect(response.body.status)
            .toBe("completed");
    });

    test("should delete the project", async () => {
        const response = await request(app)
            .delete(`/projects/${projectId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe("Project deleted successfully");
    });

    test("should not find the deleted project", async () => {
        const response = await request(app)
            .get(`/projects/${projectId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(404);

        expect(response.body.message)
            .toBe("Project not found");
    });

});

describe("Project Ownership", () => {

    test("should prevent one user from accessing another user's project", async () => {

        const response = await request(app)
            .post("/projects")
            .set("Authorization", `Bearer ${secondUserToken}`)
            .send({
                name: "Second User Project",
                status: "active"
            });

        expect(response.statusCode).toBe(201);

        const secondUserProjectId = response.body._id;

        const unauthorizedResponse = await request(app)
            .get(`/projects/${secondUserProjectId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(unauthorizedResponse.statusCode).toBe(404);

        expect(unauthorizedResponse.body.message)
            .toBe("Project not found");
    });

});