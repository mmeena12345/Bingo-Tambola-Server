//Basic Tests to test the Route

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../index');

describe('GET /Create Game', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/game/create'
        });
        expect(res.statusCode).to.equal(200);
    });
});

describe('GET /Generate Ticket', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/game/1601833067480/ticket/mohit_meena/generate'
        });
        expect(res.statusCode).to.equal(200);
    });
});

describe('GET /Print Ticket', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/ticket/1601833067480_rahul_meena_118'
        });
        expect(res.statusCode).to.equal(200);
    });
});

describe('GET /Generate Random Numbers', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/game/1601833067480/number/random'
        });
        expect(res.statusCode).to.equal(200);
    });
});

describe('GET /Get All Generated numbers', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/game/1601833067480/numbers'
        });
        expect(res.statusCode).to.equal(200);
    });
});

describe('GET /Stats of the Game', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/api/game/1601833067480/stats'
        });
        expect(res.statusCode).to.equal(200);
    });
});