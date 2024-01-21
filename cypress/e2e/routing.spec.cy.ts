describe('Роутинг', () => {
    beforeEach(function() {
        cy.visit('/');
      });

    it('Страница `Строка` доступна', () => {
        cy.visit('/recursion');
        cy.contains('Строка')
    })

    it('Страница `Фибоначчи` доступна', () => {
        cy.visit('/fibonacci');
        cy.contains('Последовательность Фибоначчи')
    })

    it('Страница `Сортировка массива` доступна', () => {
        cy.visit('/sorting');
        cy.contains('Сортировка массива')
    })

    it('Страница `Стек` доступна', () => {
        cy.visit('/stack');
        cy.contains('Стек')
    })

    it('Страница `Очередь` доступна', () => {
        cy.visit('/queue');
        cy.contains('Очередь')
    })

    it('Страница `Связный список` доступна', () => {
        cy.visit('/list');
        cy.contains('Связный список')
    })
})