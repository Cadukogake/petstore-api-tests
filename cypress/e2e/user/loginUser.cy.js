describe('User API', () => {
  context('GET /user/login - Login', () => {
    it('realiza login com credenciais válidas e retorna token string', () => {
      cy.fixture('user').then(({ loginCredentials }) => {
        cy.loginUser(loginCredentials.username, loginCredentials.password).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.a('string');
        });
      });
    });

    it('retorna 400 para credenciais inválidas (strings vazias)', () => {
      cy.loginUser('', '').then((res) => {
        expect(res.status).to.eq(400);
      });
    });
  });
});
