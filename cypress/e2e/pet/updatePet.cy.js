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

    it('retorna 404 ao tentar atualizar pet com ID inexistente (fixture)', () => {
      cy.fixture('pet').then(({ notFoundId }) => {
        cy.updatePet(notFoundId, { name: 'PetFantasma' }).then((res) => {
          expect(res.status).to.eq(404);
        });
      });
    });

    it('retorna 400 ao tentar atualizar pet com ID de tipo inválido (fixture)', () => {
      cy.fixture('pet').then(({ invalidId }) => {
        cy.updatePet(invalidId, { name: 'PetInvalido' }).then((res) => {
          expect(res.status).to.eq(400);
        });
      });
    });

    it('não retorna 500 ao atualizar nome do pet com SQL injection', () => {
      cy.updatePet(petId, { name: "'; DROP TABLE pets; --" }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });

    it('não retorna 500 ao atualizar nome do pet com 5000 caracteres', () => {
      cy.updatePet(petId, { name: 'a'.repeat(5000) }).then((res) => {
        expect(res.status).to.be.oneOf([200, 400]);
      });
    });
  });
});
