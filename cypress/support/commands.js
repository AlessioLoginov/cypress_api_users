Cypress.Commands.add('createUser', (baseURL, user) => {
    cy.request('POST', `${baseURL}/`, user)
      .then(result => {
        expect(result.status).eq(200);
        expect(result.body).eqls({
          "code": 200,
          "type": "unknown",
          "message": `${user.id}`
        });
      });
  });
  
  Cypress.Commands.add('deleteUser', (baseURL, username) => {
    cy.request('DELETE', `${baseURL}/${username}`)
      .then(result => {
        expect(result.status).eq(200);
        expect(result.body).eqls({
          code: 200,
          type: "unknown",
          message: `${username}`
        });
      });
  });

  Cypress.Commands.add('updateUser', (baseURL, username, updatedUser) => {
    cy.request('PUT', `${baseURL}/${username}`, updatedUser)
      .then(result => {
        expect(result.status).eq(200);
        expect(result.body).eqls({
          "code": 200,
          "type": "unknown",
          "message": `${updatedUser.id}`
        });
      });
  });
  
  Cypress.Commands.add('verifyUser', (baseURL, username, expectedUser) => {
    cy.request(`${baseURL}/${username}`)
      .then(result => {
        expect(result.status).eq(200);
        expect(result.body).eqls(expectedUser);
      });
  });

  Cypress.Commands.add('verifyUserAbsence', (baseURL, username) => {
    cy.request({
      url: `${baseURL}/${username}`,
      method: 'GET',
      failOnStatusCode: false
    })
      .then(result => {
        expect(result.status).eq(404);
        expect(result.body).eqls({
          code: 1,
          type: "error",
          message: "User not found"
        });
      });
  });
  
  
  
  
