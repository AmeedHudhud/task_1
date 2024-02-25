function verify_length($x){
    cy.get('.todo-list li').should('have.length',$x)
}
function click($x){
    cy.get($x).click()
}
function insert($x){
    cy.get('.new-todo').type($x)
}
function cheak($x){
    cy.contains($x).parent().find('input').check()
}
describe('test cases for todos', () => {
    beforeEach(()=>{
        cy.visit('https://example.cypress.io/todo#/');
    })
    it('Verify the list contains two default tasks', () => {
        cy.get('.todo-list').should('be.visible');
        // cy.get('.todo-list li').should('have.length', 2)//
        verify_length(2)
        cy.get('.todo-list li').eq(0).invoke('text').should('eq','Pay electric bill')
        cy.get('.todo-list li').eq(1).invoke('text').should('eq','Walk the dog')

        // cy.get('.todo-list li').within(()=>{
        // cy.wrap('Pay electric bill').should('exist')
        // cy.wrap('Walk the dog').should('exist')
        // })
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed 
    it('add new task and verify it is added', () => {
        // cy.get('.new-todo').type('new task {enter}')
        insert('new task {enter}')
        cy.get('.todo-list li').should('contain', 'new task')
    })
    it('Verify no empty task will added to list when plain text empty ', () => {
        // cy.get('.new-todo').type(' {enter}')
        insert(' {enter}')
        // cy.get('.todo-list li').should('have.length', 2)//
        verify_length(2)
    })

    //bug
    //Adding Task to List via Plain Text Entry and "All" Button Functionality
    it('insert using click "All" button ', () => {
        // cy.get('.new-todo').type('new task')
        insert('new task')
        // cy.get('[href="#/"]').click()
        click('[href="#/"]')
        // cy.get('.todo-list li').should('have.length', 2)//
        verify_length(2)
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Active" Button Functionality
    it('insert using click "Active" button" (bug)', () => {
        // cy.get('.new-todo').type('new task')
        insert('new task')
        // cy.get('[href="#/active"]').click()
        click('[href="#/active"]')
        // cy.get('.todo-list li').should('have.length', 2)//
        verify_length(2)
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Completed" Button Functionality
    it('insert using click "Complete" button (bug)', () => {
        // cy.get('.new-todo').type('new task')
        insert('new task')
        // cy.get('[href="#/completed"]').click()
        click('[href="#/completed"]')
        // cy.get('.todo-list li').should('have.length', 2)//
        verify_length(2)
    })

    //bug
    //Adding Task to List via Plain Text Entry and "Clear completed" Button Functionality
    it('insert using click "Clear completed" button (bug)', () => {
        // cy.get('.new-todo').type('new task{enter}')
        insert('new task {enter}')
        // cy.contains('new task').parent().find('input').click()
        cheak('new task')
        // cy.get('.new-todo').type('new task1')
        insert('new task1')
        // cy.get('.clear-completed').click()
        click('.clear-completed')
        // cy.get('.todo-list li').should('have.length', 2)//
        verify_length(2)
    })
    it('verify change task name', () => {
        cy.contains('Pay electric bill').dblclick()
        cy.contains('Pay electric bill').parent().parent().should('have.class', 'editing')
        cy.contains('Pay electric bill').parent().get('.edit').clear().type('qqq')
        // cy.get('[href="#/"]').click();
        click('[href="#/"]')
        cy.get('.todo-list li').should('contain','qqq')

    })
    it('Verify "All" button will contain all task', () => {
        // cy.get('.new-todo').type('new task {enter}')
        insert('new task {enter}')
        // cy.contains('new task').parent().find('input').click()
        cheak('new text')
        // cy.get('[href="#/"]').click();
        click('[href="#/"]')
        // cy.get('.todo-list li').should('have.length', 3)//
        verify_length(3)
    })
    it('verify "active" button will contain all active task ', () => {
        // cy.get('.new-todo').type('new task {enter}')
        insert('new task {enter}')
        // cy.get('.new-todo').type('new task1 {enter}')
        insert('new task1 {enter}')
        cy.get('.todo-list').within(() => {
            // cy.contains('Pay electric bill').parent().find('input').check()
            cheak('Pay electric bill')
        })
        // cy.get('[href="#/active"]').click()
        click('[href="#/active"]')
        // cy.get('.todo-list li').should('have.length', 3)//
        verify_length(3)
        cy.get('.todo-list li').each(($li) => {
            cy.wrap($li).should('have.class', '')
        })
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed 
    it.only('Verify Active task empty when all task is completed', () => {
        cy.get('.todo-list li').each(($li) => {
            cy.wrap($li).parent().find('input').check()
        })
        // cy.get('[href="#/active"]').click()
        click('[href="#/active"]')
        // cy.get('.todo-list li').should('have.length', 0)//
        verify_length(0)
    })
    it('Verify "completed" button will contain all completed task', () => {
        // cy.get('.new-todo').type('new task {enter}')
        insert('new task {enter}')
        // cy.get('.new-todo').type('new task1 {enter}')
        insert('new task1 {enter}')
        cy.get('.todo-list').within(() => {
            // cy.contains('new task').parent().find('input').check()
            cheak('new task')
        })
        cy.get('.todo-list').within(() => {
            // cy.contains('new task1').parent().find('input').check()
            cheak('new task1')
        })
        // cy.get('[href="#/completed"]').click()
        click('[href="#/completed"]')
        // cy.get('.todo-list li').should('have.length', 2)//
        verify_length(2)
        cy.get('.todo-list li').each(($li) => {
            cy.wrap($li).should('have.class', 'completed')
        })
    })
    it('Verify completed task empty when all task is active', () => {
        cy.get('.todo-list li').each(($li) => {
            cy.wrap($li).should('have.class', '')
        })
        // cy.get('[href="#/completed"]').click()
        click('[href="#/completed"]')
        // cy.get('.todo-list li').should('have.length', 0)//
        verify_length(0)
    })
    it('Verify Hidden Task Upon Changing State to Completed in Active Tasks List', () => {
        cy.get('[href="#/active"]').click()
        // cy.contains('Pay electric bill').parent().find('input').check()
        cheak('Pay electric bill')
        cy.contains('Pay electric bill').should('not.exist')
        // cy.get('[href="#/completed"]').click();
        click('[href="#/completed"]')
        cy.get('.todo-list').should('contain', 'Pay electric bill');
    })
    it('Verify Hidden Task Upon Changing State to Active in Completed Tasks List', () => {
        // cy.get('.new-todo').type('new task {enter}')
        insert('new task {enter}')
        // cy.contains('new task').parent().find('input').check()
        cheak('new task')
        // cy.contains('Pay electric bill').parent().find('input').check()
        cheak('Pay electric bill')
        // cy.get('[href="#/completed"]').click()
        click('[href="#/completed"]')
        cy.contains('Pay electric bill').parent().find('input').uncheck()
        // to not use exist
        cy.contains('Pay electric bill').should('not.exist')
        // cy.get('[href="#/active"]').click();
        click('[href="#/active"]')
        cy.get('.todo-list').should('contain', 'Pay electric bill');
    })
    it('Verify the "Clear completed" button will be hidden when all data in list is active', () => {
        cy.get('.todo-list li').each(($li) => {
            cy.wrap($li).should('have.class', '')
        })
        cy.get('.clear-completed').should('have.css', 'display', 'none')
    })
    it('Verify the "Clear completed" button will be unhidden when exist completed data in list', () => {
        // cy.contains('Pay electric bill').parent().find('input').check()
        cheak('Pay electric bill')
        cy.get('.clear-completed').should('have.css', 'display', 'block')
    })
    it('Delete more than one completed task and verify all task deleted from list', () => {
        // cy.get('.new-todo').type('new task {enter}')
        insert('new task {enter}')
        // cy.contains('Pay electric bill').parent().find('input').check()
        cheak('Pay electric bill')
        // cy.contains('new task').parent().find('input').check()
        cheak('new task')
        // cy.get('.clear-completed').click()
        click('.clear-completed')
        // cy.get('[href="#/"]').click()
        click('[href="#/"]')
        // cy.get('.todo-list li').should('have.length', 1)//
        verify_length(1)
        cy.get('.todo-list').should('not.contain', 'Pay electric bill')
        cy.get('.todo-list').should('not.contain', 'new task')
    })
    it('Delete task when click "X" button', () => {
        cy.contains('Pay electric bill').parent().find('.destroy').click({ force: true })
        // cy.get('[href="#/"]').click()
        click('[href="#/"]')
        // cy.get('.todo-list li').should('have.length', 1)//
        verify_length(1)
        cy.get('.todo-list').should('not.contain', 'Pay electric bill')
    })
    it('Verify change state when click in checkbox from active to completed', () => {
        // cy.contains('Pay electric bill').parent().find('input').check()
        cheak('Pay electric bill')
        cy.contains('Pay electric bill').parent().parent().should('have.class', 'completed')
    })
    it('Verify change state when click in checkbox from completed to active', () => {
        // cy.contains('Pay electric bill').parent().find('input').check()
        cheak('Pay electric bill')
        cy.contains('Pay electric bill').parent().find('input').uncheck()
        cy.contains('Pay electric bill').parent().parent().should('have.class', '')
    })
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed 
    it('change all tasks to completed using button above  "toggle button"', () => {
        // cy.get('.main [for="toggle-all"]').click()
        click('.main [for="toggle-all"]')
        cy.get('.todo-list li').each(($li) => {
            cy.wrap($li).should('have.class', 'completed')
        })
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed 
    it('change all tasks to active using button above checkboxs "toggle button"', () => {
        cy.get('.todo-list li').each(($li) => {
            cy.wrap($li).parent().find('input').check()
        })
        // cy.get('.main [for="toggle-all"]').click()
        click('.main [for="toggle-all"]')
        cy.get('.todo-list li').each(($li) => {
            cy.wrap($li).should('have.class', '')
        })
    })

    //bug
    // Unable to Mark Second Default Task ("Walk the Dog") as Completed
    it('change all tasks to active using button above checkboxs "toggle button"', () => {
        // cy.get('.main [for="toggle-all"]').click()
        click('.main [for="toggle-all"]')
        
        // cy.get('.main [for="toggle-all"]').click()
        click('.main [for="toggle-all"]')
        cy.get('.todo-list li').each(($li) => {
        cy.wrap($li).should('have.class', '')
        })
    })
})

