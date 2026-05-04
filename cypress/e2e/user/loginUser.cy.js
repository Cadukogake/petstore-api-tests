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

    it('não retorna 500 ao tentar login com SQL injection no username', () => {
      cy.loginUser("' OR '1'='1'; --", 'qualquerSenha').then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao tentar login com SQL injection na senha', () => {
      cy.loginUser('usuario_teste', "' OR '1'='1'; --").then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao tentar login com username de 5000 caracteres', () => {
      cy.loginUser('a'.repeat(5000), 'senha123').then((res) => {
        expect(res.status).to.be.oneOf([200, 400, 414]);
      });
    });
  });
});
