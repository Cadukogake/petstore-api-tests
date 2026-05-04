describe('Store API', () => {
  context('GET /store/order/{orderId} - Buscar pedido por ID', () => {
    it('cria pedido e busca pelo ID retornado pela API', () => {
      cy.createOrder().then((createRes) => {
        const orderId = createRes.body.id;
        cy.getOrderById(orderId).then((res) => {
          expect(res.status).to.eq(200);
          expect(res.body.id).to.eq(orderId);
        });
      });
    });

    it('retorna 404 para ID de pedido inexistente (fixture)', () => {
      cy.fixture('order').then(({ notFoundId }) => {
        cy.getOrderById(notFoundId).then((res) => {
          expect(res.status).to.eq(404);
        });
      });
    });

    it('retorna 400 para ID de pedido com valor inválido (fixture)', () => {
      cy.fixture('order').then(({ invalidId }) => {
        cy.getOrderById(invalidId).then((res) => {
          expect(res.status).to.eq(400);
        });
      });
    });
  });
});
