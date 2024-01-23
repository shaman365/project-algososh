import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { circleSelector } from "../../src/constants/tests"

describe('Тест очереди', () => {
  beforeEach(() => {
    cy.visit('/queue');
  })

  it('Кнопка добавления недоступна, если в инпуте пусто', () => {
    cy.get('input').as('input');
    cy.get('button').contains('Добавить').parent().as('button').should('be.disabled');
    cy.get('@input').type('10');
    cy.get('@button').should('not.be.disabled');
  });

  it('Добавление элемена в очередь', () => {
    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(circleSelector).should('satisfy', (items) => items.length === 7);
    })

    cy.get('input').as('input');
    cy.get('button').contains('Добавить').parent().as('button').should('be.disabled');
    cy.get('@input').type('1');
    cy.get('@button').click();

    cy.get(circleSelector).then((items) => {
      const [el1] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('changing'));
      cy.wrap(el1).should('have.text', '1');

      cy.wait(SHORT_DELAY_IN_MS).then(() => {
        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el1).should('have.text', '1');
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el1.parentElement?.lastChild).should('have.text', 'tail');
      })
    })

    cy.get('@input').type('2');
    cy.get('@button').click();

    cy.get(circleSelector).then((items) => {
      const [el1, el2] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('default'));
      cy.wrap(el1).should('have.text', '1');
      cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
      cy.wrap(el1.parentElement?.lastChild).should('not.have.text', 'tail');

      cy.wrap(el2)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('changing'));
      cy.wrap(el2).should('have.text', '2');
      cy.wrap(el2.parentElement?.firstChild).should('not.have.text', 'head');
      cy.wrap(el2.parentElement?.lastChild).should('have.text', 'tail');

      cy.wait(SHORT_DELAY_IN_MS).then(() => {
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el2).should('have.text', '2');
        cy.wrap(el2.parentElement?.firstChild).should('not.have.text', 'head');
        cy.wrap(el2.parentElement?.lastChild).should('have.text', 'tail');
      })
    })

    cy.get('@input').should('have.text', '');
    cy.get('@button').should('be.disabled');
  })

  it('Удаление элемента из очереди', () => {
    cy.get('button').contains('Добавить').parent().as('addButton').should('be.disabled');
    cy.get('button').contains('Удалить').parent().as('removeButton');
    cy.get('input').as('input');
    cy.get('@input').type('1');
    cy.get('@addButton').click();
    cy.get('@input').type('2');
    cy.get('@addButton').click();

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('@removeButton').click();
      cy.get(circleSelector).then((items) => {
        const [el1, el2] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('changing'));
        cy.wrap(el1).should('have.text', '1');
        cy.wrap(el1.parentElement?.firstChild).should('not.have.text', 'head');

        cy.wait(SHORT_DELAY_IN_MS).then(() => {
          cy.wrap(el1)
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains('default'));
          cy.wrap(el1).should('not.have.text', '1');
          cy.wrap(el1.parentElement?.firstChild).should('not.have.text', 'head');

          cy.wrap(el2)
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains('default'));
          cy.wrap(el2).should('have.text', '2');
          cy.wrap(el2.parentElement?.firstChild).should('have.text', 'head');
          cy.wrap(el2.parentElement?.lastChild).should('have.text', 'tail');
        })
      })
    })

    cy.get('@removeButton').click();
    cy.get(circleSelector).then((items) => {
      const el2 = Array.from(items)[1];

      cy.wrap(el2)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('changing'));
      cy.wrap(el2).should('have.text', '2');
      cy.wrap(el2.parentElement?.firstChild).should('have.text', 'head');
      cy.wrap(el2.parentElement?.lastChild).should('have.text', 'tail');

      cy.wait(SHORT_DELAY_IN_MS).then(() => {
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el2).should('not.have.text', '2');
        cy.wrap(el2.parentElement?.firstChild).should('not.have.text', 'head');
        cy.wrap(el2.parentElement?.lastChild).should('not.have.text', 'tail');
      })
    })

    cy.get('@input').should('have.text', '');
    cy.get('@addButton').should('be.disabled');
    cy.get('@removeButton').should('be.disabled');
  })

  it('Очистка очереди', () => {
    cy.get('button').contains('Добавить').parent().as('addButton').should('be.disabled');
    cy.get('button').contains('Очистить').parent().as('clearButton');
    cy.get('input').as('input');
    cy.get('@input').type('1');
    cy.get('@addButton').click();
    cy.get('@input').type('2');
    cy.get('@addButton').click();

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get('@clearButton').click();

      cy.get(circleSelector).then((items) => {
        const [el1, el2] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el1).should('not.have.text', '1');
        cy.wrap(el1.parentElement?.firstChild).should('not.have.text', 'head');
        cy.wrap(el1.parentElement?.lastChild).should('not.have.text', 'tail');

        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el2).should('not.have.text', '2');
        cy.wrap(el2.parentElement?.firstChild).should('not.have.text', 'head');
        cy.wrap(el2.parentElement?.lastChild).should('not.have.text', 'tail');
      })
    })

    cy.get('@input').should('have.text', '');
    cy.get('@addButton').should('be.disabled');
    cy.get('@clearButton');
  })
})