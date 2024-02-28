//type : all,active,completed
const checkListLength = (length, type) => {//edit
    displayAndSwitchTaskType(type)
    cy.get('.todo-list li')
      .should('have.length', length);
}
//type : all,active,completed
const displayAndSwitchTaskType = (type) => {//edit
   
    if (type == 'all') {
        cy.get('.filters [href="#/"]')
          .click()
    }else{
        cy.get(`.filters [href="#/${type}"]`)
          .click()
    }
}
const clearTasks = (taskName = null) => {
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
const addTaskToList = (taskName) => {//edit
    cy.get('.new-todo')
      .clear()
      .type(taskName)
}
const changeTaskName = (oldName, newName) => {
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
const toggleClick = () => {
    cy.get('.main [for="toggle-all"]')
      .click()
}
const checkElementAttribute = (element, shouldType, attributName, attributeValue) => {
    cy.get(element)
      .should(shouldType, attributName, attributeValue)
}
const changeTasksStatus = (taskName, status) => {
    displayAndSwitchTaskType('all')
    cy.wrap(taskName).then((name) => {
        for (let i = 0; i < name.length; i++) {
            if (status == 'completed') {
                cy.contains(taskName[i]).parent().find('input').check()
            } else {
                cy.contains(taskName[i]).parent().find('input').uncheck()
            }
        }
    })
}
const verifyTheExisenceOfTasks = (taskName, isExist) => {//edit
    let x = isExist ? 'contain' : 'not.contain'
    taskName.forEach(task => {
        cy.get('.todo-list').should(x, task.name);
      });
}
const verifyTheExisenceOfTaskANOTHERWAY = (taskName) => {//edit
    taskName.forEach(task => {
        let x = task.Exist ? 'contain' : 'not.contain'
        cy.get('.todo-list').should(x, task.name);
      });
}


describe('test cases for todos', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/todo#/');
    })
    it('Verify the list contains two default tasks', () => {
        cy.get('.todo-list').should('be.visible');
        checkListLength(2, 'all')
        verifyTheExisenceOfTasks([{name:'Pay electric bill'},{name:'Walk the dog'}],true)
        // verifyTheExisenceOfTask2([{name:'Pay electric bill',Exist:true},{name:'Walk the dog',Exist:true}])
    })
    it('add new task and verify it is added', () => {
        addTaskToList('new task{enter}')
        verifyTheExisenceOfTasks([{name:'new task'}],true)
        checkListLength(3, 'all')
    })
    it('Verify no empty task will added to list when plain text empty ', () => {
        addTaskToList(' {enter}')
        checkListLength(2, 'all')
    })

    //bug
    //Adding Task to List via Plain Text Entry and "All" Button Functionality
    it('insert using click "All" button (bug)', () => {
        addTaskToList('new task')
        checkListLength(2, 'all')
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Active" Button Functionality
    it('insert using click "Active" button" (bug)', () => {
        addTaskToList('new task')
        displayAndSwitchTaskType('active')
        checkListLength(2, 'active')
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Completed" Button Functionality
    it('insert using click "Complete" button (bug)', () => {
        addTaskToList('new task')
        displayAndSwitchTaskType('completed')
        checkListLength(2, 'all')
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Clear completed" Button Functionality
    it('insert using click "Clear completed" button (bug)', () => {
        addTaskToList('new task {enter}')
        changeTasksStatus(['new task'],'completed')
        addTaskToList('new task1')
        clearTasks()
        checkListLength(3, 'all')
    })
    it('verify change task name', () => {
        changeTaskName('Pay electric bill', 'new task')
        displayAndSwitchTaskType('all')
        verifyTheExisenceOfTasks([{name:'Pay electric bill'}],false)
    })
    it('Verify "All" button will contain all task', () => {
        addTaskToList('new task {enter}')
        changeTasksStatus(['new task'],'completed')
        checkListLength(3, 'all')
    })
    it('verify "active" button will contain all active task ', () => {
        addTaskToList('new task {enter}')
        addTaskToList('new task1 {enter}')
        changeTasksStatus(['new task'],'completed')
        checkListLength(3, 'active')
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it('Verify Active task empty when all task is completed (bug)', () => {
        changeTasksStatus(['Pay electric bill','Walk the dog'],'completed')
        checkListLength(0, 'active')
    });
    it('Verify "completed" button will contain all completed task', () => {
        addTaskToList('new task {enter}')
        addTaskToList('new task1 {enter}')
        changeTasksStatus(['new task','new task1'],'completed')
        checkListLength(2, 'completed')
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTasks([{name:'new task'},{name:'new task1'}],true)
    })
    it('Verify completed task empty when all task is active', () => {
        checkListLength(2, 'all')
        checkListLength(2, 'active')
        checkListLength(0, 'completed')
    })
    it('Verify Hidden Task Upon Changing State to Completed in Active Tasks List', () => {
        displayAndSwitchTaskType('active')
        changeTasksStatus(['Pay electric bill'],'completed')
        displayAndSwitchTaskType('active')
        verifyTheExisenceOfTasks([{name:'Pay electric bill'}],false)
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTasks([{name:'Pay electric bill'}],true)
    })
    it('Verify Hidden Task Upon Changing State to Active in Completed Tasks List', () => {
        addTaskToList('new task {enter}')
        changeTasksStatus(['new task','Pay electric bill'],'completed')
        displayAndSwitchTaskType('completed')
        changeTasksStatus(['new task'],'active')
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTasks([{name:'new task'}],false)
        displayAndSwitchTaskType('active')
        verifyTheExisenceOfTasks([{name:'new task'}],true)
    })
    it('Verify the "Clear completed" button will be hidden when all data in list is active', () => {
        checkListLength(2, 'all')
        checkListLength(2, 'active')
        checkElementAttribute('.clear-completed', 'have.css', 'display', 'none')
    })
    it('Verify the "Clear completed" button will be unhidden when exist completed data in list', () => {
        changeTasksStatus(['Pay electric bill'],'completed')
        checkElementAttribute('.clear-completed', 'have.css', 'display', 'block')
    })
    it('Delete more than one completed task and verify all task deleted from list', () => {
        addTaskToList('new task {enter}')
        changeTasksStatus(['Pay electric bill','new task'],'completed')
        clearTasks()
        checkListLength(1, 'all')
        verifyTheExisenceOfTasks([{name:'Pay electric bill'},{name:'new task'}],false)
    })
    it('Delete task when click "X" button', () => {
        clearTasks('Pay electric bill')
        checkListLength(1, 'all')
        verifyTheExisenceOfTasks([{name:'Pay electric bill'}],false)
    })
    it('Verify change state when click in checkbox from active to completed', () => {
        changeTasksStatus(['Pay electric bill'],'completed')
        displayAndSwitchTaskType('active')
        verifyTheExisenceOfTasks([{name:'Pay electric bill'}],false)
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTasks([{name:'Pay electric bill'}],true)
    })
    it('Verify change state when click in checkbox from completed to active', () => {
        addTaskToList('new task{enter}')
        changeTasksStatus(['Pay electric bill','new task'],'completed')
        changeTasksStatus(['Pay electric bill'],'active')
        displayAndSwitchTaskType('active')
        verifyTheExisenceOfTasks([{name:'Pay electric bill'}],true)
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTasks([{name:'Pay electric bill'}],false)
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it('change all tasks to completed using button above checkboxs "toggle button" (bug)', () => {
        toggleClick()
        checkListLength(2, 'all')
        checkListLength(2, 'completed')
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it('change all tasks to active using button above checkboxs "toggle button" (bug)', () => {
        changeTasksStatus(['Pay electric bill','Walk the dog'],'completed')
        toggleClick()
        checkListLength(2, 'all')
        checkListLength(2, 'active')
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it('change all tasks to active using button above checkboxs "toggle button" (bug)', () => {
        toggleClick()
        toggleClick()
        checkListLength(2, 'all')
        checkListLength(2, 'active')
    })
})
