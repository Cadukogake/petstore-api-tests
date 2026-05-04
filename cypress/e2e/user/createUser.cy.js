describe('User API', () => {
  context('POST /user - Criar usuário', () => {
    it('cria um usuário e retorna code 200', () => {
      cy.createUser().then(({ response }) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('code');
      });
    });
    it('retorna 400 ao tentar fazer login com senha vazia para usuário recém-criado', () => {
      cy.createUser().then(({ userData }) => {
        cy.loginUser(userData.username, '').then((res) => {
          expect(res.status).to.eq(400);
        });
      });
    });
  });

  context('Segurança e limites - POST /user', () => {
    it('não retorna 500 ao criar usuário com username de 5000 caracteres', () => {
      cy.createUser({ username: 'a'.repeat(5000) }).then(({ response }) => {
        expect(response.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao criar usuário com SQL injection no username', () => {
      cy.createUser({ username: "admin'; DROP TABLE users; --" }).then(({ response }) => {
        expect(response.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao criar usuário com SQL injection no email', () => {
      cy.createUser({ email: "' OR '1'='1" }).then(({ response }) => {
        expect(response.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao criar usuário com XSS no firstName', () => {
      cy.createUser({ firstName: '<script>alert("xss")</script>' }).then(({ response }) => {
        expect(response.status).to.be.oneOf([200, 400]);
      });
    });
  });
});
