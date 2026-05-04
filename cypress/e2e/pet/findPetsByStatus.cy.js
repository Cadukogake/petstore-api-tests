describe('Pet API', () => {
  context('GET /pet/findByStatus - Buscar por status', () => {
    ['available', 'pending', 'sold'].forEach((status) => {
      it(`retorna array de pets com status '${status}'`, () => {
        cy.findPetsByStatus(status).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body).to.be.an('array');
        });
      });
    });

    it('retorna 400 para status inválido', () => {
      cy.findPetsByStatus('status_invalido').then((res) => {
        expect(res.status).to.eq(400);
      });
    });

    it('retorna 400 para status vazio', () => {
      cy.findPetsByStatus('').then((res) => {
        expect(res.status).to.eq(400);
      });
    });

    it('retorna 400 ao buscar com SQL injection no parâmetro status', () => {
      cy.findPetsByStatus("' OR '1'='1'; --").then((res) => {
        expect(res.status).to.eq(400);
      });
    });

    it('retorna 400 ao buscar com XSS no parâmetro status', () => {
      cy.findPetsByStatus('<script>alert(1)</script>').then((res) => {
        expect(res.status).to.eq(400);
      });
    });

    it('retorna 400 ao buscar com status de 5000 caracteres', () => {
      cy.findPetsByStatus('a'.repeat(5000)).then((res) => {
        expect(res.status).to.eq(400);
      });
    });
  });
});
