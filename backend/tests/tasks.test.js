const request = require('supertest');
const app = require('../index');

describe('Task API', () => {
    it('GET /tasks should return 200 OK', async () => {
        const res = await request(app).get('/tasks');
        expect(res.statusCode).toBe(200);
    });

    it('GET /tasks should return an array', async () => {
        const res = await request(app).get('/tasks');
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('POST /tasks should create a new task', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({ title: "Test Task" });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe("Test Task");
    });
});

// --- Close the Postgres pool after all tests finish ---
afterAll(async () => {
    await app.pool.end();
});