
//type : all,active,completed
const checkListLength = (length,type) => {
    if(type=='all'){
        displayAndSwitchTaskType('all')
        cy.get('.todo-list li').should('have.length', length);
    }else if(type=='active'){
        displayAndSwitchTaskType('active')
        cy.get('.todo-list li').should('have.length', length);
    }
    else if(type=='completed'){
        displayAndSwitchTaskType('completed')
        cy.get('.todo-list li').should('have.length', length);
    }
}
//type : all,active,completed
const displayAndSwitchTaskType = (type) =>{
    if(type=='all'){
        cy.get('.todo-list li').get('[href="#/"]').click()
    }else if(type=='active'){
        cy.get('.todo-list li').get('[href="#/active"]').click()
    }else if(type=='completed'){
        cy.get('.todo-list li').get('[href="#/completed"]').click()
    }
}
const clearTasks = (taskname=null) => {
    if(taskname==null){
        cy.get('.clear-completed').click()
    }else{
        cy.contains(taskname).parent().find('.destroy').click({ force: true })
    }
}
const addTaskToList = (taskname) => {
    cy.get('.todo-list').get('.new-todo').type(taskname)
}
//status : active,completed ,, send current status
const changeTaskStatus = (taskname,status) => {
        displayAndSwitchTaskType('all')
        if(status=='completed'){
            cy.contains(taskname).parent().find('input').check()
        }else{
            cy.contains(taskname).parent().find('input').uncheck()
        }
}
const verifyTheExisenceOfTask = (taskname,option) => {
    if(option=='exist'){
        cy.get('.todo-list li').should('contain',taskname)
    }else if(option=='not exist'){
        cy.get('.todo-list li').should('not.contain',taskname)
    }
}
const changeTaskName = (oldname,newname) => {
    cy.contains(oldname).dblclick()
    cy.contains(oldname).parent().parent().should('have.class', 'editing')
    cy.contains(oldname).parent().get('.edit').clear().type(newname)
}
const toggleClick = () => {
    cy.get('.main [for="toggle-all"]').click()
}
const checkElementAttribute = (element,shouldtype,attribut_type,attribute_value) => {
    cy.get(element).should(shouldtype,attribut_type,attribute_value)
}
describe('test cases for todos', () => {
    beforeEach(()=>{
        cy.visit('https://example.cypress.io/todo#/');
    })
    it('Verify the list contains two default tasks', () => {
        cy.get('.todo-list').should('be.visible');
        checkListLength(2,'all')
            verifyTheExisenceOfTask('Pay electric bill','exist')
            verifyTheExisenceOfTask('Walk the dog','exist')
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed 
    it('add new task and verify it is added (bug)', () => {
        addTaskToList('new task{enter}')
        verifyTheExisenceOfTask('new task','exist')
        checkListLength(3,'all')
    })
    it('Verify no empty task will added to list when plain text empty ', () => {
        addTaskToList(' {enter}')
        checkListLength(2,'all')
    })

    //bug
    //Adding Task to List via Plain Text Entry and "All" Button Functionality
    it('insert using click "All" button (bug)', () => {
        addTaskToList('new task')
        checkListLength(2,'all')
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Active" Button Functionality
    it('insert using click "Active" button" (bug)', () => {
        addTaskToList('new task')
        displayAndSwitchTaskType('active')
        checkListLength(2,'active')
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Completed" Button Functionality
    it('insert using click "Complete" button (bug)', () => {
        addTaskToList('new task')
        displayAndSwitchTaskType('completed')
        checkListLength(2,'all')
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Clear completed" Button Functionality
    it('insert using click "Clear completed" button (bug)', () => {
        addTaskToList('new task {enter}')
        changeTaskStatus('new task','completed')
        addTaskToList('new task1')
        clearTasks()
        checkListLength(3,'all')
    })
    it('verify change task name', () => {
        changeTaskName('Pay electric bill','new task')
        verifyTheExisenceOfTask('Pay electric bill','all')
    })
    it('Verify "All" button will contain all task', () => {
        addTaskToList('new task {enter}')
        changeTaskStatus('new task','completed')
        checkListLength(3,'all')
    })
    it('verify "active" button will contain all active task ', () => {
        addTaskToList('new task {enter}')
        addTaskToList('new task1 {enter}')
        changeTaskStatus('new task','completed')
        checkListLength(3,'active')
    })
    
    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed 
    it('Verify Active task empty when all task is completed (bug)', () => {
        changeTaskStatus('Pay electric bill','completed')
        changeTaskStatus('Walk the dog','completed')
        checkListLength(0,'active')
    });
    it('Verify "completed" button will contain all completed task', () => {
        addTaskToList('new task {enter}')
        addTaskToList('new task1 {enter}')
        changeTaskStatus('new task','completed')
        changeTaskStatus('new task1','completed')
        checkListLength(2,'comleted')
        checkListLength(2,'active')
    })
    it('Verify completed task empty when all task is active', () => {
        checkListLength(2,'all')
        checkListLength(2,'active')
        checkListLength(0,'completed')
    })
    it('Verify Hidden Task Upon Changing State to Completed in Active Tasks List', () => {
        displayAndSwitchTaskType('active')
        changeTaskStatus('Pay electric bill','completed')
        displayAndSwitchTaskType('active')
        verifyTheExisenceOfTask('Pay electric bill','not exist')
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTask('Pay electric bill','exist')
    })
    it('Verify Hidden Task Upon Changing State to Active in Completed Tasks List', () => {
        addTaskToList('new task {enter}')
        changeTaskStatus('new task','completed')
        changeTaskStatus('Pay electric bill','completed')
        displayAndSwitchTaskType('completed')
        changeTaskStatus('new task','active')
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTask('new task','not exist')
        displayAndSwitchTaskType('active')
        verifyTheExisenceOfTask('new task','exist')
    })
    it('Verify the "Clear completed" button will be hidden when all data in list is active', () => {
        checkListLength(2,'all')
        checkListLength(2,'active')
        checkElementAttribute('.clear-completed','have.css','display','none')
    })
    it('Verify the "Clear completed" button will be unhidden when exist completed data in list', () => {
        changeTaskStatus('Pay electric bill','completed')
        checkElementAttribute('.clear-completed','have.css','display','block')
    })
    it('Delete more than one completed task and verify all task deleted from list', () => {
        addTaskToList('new task {enter}')
        changeTaskStatus('Pay electric bill','completed')
        changeTaskStatus('new task','completed')
        clearTasks()
        checkListLength(1,'all')
        verifyTheExisenceOfTask('Pay electric bill','not exist')
        verifyTheExisenceOfTask('new task','not exist')
    })
    it('Delete task when click "X" button', () => {
        clearTasks('Pay electric bill')
        checkListLength(1,'all')
        verifyTheExisenceOfTask('Pay electric bill','not exist')
    })
    it('Verify change state when click in checkbox from active to completed', () => {
        changeTaskStatus('Pay electric bill','completed')
        displayAndSwitchTaskType('active')
        verifyTheExisenceOfTask('Pay electric bill','not exist')
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTask('Pay electric bill','exist')
    })
    it('Verify change state when click in checkbox from completed to active', () => {
        addTaskToList('new task{enter}')
        changeTaskStatus('new task','completed')
        changeTaskStatus('Pay electric bill','completed')
        changeTaskStatus('Pay electric bill','active')
        displayAndSwitchTaskType('active')
        verifyTheExisenceOfTask('Pay electric bill','exist')
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTask('Pay electric bill','not exist')
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed 
    it('change all tasks to completed using button above checkboxs "toggle button" (bug)', () => {
        toggleClick()
        checkListLength(2,'all')
        checkListLength(2,'completed')
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed 
    it('change all tasks to active using button above checkboxs "toggle button" (bug)', () => {
        changeTaskStatus('Pay electric bill','completed')
        changeTaskStatus('Walk the dog','completed')
        toggleClick()
        checkListLength(2,'all')
        checkListLength(2,'active')
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it('change all tasks to active using button above checkboxs "toggle button" (bug)', () => {
        toggleClick()
        toggleClick()
        checkListLength(2,'all')
        checkListLength(2,'active')
    })
})