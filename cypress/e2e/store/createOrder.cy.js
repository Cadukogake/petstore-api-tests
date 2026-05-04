describe('Store API', () => {
  context('POST /store/order - Criar pedido', () => {
    it('cria um pedido com sucesso e retorna o objeto Order', () => {
      cy.createOrder().then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('petId');
        expect(['placed', 'approved', 'delivered']).to.include(res.body.status);
      });
    });
  });
});
