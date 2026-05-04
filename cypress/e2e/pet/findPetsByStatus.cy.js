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
  });
});
