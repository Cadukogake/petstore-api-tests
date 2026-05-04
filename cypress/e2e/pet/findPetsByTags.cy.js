describe('Pet API', () => {
  context('GET /pet/findByTags - Buscar por tags (deprecated)', () => {
    it('retorna array de pets filtrados por tag', () => {
      cy.findPetsByTags(['tag1']).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('array');
      });
    });
  });
});
