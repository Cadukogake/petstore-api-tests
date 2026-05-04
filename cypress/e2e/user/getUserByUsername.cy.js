describe('User API', () => {
  context('GET /user/{username} - Buscar usuário por username', () => {
    let createdUser;

    beforeEach(() => {
      cy.createUser().then(({ userData }) => {
        createdUser = userData;
      });
    });

    afterEach(() => {
      cy.deleteUser(createdUser.username);
    });

    it('retorna usuário correto pelo username', () => {
      cy.getUserByUsername(createdUser.username).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.username).to.eq(createdUser.username);
        expect(res.body).to.have.property('email');
      });
    });

    it('retorna 404 para username inexistente (fixture)', () => {
      cy.fixture('user').then(({ notFoundUsername }) => {
        cy.getUserByUsername(notFoundUsername).then((res) => {
          expect(res.status).to.eq(404);
        });
      });
    });
  });

  context('Segurança - GET /user/{username}', () => {
    it('não retorna 500 ao buscar usuário com SQL injection no path', () => {
      cy.getUserByUsername("' OR '1'='1").then((res) => {
        expect(res.status).to.be.oneOf([400, 404]);
      });
    });

    it('não retorna 500 ao buscar usuário com XSS no path', () => {
      cy.getUserByUsername('<script>alert(1)</script>').then((res) => {
        expect(res.status).to.be.oneOf([400, 404]);
      });
    });

    it('não retorna 500 ao buscar usuário com username de 5000 caracteres', () => {
      cy.getUserByUsername('a'.repeat(5000)).then((res) => {
        expect(res.status).to.be.oneOf([400, 404, 414]);
      });
    });
  });
});
