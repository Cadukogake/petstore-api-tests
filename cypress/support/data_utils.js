import { faker } from '@faker-js/faker';

export function generatePet(overrides = {}) {
  return {
    id: faker.number.int({ min: 1, max: 999999 }),
    category: {
      id: faker.number.int({ min: 1, max: 100 }),
      name: faker.animal.type()
    },
    name: faker.animal.dog(),
    photoUrls: [faker.image.url()],
    tags: [{ id: faker.number.int({ min: 1, max: 100 }), name: faker.word.noun() }],
    status: faker.helpers.arrayElement(['available', 'pending', 'sold']),
    ...overrides
  };
}

export function generateOrder(overrides = {}) {
  return {
    id: faker.number.int({ min: 1, max: 10 }),
    petId: faker.number.int({ min: 1, max: 999999 }),
    quantity: faker.number.int({ min: 1, max: 10 }),
    shipDate: faker.date.future().toISOString(),
    status: faker.helpers.arrayElement(['placed', 'approved', 'delivered']),
    complete: faker.datatype.boolean(),
    ...overrides
  };
}

export function generateUser(overrides = {}) {
  return {
    id: faker.number.int({ min: 1, max: 999999 }),
    username: faker.internet.username(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    userStatus: 0,
    ...overrides
  };
}
