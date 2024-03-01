import {LOCATORS} from '../cypress/support/todoshelper'
import {checkListLength} from '../cypress/support/todoshelper'
import {displayAndSwitchTaskType} from '../cypress/support/todoshelper'
import {clearTasks} from '../cypress/support/todoshelper'
import {addTaskToList} from '../cypress/support/todoshelper'
import {changeTaskName} from '../cypress/support/todoshelper'
import {toggleClick} from '../cypress/support/todoshelper'
import {checkElementAttribute} from '../cypress/support/todoshelper'
import {changeTasksStatus} from '../cypress/support/todoshelper'
import {verifyTheExisenceOfTasks} from '../cypress/support/todoshelper'

const x = [{name:'Pay electric bill',Exist:true},{name:'Walk the dog',Exist:true}]
const x2 = [{name:'new task',Exist:true}]
const x3 = [{name:'new task',status:'completed'}]
const x4 = [{name:'Pay electric bill',Exist:false}]
const x5 = [{name:'Pay electric bill',status:'completed'},{name:'Walk the dog',status:'completed'}]
const x6 = [{name:'new task',status:'completed'},{name:'new task1',status:'completed'}]
const x7 = [{name:'new task',Exist:true},{name:'new task1',Exist:true}]
const x8 = [{name:'Pay electric bill',status:'completed'}]
const x9 = [{name:'Pay electric bill',Exist:true}]
const x10 = [{name:'Pay electric bill',status:'completed'},{name:'new task',status:'completed'}]
const x11 = [{name:'new task',status:'active'}]
const x12 = [{name:'new task',Exist:false}]
const x13 = [{name:'Pay electric bill',Exist:false},{name:'new task',Exist:false}]
const x14 = [{name:'Pay electric bill',status:'active'}]

// it.only('test',()=>{
//     cy.visit('https://example.cypress.io/todo#/');
//     // checkListLength(2,'all')
//     //     cy.log(qqq.todoList)
//     let x=[{name:'Pay electric bill',status:'completed'}]
//     changeTasksStatus(x)
       
// })
describe('test cases for todos', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/todo#/');
    })
    it.only('Verify the list contains two default tasks', () => {
        cy.get(LOCATORS.todoList).should('be.visible');
        checkListLength(2, 'all')
        verifyTheExisenceOfTasks(x)
    })
    it('add new task and verify it is added', () => {
        addTaskToList('new task{enter}')
        verifyTheExisenceOfTasks(x2)
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
        changeTasksStatus(x3)
        addTaskToList('new task1')
        clearTasks()
        checkListLength(3, 'all')
    })
    it('verify change task name', () => {////////////
        changeTaskName('Pay electric bill', 'new task')
        displayAndSwitchTaskType('all')
        verifyTheExisenceOfTasks(x4)
    })
    it('Verify "All" button will contain all task', () => {
        addTaskToList('new task {enter}')
        changeTasksStatus(x3)
        // changeTasksStatus(['new task'],'completed')
        checkListLength(3, 'all')
    })
    it('verify "active" button will contain all active task ', () => {
        addTaskToList('new task {enter}')
        addTaskToList('new task1 {enter}')
        changeTasksStatus(x3)
        // changeTasksStatus(['new task'],'completed')
        checkListLength(3, 'active')
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it('Verify Active task empty when all task is completed (bug)', () => {
        changeTasksStatus(x5)
        // changeTasksStatus(['Pay electric bill','Walk the dog'],'completed')
        checkListLength(0, 'active')
    });
    it('Verify "completed" button will contain all completed task', () => {
        addTaskToList('new task {enter}')
        addTaskToList('new task1 {enter}')
        changeTasksStatus(x6)
        // changeTasksStatus(['new task','new task1'],'completed')
        checkListLength(2, 'completed')
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTasks(x7)
    })
    it('Verify completed task empty when all task is active', () => {
        checkListLength(2, 'all')
        checkListLength(2, 'active')
        checkListLength(0, 'completed')
    })
    it('Verify Hidden Task Upon Changing State to Completed in Active Tasks List', () => {
        displayAndSwitchTaskType('active')
        changeTasksStatus(x8)
        // changeTasksStatus(['Pay electric bill'],'completed')
        displayAndSwitchTaskType('active')
        verifyTheExisenceOfTasks(x4)
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTasks(x9)
    })
    it('Verify Hidden Task Upon Changing State to Active in Completed Tasks List', () => {
        addTaskToList('new task {enter}')
        changeTasksStatus(x10)
        // changeTasksStatus(['new task','Pay electric bill'],'completed')
        displayAndSwitchTaskType('completed')
        changeTasksStatus(x11)
        // changeTasksStatus(['new task'],'active')
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTasks(x12)
        displayAndSwitchTaskType('active')
        verifyTheExisenceOfTasks(x2)
    })
    it('Verify the "Clear completed" button will be hidden when all data in list is active', () => {
        checkListLength(2, 'all')
        checkListLength(2, 'active')
        checkElementAttribute('.clear-completed', 'have.css', 'display', 'none')
    })
    it('Verify the "Clear completed" button will be unhidden when exist completed data in list', () => {
        changeTasksStatus(x8)
        // changeTasksStatus(['Pay electric bill'],'completed')
        checkElementAttribute('.clear-completed', 'have.css', 'display', 'block')
    })
    it('Delete more than one completed task and verify all task deleted from list', () => {
        addTaskToList('new task {enter}')
        changeTasksStatus(x10)
        // changeTasksStatus(['Pay electric bill','new task'],'completed')
        clearTasks()
        checkListLength(1, 'all')
        verifyTheExisenceOfTasks(x13)
    })
    it('Delete task when click "X" button', () => {
        clearTasks('Pay electric bill')
        checkListLength(1, 'all')
        verifyTheExisenceOfTasks(x4)
    })
    it('Verify change state when click in checkbox from active to completed', () => {
        changeTasksStatus(x8)
        // changeTasksStatus(['Pay electric bill'],'completed')
        displayAndSwitchTaskType('active')
        verifyTheExisenceOfTasks(x4)
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTasks(x9)
    })
    it('Verify change state when click in checkbox from completed to active', () => {
        addTaskToList('new task{enter}')
        changeTasksStatus(x10)
        // changeTasksStatus(['Pay electric bill','new task'],'completed')
        changeTasksStatus(x14)
        // changeTasksStatus(['Pay electric bill'],'active')
        displayAndSwitchTaskType('active')
        verifyTheExisenceOfTasks(x9)
        displayAndSwitchTaskType('completed')
        verifyTheExisenceOfTasks(x4)
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
        changeTasksStatus(x5)
        // changeTasksStatus(['Pay electric bill','Walk the dog'],'completed')
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
