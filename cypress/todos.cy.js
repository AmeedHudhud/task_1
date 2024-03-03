/**
 * this test cases to check this page "https://example.cypress.io/todo#/"
 */
import * as todoshelper from '../cypress/support/todoshelper'

describe('test cases for todos', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/todo#/');
       })
    it.only('Verify the list contains two default tasks', () => {
        todoshelper.visability(todoshelper.LOCATORS.todoList,true)
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ALL)
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.DEFAULTTASKS.Task1,Exist:true},{name:todoshelper.DEFAULTTASKS.Task2,Exist:true}])
    })
    it('add new task and verify it is added', () => {

        todoshelper.addTaskToList([todoshelper.TASKS.Task1])
        todoshelper.displayAndSwitchTaskType(todoshelper.TASK_TYPE.ALL)
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.TASKS.Task1,Exist:true}])
        todoshelper.checkListLength(3, todoshelper.TASK_TYPE.ALL)
    })
    it('Verify no empty task will added to list when plain text empty ', () => {
        todoshelper.addTaskToList([' '])
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ALL)
    })

    //bug
    //Adding Task to List via Plain Text Entry and "All" Button Functionality
    it.skip('insert task on click "All" Button', () => {
        todoshelper.addTaskToList([todoshelper.TASKS.Task1])
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ALL)
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Active" Button Functionality
    it.skip('insert task on click "Active" Button', () => {
        todoshelper.addTaskToList([todoshelper.TASKS.Task1])
        todoshelper.displayAndSwitchTaskType(todoshelper.TASK_TYPE.ACTIVE)
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ACTIVE)
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Completed" Button Functionality
    it.skip('insert task on click "Completed" Button', () => {
        todoshelper.addTaskToList([todoshelper.TASKS.Task1])
        todoshelper.displayAndSwitchTaskType(todoshelper.TASK_TYPE.COMPLETED)
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ALL)
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Clear completed" Button Functionality
    it.skip('insert task on click "clear completed" Button', () => {
        todoshelper.addTaskToList([tasks.Task1,todoshelper.TASKS.Task2])
        todoshelper.changeTasksStatus([{name:todoshelper.TASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED}])
        todoshelper.clearTasks()
        todoshelper.checkListLength(3, todoshelper.TASK_TYPE.ALL)
    })
    it('verify change task name', () => {
        todoshelper.changeTaskName(todoshelper.DEFAULTTASKS.Task1, todoshelper.TASKS.Task1)
        todoshelper.displayAndSwitchTaskType(todoshelper.TASK_TYPE.ALL)
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.DEFAULTTASKS.Task1,Exist:false}])
    })
    it('Verify "All" button will contain all task', () => {
        todoshelper.addTaskToList([todoshelper.TASKS.Task1])
        todoshelper.changeTasksStatus([{name:todoshelper.TASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED}])
        todoshelper.checkListLength(3, todoshelper.TASK_TYPE.ALL)
    })
    it('verify "active" button will contain all active task ', () => {
        todoshelper.addTaskToList([todoshelper.TASKS.Task1,todoshelper.TASKS.Task2])
        todoshelper.changeTasksStatus([{name:todoshelper.TASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED}])
        todoshelper.checkListLength(3, todoshelper.TASK_TYPE.ACTIVE)
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it.skip('Verify Active task empty when all task is completed (bug)', () => {
        changeTasksStatus([{name:todoshelper.DEFAULTTASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED},{name:todoshelper.DEFAULTTASKS.Task2,status:todoshelper.TASK_TYPE.COMPLETED}])
        checkListLength(0, todoshelper.TASK_TYPE.ACTIVE)
    });
    it('Verify "completed" button will contain all completed task', () => {
        todoshelper.addTaskToList([todoshelper.TASKS.Task1,todoshelper.TASKS.Task2])
        todoshelper.changeTasksStatus([{name:todoshelper.TASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED},{name:todoshelper.TASKS.Task2,status:todoshelper.TASK_TYPE.COMPLETED}])
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.COMPLETED)
        todoshelper.displayAndSwitchTaskType(todoshelper.TASK_TYPE.COMPLETED)
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.TASKS.Task1,Exist:true},{name:todoshelper.TASKS.Task2,Exist:true}])
    })
    it('Verify completed task empty when all task is active', () => {
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ALL)
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ACTIVE)
        todoshelper.checkListLength(0, todoshelper.TASK_TYPE.COMPLETED)
    })
    it('Verify Hidden Task Upon Changing State to Completed in Active Tasks List', () => {
        todoshelper.displayAndSwitchTaskType(todoshelper.TASK_TYPE.ACTIVE)
        todoshelper.changeTasksStatus([{name:todoshelper.DEFAULTTASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED}])
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.DEFAULTTASKS.Task1,Exist:false}])
        todoshelper.displayAndSwitchTaskType(todoshelper.TASK_TYPE.COMPLETED)
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.DEFAULTTASKS.Task1,Exist:true}])
    })
    it('Verify Hidden Task Upon Changing State to Active in Completed Tasks List', () => {
        todoshelper.addTaskToList([todoshelper.TASKS.Task1])
        todoshelper.changeTasksStatus([{name:todoshelper.DEFAULTTASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED},{name:todoshelper.TASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED}])
        todoshelper.displayAndSwitchTaskType(todoshelper.TASK_TYPE.COMPLETED)
        todoshelper.changeTasksStatus([{name:todoshelper.TASKS.Task1,status:todoshelper.TASK_TYPE.ACTIVE}])
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.TASKS.Task1,Exist:false}])
        todoshelper.displayAndSwitchTaskType(todoshelper.TASK_TYPE.ACTIVE)
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.TASKS.Task1,Exist:true}])
    })
    it('Verify the "Clear completed" button will be hidden when all data in list is active', () => {
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ALL)
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ACTIVE)
        todoshelper.checkElementAttribute('.clear-completed', 'have.css', 'display', 'none')
    })
    it('Verify the "Clear completed" button will be unhidden when exist completed data in list', () => {
        todoshelper.changeTasksStatus([{name:todoshelper.DEFAULTTASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED}])
        todoshelper.checkElementAttribute('.clear-completed', 'have.css', 'display', 'block')
    })
    it('Delete more than one completed task and verify all task deleted from list', () => {
        todoshelper.addTaskToList([todoshelper.TASKS.Task1])
        todoshelper.changeTasksStatus([{name:todoshelper.DEFAULTTASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED},{name:todoshelper.TASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED}])
        todoshelper.clearTasks()
        todoshelper.checkListLength(1, todoshelper.TASK_TYPE.ALL)
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.DEFAULTTASKS.Task1,Exist:false},{name:todoshelper.TASKS.Task1,Exist:false}])
    })
    it('Delete task when click "X" button', () => {
        todoshelper.clearTasks(todoshelper.DEFAULTTASKS.Task1)
        todoshelper.checkListLength(1, todoshelper.TASK_TYPE.ALL)
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.DEFAULTTASKS.Task1,Exist:false}])
    })
    it('Verify change state when click in checkbox from active to completed', () => {
        todoshelper.changeTasksStatus([{name:todoshelper.DEFAULTTASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED}])
        todoshelper.displayAndSwitchTaskType(todoshelper.TASK_TYPE.ACTIVE)
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.DEFAULTTASKS.Task1,Exist:false}])
        todoshelper.displayAndSwitchTaskType(todoshelper.TASK_TYPE.COMPLETED)
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.DEFAULTTASKS.Task1,Exist:true}])
    })
    it('Verify change state when click in checkbox from completed to active', () => {
        todoshelper.addTaskToList([todoshelper.TASKS.Task1])
        todoshelper.changeTasksStatus([{name:todoshelper.DEFAULTTASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED},{name:todoshelper.TASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED}])
        todoshelper.changeTasksStatus([{name:todoshelper.DEFAULTTASKS.Task1,status:todoshelper.TASK_TYPE.ACTIVE}])
        todoshelper.displayAndSwitchTaskType(todoshelper.TASK_TYPE.ACTIVE)
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.DEFAULTTASKS.Task1,Exist:true}])
        todoshelper.displayAndSwitchTaskType(todoshelper.TASK_TYPE.COMPLETED)
        todoshelper.verifyTheExisenceOfTasks([{name:todoshelper.DEFAULTTASKS.Task1,Exist:false}])
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it.skip('change all tasks to completed using button above checkboxs "toggle button" (bug)', () => {
        todoshelper.toggleClick()
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ALL)
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.COMPLETED)
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it.skip('change all tasks to active using button above checkboxs "toggle button" (bug)', () => {
        todoshelper.changeTasksStatus([{name:todoshelper.DEFAULTTASKS.Task1,status:todoshelper.TASK_TYPE.COMPLETED},{name:todoshelper.DEFAULTTASKS.Task2,status:todoshelper.TASK_TYPE.COMPLETED}])
        todoshelper.toggleClick()
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ALL)
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ACTIVE)
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it.skip('change all tasks to active using button above checkboxs "toggle button" (bug)', () => {
        todoshelper.toggleClick()
        todoshelper.toggleClick()
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ALL)
        todoshelper.checkListLength(2, todoshelper.TASK_TYPE.ACTIVE)
    })
})
