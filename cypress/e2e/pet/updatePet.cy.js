describe('Pet API', () => {
  context('PUT /pet - Atualizar pet existente', () => {
    let petId;

    beforeEach(() => {
      cy.createPet().then((res) => {
        petId = res.body.id;
      });
    });

    afterEach(() => {
      cy.deletePet(petId);
    });

    it('atualiza nome e status de um pet existente', () => {
      cy.updatePet(petId, { name: 'PetAtualizado', status: 'sold' }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.id).to.eq(petId);
        expect(res.body.name).to.eq('PetAtualizado');
        expect(res.body.status).to.eq('sold');
      });
    });
  });
});
