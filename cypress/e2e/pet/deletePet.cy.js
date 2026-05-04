describe('Pet API', () => {
  context('DELETE /pet/{petId} - Deletar pet', () => {
    let petId;

    beforeEach(() => {
      cy.createPet().then((res) => {
        petId = res.body.id;
      });
    });

    it('deleta um pet existente com sucesso', () => {
      cy.deletePet(petId).then((res) => {
        expect(res.status).to.eq(200);
      });
    });

    it('retorna 404 ao tentar deletar pet com ID inexistente (fixture)', () => {
      cy.fixture('pet').then(({ notFoundId }) => {
        cy.deletePet(notFoundId).then((res) => {
          expect(res.status).to.eq(404);
        });
      });
    });
  });
});
