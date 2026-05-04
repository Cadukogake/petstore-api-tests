describe('User API', () => {
  context('POST /user/createWithList - Criar lista via list', () => {
    it('cria múltiplos usuários via list com sucesso', () => {
      cy.createUsersWithList(3).then((res) => {
        expect(res.status).to.eq(200);
      });
    });

    it('não retorna 500 ao criar list com username de 5000 caracteres', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('BASE_URL')}/user/createWithList`,
        body: [{ id: 1, username: 'a'.repeat(5000), firstName: 'Test', lastName: 'User', email: 'test@test.com', password: 'pass', phone: '123', userStatus: 0 }],
        headers: { 'Content-Type': 'application/json' },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao criar list com SQL injection no username', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('BASE_URL')}/user/createWithList`,
        body: [{ id: 2, username: "'; DROP TABLE users; --", firstName: 'Test', lastName: 'User', email: 'test@test.com', password: 'pass', phone: '123', userStatus: 0 }],
        headers: { 'Content-Type': 'application/json' },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao criar list com XSS no firstName', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('BASE_URL')}/user/createWithList`,
        body: [{ id: 3, username: 'xss_test_list', firstName: '<script>alert("xss")</script>', lastName: 'User', email: 'test@test.com', password: 'pass', phone: '123', userStatus: 0 }],
        headers: { 'Content-Type': 'application/json' },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao enviar lista vazia', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('BASE_URL')}/user/createWithList`,
        body: [],
        headers: { 'Content-Type': 'application/json' },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });
  });
});
