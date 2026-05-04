describe('Pet API', () => {
  context('GET /pet/{petId} - Buscar pet por ID', () => {
    let petId;

    beforeEach(() => {
      cy.createPet().then((res) => {
        petId = res.body.id;
      });
    });

    afterEach(() => {
      cy.deletePet(petId);
    });

    it('retorna o pet correto para um ID válido', () => {
      cy.getPetById(petId).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.id).to.eq(petId);
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('status');
      });
    });

    it('retorna 404 para ID de pet inexistente (fixture)', () => {
      cy.fixture('pet').then(({ notFoundId }) => {
        cy.getPetById(notFoundId).then((res) => {
          expect(res.status).to.eq(404);
        });
      });
    });

    it('retorna 400 para ID de pet com formato inválido (fixture)', () => {
      cy.fixture('pet').then(({ invalidId }) => {
        cy.getPetById(invalidId).then((res) => {
          expect(res.status).to.eq(400);
        });
      });
    });
  });
});
