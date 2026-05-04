describe('User API', () => {
  context('PUT /user/{username} - Atualizar usuário', () => {
    let createdUser;

    beforeEach(() => {
      cy.createUser().then(({ userData }) => {
        createdUser = userData;
      });
    });

    afterEach(() => {
      cy.deleteUser(createdUser.username);
    });

    it('atualiza dados do usuário com sucesso', () => {
      cy.updateUser(createdUser.username, { email: 'atualizado@email.com' }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });

    it('retorna 404 ao tentar atualizar usuário inexistente (fixture)', () => {
      cy.fixture('user').then(({ notFoundUsername }) => {
        cy.updateUser(notFoundUsername, { email: 'naoexiste@email.com' }).then((res) => {
          expect(res.status).to.eq(404);
        });
      });
    });
  });
});
