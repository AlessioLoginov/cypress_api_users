describe('petstore api users', () => {
    let user;
    let updatedUser;
    let baseURL;
  
    beforeEach(() => {
      cy.fixture('userData.json').then(userData => {
        const timestamp = new Date().getTime();
        const randomValue = Math.floor(Math.random() * 10000);  // Генерация случайного значения от 0 до 9999
        user = userData.user;
        user.username += `-${timestamp}-${randomValue}`;  // Добавление миллисекунд и случайного значения к username
        
        updatedUser = userData.updatedUser;
        updatedUser.username += `-${timestamp}-${randomValue}`;  // Добавление миллисекунд и случайного значения к username
        
        baseURL = userData.baseURL;
      });
    });
  
    it('creates user', () => {
        cy.createUser(baseURL, user)
          .then(() => {
            cy.deleteUser(baseURL, user.username); // удаляем пользоввателя после проверки
          });
      });
  
      it('updates and reads user', () => {
        cy.createUser(baseURL, user)  // Создаем пользователя перед обновлением
          .then(() => {
            cy.updateUser(baseURL, user.username, updatedUser);
            cy.verifyUser(baseURL, updatedUser.username, updatedUser);
          })
          .then(() => {
            cy.deleteUser(baseURL, updatedUser.username);  // Удаляем пользователя после проверки
          });
      });
      
  
      it('deletes user', () => {
        cy.createUser(baseURL, user)  // Создаем пользователя перед удалением
          .then(() => {
            cy.deleteUser(baseURL, user.username)
              .then(() => {
                cy.verifyUserAbsence(baseURL, user.username);
              });
          });
      });
      
  });
  
  

