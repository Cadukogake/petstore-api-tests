# Petstore API Tests

Testes automatizados de API para a [Swagger Petstore](https://petstore.swagger.io), cobrindo os endpoints de **Pet**, **Store** e **User** com fluxos CRUD, cenários negativos e casos de segurança.

## Tecnologias

- [Cypress 14](https://www.cypress.io/) — framework de testes
- [@faker-js/faker](https://fakerjs.dev/) — geração de dados dinâmicos
- [dayjs](https://day.js.org/) — formatação de datas no relatório
- [md-to-pdf](https://github.com/simonhaenisch/md-to-pdf) — geração de relatório PDF após a execução

## Pré-requisitos

- Node.js 18+
- npm 9+

## Instalação

```bash
npm install
```

## Executando os testes

| Comando | Descrição |
|---|---|
| `npm test` | Executa todos os testes em modo headless |
| `npm run test:open` | Abre o Cypress Test Runner interativo |

## Estrutura do projeto

```
cypress/
├── e2e/
│   ├── pet/          # Testes do endpoint /pet
│   ├── store/        # Testes do endpoint /store
│   └── user/         # Testes do endpoint /user
├── fixtures/         # Dados estáticos de referência (pet, order, user)
├── reports/          # Relatórios gerados após cada execução (MD + PDF)
└── support/
    ├── commands.js       # Custom commands Cypress (createPet, createOrder, etc.)
    ├── data_utils.js     # Factories de dados com Faker
    ├── e2e.js            # Arquivo de suporte global
    └── report_generator.js  # Gerador de relatório MD/PDF
cypress.config.js     # Configuração do Cypress e task de upload multipart
cypress.env.json      # Variáveis de ambiente (BASE_URL)
```

## Cobertura de testes

### Pet (`/pet`)
| Arquivo | Endpoint |
|---|---|
| `addPet.cy.js` | `POST /pet` |
| `updatePet.cy.js` | `PUT /pet` |
| `getPetById.cy.js` | `GET /pet/{petId}` |
| `deletePet.cy.js` | `DELETE /pet/{petId}` |
| `findPetsByStatus.cy.js` | `GET /pet/findByStatus` |
| `findPetsByTags.cy.js` | `GET /pet/findByTags` |
| `updatePetWithForm.cy.js` | `POST /pet/{petId}` (form data) |
| `uploadPetFile.cy.js` | `POST /pet/{petId}/uploadFile` |

### Store (`/store`)
| Arquivo | Endpoint |
|---|---|
| `getInventory.cy.js` | `GET /store/inventory` |
| `createOrder.cy.js` | `POST /store/order` |
| `getOrderById.cy.js` | `GET /store/order/{orderId}` |
| `deleteOrder.cy.js` | `DELETE /store/order/{orderId}` |

### User (`/user`)
| Arquivo | Endpoint |
|---|---|
| `createUser.cy.js` | `POST /user` |
| `createUsersWithArray.cy.js` | `POST /user/createWithArray` |
| `createUsersWithList.cy.js` | `POST /user/createWithList` |
| `loginUser.cy.js` | `GET /user/login` |
| `logoutUser.cy.js` | `GET /user/logout` |
| `getUserByUsername.cy.js` | `GET /user/{username}` |
| `updateUser.cy.js` | `PUT /user/{username}` |
| `deleteUser.cy.js` | `DELETE /user/{username}` |

## Relatórios

Após cada execução via `npm test`, um relatório é gerado automaticamente em `cypress/reports/` nos formatos `.md` e `.pdf`, contendo:

- Status geral e duração total da execução
- Resumo com totais de testes passados, falhados, pendentes e ignorados
- Resultado detalhado por suite com status e duração de cada teste

## Variáveis de ambiente

O arquivo `cypress.env.json` define a URL base da API:

```json
{
  "BASE_URL": "https://petstore.swagger.io/v2"
}
```

Para apontar para outro ambiente, basta alterar o valor de `BASE_URL`.
