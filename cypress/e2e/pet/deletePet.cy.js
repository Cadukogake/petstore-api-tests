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

    it('retorna 400 ao tentar deletar pet com ID de tipo inválido (fixture)', () => {
      cy.fixture('pet').then(({ invalidId }) => {
        cy.deletePet(invalidId).then((res) => {
          expect(res.status).to.eq(400);
        });
      });
    });

    it('retorna 404 ao tentar deletar o mesmo pet duas vezes', () => {
      cy.deletePet(petId).then((first) => {
        expect(first.status).to.eq(200);
      });
      cy.deletePet(petId).then((second) => {
        expect(second.status).to.eq(404);
      });
    });
  });

  context('Segurança - DELETE /pet/{petId}', () => {
    it('não retorna 500 ao deletar pet com SQL injection no path', () => {
      cy.deletePet("'; DROP TABLE pets; --").then((res) => {
        expect(res.status).to.be.oneOf([400, 404]);
      });
    });

    it('não retorna 500 ao deletar pet com XSS no path', () => {
      cy.deletePet('<script>alert(1)</script>').then((res) => {
        expect(res.status).to.be.oneOf([400, 404]);
      });
    });
  });
});
