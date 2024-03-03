export const checkListLength = (length, type) => {
  displayAndSwitchTaskType(type)
  cy.get(LOCATORS.rowsOfTheList)
    .should('have.length', length);
}
export const displayAndSwitchTaskType = (type) => {
  if (type == 'all') {
      cy.get(LOCATORS.allButton)
        .click()
  }else{
      cy.get(`.filters [href="#/${type}"]`)
        .click()
  }
}   
export const clearTasks = (taskName = null) => {
  if (taskName == null) {
      cy.get(LOCATORS.clearButton)
        .click()
  } else {
      cy.contains(taskName)
        .parent()
        .find(LOCATORS.xButton)
        .click({ force: true })
  }
}
export const addTaskToList = (taskName) => {
  cy.get(LOCATORS.textField)
    .clear()
    .type(taskName)
}
export const changeTaskName = (oldName, newName) => {
  cy.contains(oldName)
    .dblclick()
  // cy.contains('Pay electric bill').parentsUntil().eq(1).should('have.class','')
  cy.contains(oldName)
    .parent()
    .parent()
    .should('have.class', 'editing')
  cy.contains(oldName)
    .parent()
    .get(LOCATORS.edit)
    .clear()
    .type(newName)
}
export const toggleClick = () => {
  cy.get(LOCATORS.toggleButton)
    .click()
}
export const checkElementAttribute = (element, haveType, attributName, attributeValue) => {
  cy.get(element)
    .should(haveType, attributName, attributeValue)
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
      cy.get(LOCATORS.todoList).should(x, task.name);
    });
}
export const LOCATORS = {
    todoList: '.todo-list',
    rowsOfTheList : '.todo-list li',
    allButton : '.filters [href="#/"]',
    clearButton : '.clear-completed',
    xButton : '.destroy',
    textField : '.new-todo',
    edit : '.edit',
    toggleButton : '.main [for="toggle-all"]'
};