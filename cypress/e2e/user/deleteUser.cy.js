describe('User API', () => {
  context('DELETE /user/{username} - Deletar usuário', () => {
    let createdUser;

    beforeEach(() => {
      cy.createUser().then(({ userData }) => {
        createdUser = userData;
      });
    });

    it('deleta usuário existente com sucesso', () => {
      cy.deleteUser(createdUser.username).then((res) => {
        expect(res.status).to.eq(200);
      });
    });

    it('retorna 404 para username inexistente (fixture)', () => {
      cy.fixture('user').then(({ notFoundUsername }) => {
        cy.deleteUser(notFoundUsername).then((res) => {
          expect(res.status).to.eq(404);
        });
      });
    });
  });
});
