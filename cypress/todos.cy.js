import {LOCATORS} from '../cypress/support/todoshelper'
import * as helper from '../cypress/support/todoshelper'
const tasks = {
    'Task1' : 'Pay electric bill',
    'Task2' : 'Walk the dog',
    'Task3' : 'new task',
    'Task4' : 'new task1'
}
const status = {
    'status1' : 'active',
    'status2' : 'completed'
}
describe('test cases for todos', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/todo#/');
       })
    it('Verify the list contains two default tasks', () => {
        cy.get(LOCATORS.todoList).should('be.visible');
        helper.checkListLength(2, 'all')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task1,Exist:true},{name:tasks.Task2,Exist:true}])
    })
    it('add new task and verify it is added', () => {
        helper.addTaskToList('new task{enter}')
        helper.displayAndSwitchTaskType('all')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task3,Exist:true}])
        helper.checkListLength(3, 'all')
    })
    it('Verify no empty task will added to list when plain text empty ', () => {
        helper.addTaskToList(' {enter}')
        helper.checkListLength(2, 'all')
    })

    //bug
    //Adding Task to List via Plain Text Entry and "All" Button Functionality
    it('insert using click "All" button (bug)', () => {
        helper.addTaskToList('new task')
        helper.checkListLength(2, 'all')
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Active" Button Functionality
    it('insert using click "Active" button" (bug)', () => {
        helper.addTaskToList('new task')
        helper.displayAndSwitchTaskType('active')
        helper.checkListLength(2, 'active')
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Completed" Button Functionality
    it('insert using click "Complete" button (bug)', () => {
        helper.addTaskToList('new task')
        helper.displayAndSwitchTaskType('completed')
        helper.checkListLength(2, 'all')
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Clear completed" Button Functionality
    it('insert using click "Clear completed" button (bug)', () => {
        helper.addTaskToList('new task {enter}')
        helper.changeTasksStatus([{name:tasks.Task3,status:status.status2}])
        helper.addTaskToList('new task1')
        helper.clearTasks()
        helper.checkListLength(3, 'all')
    })
    it('verify change task name', () => {
        helper.changeTaskName('Pay electric bill', 'new task')
        helper.displayAndSwitchTaskType('all')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task1,Exist:false}])
    })
    it('Verify "All" button will contain all task', () => {
        helper.addTaskToList('new task {enter}')
        helper.changeTasksStatus([{name:tasks.Task3,status:status.status2}])
        helper.checkListLength(3, 'all')
    })
    it('verify "active" button will contain all active task ', () => {
        helper.addTaskToList('new task {enter}')
        helper.addTaskToList('new task1 {enter}')
        helper.changeTasksStatus([{name:tasks.Task3,status:status.status2}])
        helper.checkListLength(3, 'active')
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it('Verify Active task empty when all task is completed (bug)', () => {
        changeTasksStatus([{name:tasks.Task1,status:status.status2},{name:tasks.Task2,status:status.status2}])
        checkListLength(0, 'active')
    });
    it('Verify "completed" button will contain all completed task', () => {
        helper.addTaskToList('new task {enter}')
        helper.addTaskToList('new task1 {enter}')
        helper.changeTasksStatus([{name:tasks.Task3,status:status.status2},{name:tasks.Task4,status:status.status2}])
        helper.checkListLength(2, 'completed')
        helper.displayAndSwitchTaskType('completed')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task3,Exist:true},{name:tasks.Task4,Exist:true}])
    })
    it('Verify completed task empty when all task is active', () => {
        helper.checkListLength(2, 'all')
        helper.checkListLength(2, 'active')
        helper.checkListLength(0, 'completed')
    })
    it('Verify Hidden Task Upon Changing State to Completed in Active Tasks List', () => {
        helper.displayAndSwitchTaskType('active')
        helper.changeTasksStatus([{name:tasks.Task1,status:status.status2}])
        helper.displayAndSwitchTaskType('active')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task1,Exist:false}])
        helper.displayAndSwitchTaskType('completed')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task1,Exist:true}])
    })
    it('Verify Hidden Task Upon Changing State to Active in Completed Tasks List', () => {
        helper.addTaskToList('new task {enter}')
        helper.changeTasksStatus([{name:tasks.Task1,status:status.status2},{name:tasks.Task3,status:status.status2}])
        helper.displayAndSwitchTaskType('completed')
        helper.changeTasksStatus([{name:tasks.Task3,status:status.status1}])
        helper.displayAndSwitchTaskType('completed')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task3,Exist:false}])
        helper.displayAndSwitchTaskType('active')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task3,Exist:true}])
    })
    it('Verify the "Clear completed" button will be hidden when all data in list is active', () => {
        helper.checkListLength(2, 'all')
        helper.checkListLength(2, 'active')
        helper.checkElementAttribute('.clear-completed', 'have.css', 'display', 'none')
    })
    it('Verify the "Clear completed" button will be unhidden when exist completed data in list', () => {
        helper.changeTasksStatus([{name:tasks.Task1,status:status.status2}])
        helper.checkElementAttribute('.clear-completed', 'have.css', 'display', 'block')
    })
    it('Delete more than one completed task and verify all task deleted from list', () => {
        helper.addTaskToList('new task {enter}')
        helper.changeTasksStatus([{name:tasks.Task1,status:status.status2},{name:tasks.Task3,status:status.status2}])
        helper.clearTasks()
        helper.checkListLength(1, 'all')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task1,Exist:false},{name:tasks.Task3,Exist:false}])
    })
    it('Delete task when click "X" button', () => {
        helper.clearTasks('Pay electric bill')
        helper.checkListLength(1, 'all')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task1,Exist:false}])
    })
    it('Verify change state when click in checkbox from active to completed', () => {
        helper.changeTasksStatus([{name:tasks.Task1,status:status.status2}])
        helper.displayAndSwitchTaskType('active')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task1,Exist:false}])
        helper.displayAndSwitchTaskType('completed')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task1,Exist:true}])
    })
    it('Verify change state when click in checkbox from completed to active', () => {
        helper.addTaskToList('new task{enter}')
        helper.changeTasksStatus([{name:tasks.Task1,status:status.status2},{name:tasks.Task3,status:status.status2}])
        helper.changeTasksStatus([{name:tasks.Task1,status:status.status1}])
        helper.displayAndSwitchTaskType('active')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task1,Exist:true}])
        helper.displayAndSwitchTaskType('completed')
        helper.verifyTheExisenceOfTasks([{name:tasks.Task1,Exist:false}])
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it('change all tasks to completed using button above checkboxs "toggle button" (bug)', () => {
        helper.toggleClick()
        helper.checkListLength(2, 'all')
        helper.checkListLength(2, 'completed')
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it('change all tasks to active using button above checkboxs "toggle button" (bug)', () => {
        helper.changeTasksStatus([{name:tasks.Task1,status:status.status2},{name:tasks.Task2,status:status.status2}])
        helper.toggleClick()
        helper.checkListLength(2, 'all')
        helper.checkListLength(2, 'active')
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it('change all tasks to active using button above checkboxs "toggle button" (bug)', () => {
        helper.toggleClick()
        helper.toggleClick()
        helper.checkListLength(2, 'all')
        helper.checkListLength(2, 'active')
    })
})
