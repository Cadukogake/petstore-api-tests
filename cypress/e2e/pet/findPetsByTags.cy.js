describe('Pet API', () => {
  context('GET /pet/findByTags - Buscar por tags', () => {
    it('retorna array de pets para tag válida', () => {
      cy.findPetsByTags(['tag1']).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('array');
      });
    });

    it('retorna 400 ao buscar sem informar o parâmetro tags', () => {
      cy.request({
        method: 'GET',
        url: `${Cypress.env('BASE_URL')}/pet/findByTags`,
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
      });
    });
  });
});
