describe('User API', () => {
  context('GET /user/logout - Logout', () => {
    it('realiza logout com sucesso', () => {
      cy.logoutUser().then((res) => {
        expect(res.status).to.eq(200);
      });
    });

    it('retorna resposta com estrutura válida ao realizar logout sem sessão ativa', () => {
      cy.logoutUser();
      cy.logoutUser().then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('message');
      });
    });
  });
});
