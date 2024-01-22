import { DELAY_IN_MS } from "../../src/constants/delays";
import { circleSelector } from "../../src/constants/tests"

describe('Тест строки', () => {
  beforeEach(() => {
    cy.visit('/recursion');
  })

  it('Кнопка добавления недоступна, если в инпуте пусто', () => {
    cy.get('input').as('input').should('not.have.value');
    cy.get('[type="submit"]').as('button').should('be.disabled');
    cy.get('@input').type('test');
    cy.get('@button').should('not.be.disabled');
  });

  it('Алгоритм работает корректно', () => {
    cy.get('input').as('input').should('not.have.value');
    cy.get('[type="submit"]').as('button').should('be.disabled');
    cy.get('@input').type('1234');
    cy.get('@button').should('not.be.disabled');
    cy.get('@button').click();

    cy.get('@input').should('be.disabled');

    cy.get('@button')
      .invoke("attr", "class").should('include', 'loader');

    cy.get(circleSelector).then((items: JQuery<HTMLElement>) => {
      const [el1, el2, el3, el4] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('changing'));
      cy.wrap(el1).should("have.text", '1');

      cy.wrap(el2)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('default'));
      cy.wrap(el2).should("have.text", '2');

      cy.wrap(el3)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('default'));
      cy.wrap(el3).should("have.text", '3');

      cy.wrap(el4)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('changing'));
      cy.wrap(el4).should("have.text", '4');

      cy.wait(DELAY_IN_MS).then(() => {
        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el1).should("have.text", '4');
  
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('changing'));
        cy.wrap(el2).should("have.text", '2');
  
        cy.wrap(el3)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('changing'));
        cy.wrap(el3).should("have.text", '3');
  
        cy.wrap(el4)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el4).should("have.text", '1');
      });

      cy.wait(DELAY_IN_MS).then(() => {
        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el1).should("have.text", '4');
  
        cy.wrap(el2)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el2).should("have.text", '3');
  
        cy.wrap(el3)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el3).should("have.text", '2');
  
        cy.wrap(el4)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el4).should("have.text", '1');
      });
    });
  });
})