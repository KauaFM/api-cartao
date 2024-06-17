const supertest = require('supertest');

const app = require('../app');

const request = supertest(app);

describe('API Loja Virtual', () => {
   test('Deve retornar CODIGO e CORPO no VERBO /ROTA', async () => {});
});