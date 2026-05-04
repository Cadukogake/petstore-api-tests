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

    it('retorna 404 para ID de pedido inexistente (fixture)', () => {
      cy.fixture('order').then(({ notFoundId }) => {
        cy.deleteOrder(notFoundId).then((res) => {
          expect(res.status).to.eq(404);
        });
      });
    });

    it('retorna 404 ao tentar deletar o mesmo pedido duas vezes', () => {
      cy.createOrder().then((createRes) => {
        const orderId = createRes.body.id;
        cy.deleteOrder(orderId).then((first) => {
          expect(first.status).to.be.oneOf([200, 404]);
        });
        cy.deleteOrder(orderId).then((second) => {
          expect(second.status).to.eq(404);
        });
      });
    });

    it('não retorna 500 ao deletar pedido com SQL injection no path', () => {
      cy.deleteOrder("'; DROP TABLE orders; --").then((res) => {
        expect(res.status).to.be.oneOf([400, 404]);
      });
    });
  });
});
