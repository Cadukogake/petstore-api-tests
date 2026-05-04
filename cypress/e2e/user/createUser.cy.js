describe('User API', () => {
  context('POST /user - Criar usuário', () => {
    it('cria um usuário e retorna code 200', () => {
      cy.createUser().then(({ response }) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('code');
      });
    });
  });
});
