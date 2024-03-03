/**
 * @param {number} length - length of list  
 * @param {text} type - all , active , completed 
 */
export const checkListLength = (length, type) => {
  displayAndSwitchTaskType(type)
  cy.get(LOCATORS.rowsOfTheList)
    .should('have.length', length);
}
/**
 * @param {text} type - all , active , completed 
 */
export const displayAndSwitchTaskType = (type) => {
  if (type == 'all') {
    cy.get(LOCATORS.allButton)
      .click()
  } else {
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
/**
 * @param {arrrayoftext(task)} taskName
 */
export const addTaskToList = (taskName) => {

  taskName.forEach(task => {
      cy.get(LOCATORS.textField)
        .clear()
        .type(`${task}{enter}`)
  })
}
/**
 * @param {Text} oldName - previous name of task  
 * @param {Text} newName - the new name of task 
 */
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
/**
 * @param {Text} element - class of element OR id of element OR ....  
 * @param {Text} haveTypre - have.css
 * @param {Text} attributName - display
 * @param {Text} attributeValue - none  
 */
export const checkElementAttribute = (element, haveType, attributName, attributeValue) => {
  cy.get(element)
    .should(haveType, attributName, attributeValue)
}
/**
 * @param {arrray of object contain text(task name) and expected status(completed or active)} taskName
 */
export const changeTasksStatus = (taskName) => {
  taskName.forEach(task => {
    if (task.status == 'completed') {
      cy.contains(task.name).parent().find('input').check()
    }
    else {
      cy.contains(task.name).parent().find('input').uncheck()
    }
  });
}
/**
 * @param {arrray of object contain text(task name) and boolean => TRUE for contain and FALSE for not contain } taskName
 */
export const verifyTheExisenceOfTasks = (taskName) => {
  taskName.forEach(task => {
    let x = task.Exist ? 'contain' : 'not.contain'
    cy.get(LOCATORS.todoList).should(x, task.name);
  });
}
/**
 * @param {Text} element - class of element OR id of element OR ....  
 * @param {boolean} exist - true for visable , false for not visable
 */
export const visability = (element,exist) => {
  let x = exist ? 'be.visible' : 'not.be.visible'
  cy.get(element).should(x);
}
export const LOCATORS = {
  todoList: '.todo-list',
  rowsOfTheList: '.todo-list li',
  allButton: '.filters [href="#/"]',
  clearButton: '.clear-completed',
  xButton: '.destroy',
  textField: '.new-todo',
  edit: '.edit',
  toggleButton: '.main [for="toggle-all"]'
};
export const DEFAULTTASKS = {
  'Task1' : 'Pay electric bill',
  'Task2' : 'Walk the dog',
}
export const TASKS = {
  'Task1' : 'new task',
  'Task2' : 'new task1'
}
export const TASK_TYPE = {
  ACTIVE : 'active',
  COMPLETED : 'completed',
  ALL : 'all'
}