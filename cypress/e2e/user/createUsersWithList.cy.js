describe('User API', () => {
  context('POST /user/createWithList - Criar lista via list', () => {
    it('cria múltiplos usuários via list com sucesso', () => {
      cy.createUsersWithList(3).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });
});
