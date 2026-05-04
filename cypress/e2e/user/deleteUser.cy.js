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

    it('retorna 404 ao tentar deletar o mesmo usuário duas vezes', () => {
      cy.deleteUser(createdUser.username).then((first) => {
        expect(first.status).to.eq(200);
      });
      cy.deleteUser(createdUser.username).then((second) => {
        expect(second.status).to.eq(404);
      });
    });
  });

  context('Segurança - DELETE /user/{username}', () => {
    it('não retorna 500 ao deletar usuário com SQL injection no path', () => {
      cy.deleteUser("' OR '1'='1").then((res) => {
        expect(res.status).to.be.oneOf([400, 404]);
      });
    });

    it('não retorna 500 ao deletar usuário com XSS no path', () => {
      cy.deleteUser('<script>alert(1)</script>').then((res) => {
        expect(res.status).to.be.oneOf([400, 404]);
      });
    });

    it('não retorna 500 ao deletar usuário com username de 5000 caracteres', () => {
      cy.deleteUser('a'.repeat(5000)).then((res) => {
        expect(res.status).to.be.oneOf([400, 404, 414]);
      });
    });
  });
});
