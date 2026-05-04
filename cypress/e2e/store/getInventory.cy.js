describe('Store API', () => {
  context('GET /store/inventory - Inventário por status', () => {
    it('retorna mapa de status → quantidades com sucesso', () => {
      cy.getInventory().then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('object');
        expect(Object.keys(res.body).length).to.be.greaterThan(0);
      });
    });
  });
});
