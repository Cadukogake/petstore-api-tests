describe('Store API', () => {
  context('GET /store/inventory - Inventário por status', () => {
    it('retorna mapa de status → quantidades com sucesso', () => {
      cy.getInventory().then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('object');
        expect(Object.keys(res.body).length).to.be.greaterThan(0);
      });
    });

    it('todos os valores do inventário são números não-negativos', () => {
      cy.getInventory().then((res) => {
        expect(res.status).to.eq(200);
        Object.values(res.body).forEach((count) => {
          expect(count).to.be.a('number');
          expect(count).to.be.gte(0);
        });
      });
    });

    it('o inventário contém pelo menos um dos status padrão da API', () => {
      cy.getInventory().then((res) => {
        expect(res.status).to.eq(200);
        const keys = Object.keys(res.body);
        const statusPadrao = ['available', 'pending', 'sold'];
        const temStatusPadrao = statusPadrao.some((s) => keys.includes(s));
        expect(temStatusPadrao).to.be.true;
      });
    });
  });
});
