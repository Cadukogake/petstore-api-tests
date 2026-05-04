describe('User API', () => {
  context('POST /user/createWithArray - Criar lista via array', () => {
    it('cria múltiplos usuários via array com sucesso', () => {
      cy.createUsersWithArray(3).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });
});
