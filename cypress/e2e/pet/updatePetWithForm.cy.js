describe('Pet API', () => {
  context('POST /pet/{petId} - Atualizar pet via form data', () => {
    let petId;

    beforeEach(() => {
      cy.createPet().then((res) => {
        petId = res.body.id;
      });
    });

    afterEach(() => {
      cy.deletePet(petId);
    });

    it('atualiza nome e status via form data com sucesso', () => {
      cy.updatePetWithForm(petId, { name: 'NomeViaForm', status: 'pending' }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });
});
