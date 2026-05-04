describe('Pet API', () => {
  context('POST /pet - Adicionar novo pet', () => {
    it('cria um novo pet com sucesso e retorna 200', () => {
      cy.createPet().then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.be.a('string');
        expect(res.body.photoUrls).to.be.an('array');
        expect(['available', 'pending', 'sold']).to.include(res.body.status);
      });
    });
  });
});
