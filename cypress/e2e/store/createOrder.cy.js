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

    it('retorna 400 ao criar pedido com status inválido', () => {
      cy.createOrder({ status: 'status_invalido' }).then((res) => {
        expect(res.status).to.eq(400);
      });
    });

    it('não retorna 500 ao criar pedido com quantidade negativa', () => {
      cy.createOrder({ quantity: -1 }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao criar pedido com quantidade zero', () => {
      cy.createOrder({ quantity: 0 }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao criar pedido com quantidade máxima (MAX_INT)', () => {
      cy.createOrder({ quantity: 2147483647 }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao criar pedido com SQL injection no campo status', () => {
      cy.createOrder({ status: "'; DROP TABLE orders; --" }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });
  });
});
