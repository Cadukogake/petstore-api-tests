describe('Store API', () => {
  context('DELETE /store/order/{orderId} - Deletar pedido', () => {
    it('cria pedido e deleta pelo ID retornado pela API', () => {
      cy.createOrder().then((createRes) => {
        const orderId = createRes.body.id;
        cy.deleteOrder(orderId).then((res) => {
          expect(res.status).to.be.oneOf([200, 404]);
        });
      });
    });

    it('retorna 400 para ID inválido negativo (fixture)', () => {
      cy.fixture('order').then(({ invalidId }) => {
        cy.deleteOrder(invalidId).then((res) => {
          expect(res.status).to.eq(400);
        });
      });
    });
  });
});
