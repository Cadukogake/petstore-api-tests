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
});
