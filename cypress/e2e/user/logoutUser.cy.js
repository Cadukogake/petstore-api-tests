describe('User API', () => {
  context('GET /user/logout - Logout', () => {
    it('realiza logout com sucesso', () => {
      cy.logoutUser().then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });
});
