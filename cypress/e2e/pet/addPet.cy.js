describe('Pet API', () => {
  context('POST /pet - Adicionar novo pet', () => {
    it('cria um novo pet com sucesso e retorna 200', () => {
      cy.createPet().then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.be.a('string');
        expect(res.body.photoUrls).to.be.an('array');
        expect(['available', 'pending', 'sold']).to.include(res.body.status);
      });
    });

    it('retorna 405 ao criar pet sem o campo obrigatório photoUrls', () => {
      cy.request({
        method: 'POST',
        url: `${Cypress.env('BASE_URL')}/pet`,
        body: { name: 'PetSemFoto', status: 'available' },
        headers: { 'Content-Type': 'application/json' },
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(405);
      });
    });
  });

  context('Segurança e limites - POST /pet', () => {
    it('não retorna 500 ao criar pet com nome de 5000 caracteres', () => {
      cy.createPet({ name: 'a'.repeat(5000) }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao criar pet com SQL injection no nome', () => {
      cy.createPet({ name: "'; DROP TABLE pets; --" }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao criar pet com XSS no nome', () => {
      cy.createPet({ name: '<script>alert("xss")</script>' }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao criar pet com caracteres especiais no nome', () => {
      cy.createPet({ name: "!@#$%^&*()<>\"'`~" }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });
  });
});
