export const checkListLength = (length, type) => {
  displayAndSwitchTaskType(type)
  cy.get('.todo-list li')
    .should('have.length', length);
}
export const displayAndSwitchTaskType = (type) => {
   
  if (type == 'all') {
      cy.get('.filters [href="#/"]')
        .click()
  }else{
      cy.get(`.filters [href="#/${type}"]`)
        .click()
  }
}   
export const clearTasks = (taskName = null) => {
  if (taskName == null) {
      cy.get('.clear-completed')
        .click()
  } else {
      cy.contains(taskName)
        .parent()
        .find('.destroy')
        .click({ force: true })
  }
}
export const addTaskToList = (taskName) => {
  cy.get('.new-todo')
    .clear()
    .type(taskName)
}
export const changeTaskName = (oldName, newName) => {
  cy.contains(oldName)
    .dblclick()
  //   cy.contains('Pay electric bill').parentsUntil().eq(1).should('have.class','')
  cy.contains(oldName)
    .parent()
    .parent()
    .should('have.class', 'editing')
  cy.contains(oldName)
    .parent()
    .get('.edit')
    .clear()
    .type(newName)
}
export const toggleClick = () => {
  cy.get('.main [for="toggle-all"]')
    .click()
}
export const checkElementAttribute = (element, shouldType, attributName, attributeValue) => {
  cy.get(element)
    .should(shouldType, attributName, attributeValue)
}
export const changeTasksStatus = (taskName) => {
  displayAndSwitchTaskType('all')

  taskName.forEach(task => {
      if(task.status=='completed'){
          cy.contains(task.name).parent().find('input').check()
      }
      else{
          cy.contains(task.name).parent().find('input').uncheck()
      }
    });
}
export const verifyTheExisenceOfTasks = (taskName) => {
  taskName.forEach(task => {
      let x = task.Exist ? 'contain' : 'not.contain'
      cy.get('.todo-list').should(x, task.name);
    });
}

export const LOCATORS = {
    todoList: '.todo-list',
    addButton: '.add-button',
  };

  