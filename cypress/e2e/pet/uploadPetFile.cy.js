describe('Pet API', () => {
  context('POST /pet/{petId}/uploadFile - Upload de imagem', () => {
    let petId;

    beforeEach(() => {
      cy.createPet().then((res) => {
        petId = res.body.id;
      });
    });

    afterEach(() => {
      cy.deletePet(petId);
    });

    it('envia metadata adicional e retorna 200 com ApiResponse', () => {
      cy.uploadPetFile(petId, { additionalMetadata: 'metadata de teste' }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('code');
        expect(res.body).to.have.property('message');
      });
    });

    it('retorna 404 ao tentar upload para pet inexistente (fixture)', () => {
      cy.fixture('pet').then(({ notFoundId }) => {
        cy.uploadPetFile(notFoundId, { additionalMetadata: 'metadata' }).then((res) => {
          expect(res.status).to.eq(404);
        });
      });
    });
  });
});
