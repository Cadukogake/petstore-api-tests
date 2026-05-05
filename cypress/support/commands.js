import { generatePet, generateOrder, generateUser } from './data_utils';

const baseUrl = () => Cypress.env('BASE_URL');

// ─── Pet ─────────────────────────────────────────────────────────────────────

Cypress.Commands.add('createPet', (overrides = {}) => {
  const petData = generatePet(overrides);
  return cy.request({
    method: 'POST',
    url: `${baseUrl()}/pet`,
    body: petData,
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('updatePet', (petId, overrides = {}) => {
  const petData = generatePet({ id: petId, ...overrides });
  return cy.request({
    method: 'PUT',
    url: `${baseUrl()}/pet`,
    body: petData,
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('getPetById', (petId) => {
  return cy.request({
    method: 'GET',
    url: `${baseUrl()}/pet/${petId}`,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('deletePet', (petId) => {
  return cy.request({
    method: 'DELETE',
    url: `${baseUrl()}/pet/${petId}`,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('findPetsByStatus', (status) => {
  return cy.request({
    method: 'GET',
    url: `${baseUrl()}/pet/findByStatus`,
    qs: { status },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('findPetsByTags', (tags) => {
  return cy.request({
    method: 'GET',
    url: `${baseUrl()}/pet/findByTags`,
    qs: { tags },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('updatePetWithForm', (petId, formData = {}) => {
  return cy.request({
    method: 'POST',
    url: `${baseUrl()}/pet/${petId}`,
    form: true,
    body: formData,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('uploadPetFile', (petId, formData = {}, filePath = null) => {
  if (filePath) {
    return cy.task('uploadPetFileWithImage', {
      baseUrl: Cypress.env('BASE_URL'),
      petId,
      filePath,
      additionalMetadata: formData.additionalMetadata
    });
  }
  return cy.request({
    method: 'POST',
    url: `${baseUrl()}/pet/${petId}/uploadFile`,
    form: true,
    body: formData,
    failOnStatusCode: false
  });
});

// ─── Store ────────────────────────────────────────────────────────────────────

Cypress.Commands.add('getInventory', () => {
  return cy.request({
    method: 'GET',
    url: `${baseUrl()}/store/inventory`,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('createOrder', (overrides = {}) => {
  const orderData = generateOrder(overrides);
  return cy.request({
    method: 'POST',
    url: `${baseUrl()}/store/order`,
    body: orderData,
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('getOrderById', (orderId) => {
  return cy.request({
    method: 'GET',
    url: `${baseUrl()}/store/order/${orderId}`,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('deleteOrder', (orderId) => {
  return cy.request({
    method: 'DELETE',
    url: `${baseUrl()}/store/order/${orderId}`,
    failOnStatusCode: false
  });
});

// ─── User ─────────────────────────────────────────────────────────────────────

// POST /user não ecoa o objeto criado — retorna { response, userData } para que
// os testes possam referenciar o username gerado em chamadas subsequentes.
Cypress.Commands.add('createUser', (overrides = {}) => {
  const userData = generateUser(overrides);
  return cy.request({
    method: 'POST',
    url: `${baseUrl()}/user`,
    body: userData,
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false
  }).then((response) => cy.wrap({ response, userData }));
});

Cypress.Commands.add('createUsersWithArray', (count = 2) => {
  const users = Array.from({ length: count }, () => generateUser());
  return cy.request({
    method: 'POST',
    url: `${baseUrl()}/user/createWithArray`,
    body: users,
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('createUsersWithList', (count = 2) => {
  const users = Array.from({ length: count }, () => generateUser());
  return cy.request({
    method: 'POST',
    url: `${baseUrl()}/user/createWithList`,
    body: users,
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('loginUser', (username, password) => {
  return cy.request({
    method: 'GET',
    url: `${baseUrl()}/user/login`,
    qs: { username, password },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('logoutUser', () => {
  return cy.request({
    method: 'GET',
    url: `${baseUrl()}/user/logout`,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('getUserByUsername', (username) => {
  return cy.request({
    method: 'GET',
    url: `${baseUrl()}/user/${username}`,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('updateUser', (username, overrides = {}) => {
  const userData = generateUser({ username, ...overrides });
  return cy.request({
    method: 'PUT',
    url: `${baseUrl()}/user/${username}`,
    body: userData,
    headers: { 'Content-Type': 'application/json' },
    failOnStatusCode: false
  });
});

Cypress.Commands.add('deleteUser', (username) => {
  return cy.request({
    method: 'DELETE',
    url: `${baseUrl()}/user/${username}`,
    failOnStatusCode: false
  });
});
