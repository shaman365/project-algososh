import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { circleSelector, inputTextSelector, inputNumberSelector } from "../../src/constants/tests"

describe('Тест списка', () => {
  beforeEach(() => {
    cy.visit('/list');
  })

  it('Кнопка добавления недоступна, если в инпуте пусто', () => {
    cy.get(inputTextSelector).as('inputText');
    cy.get('button').contains('Добавить в head').parent().as('buttonAddHead').should('be.disabled');
    cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');
    cy.get('button').contains('Добавить по индексу').parent().as('buttonAddIndex').should('be.disabled');
    cy.get('@inputText').type('1');
    cy.get('@buttonAddHead').should('not.be.disabled');
    cy.get('@buttonAddTail').should('not.be.disabled');
    cy.get('@buttonAddIndex').should('be.disabled');
  });

  it('Отрисовка дефолтного списка', () => {
    cy.get(inputTextSelector).as('inputText');
    cy.get('button').contains('Добавить в head').parent().as('buttonAddHead').should('be.disabled');
    cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');

    cy.get(circleSelector).then((items: JQuery<HTMLElement>) => {
        const [el1, el2, el3, el4] = Array.from(items);
        cy.wrap(el1).should('have.text', '0');        
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('default'));

        cy.wrap(el2).should('have.text', '34');
        cy.wrap(el2)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('default'));

        cy.wrap(el3).should('have.text', '8');
        cy.wrap(el3)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('default'));

        cy.wrap(el4).should('have.text', '1');
        cy.wrap(el4)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('default'));
        
        cy.wrap(el4.parentElement?.lastChild).should('have.text', 'tail');
    })


    cy.get('@inputText').should('have.text', '');
    cy.get('@buttonAddHead').should('be.disabled');
    cy.get('@buttonAddTail').should('be.disabled');
  })

  it('Добавление элемента в head', () => {
    cy.get(inputTextSelector).as('inputText');
    cy.get('button').contains('Добавить в head').parent().as('buttonAddHead').should('be.disabled');
    cy.get('@inputText').type('3');
    cy.get('@buttonAddHead').click();

    cy.get(circleSelector).then((items) => {
        const [el1, el2, el3, el4, el5] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('changing'));
      cy.wrap(el1).should('have.text', '3');
      cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
      cy.wrap(el5.parentElement?.lastChild).should('have.text', 'tail');

      cy.log('el1 should have: ', el1);

      cy.wait(SHORT_DELAY_IN_MS).then(() => {
        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('default'));
        cy.wrap(el1).should('have.text', '3');
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el5.parentElement?.lastChild).should('have.text', 'tail');
      })
    })

    cy.get('@inputText').type('2');
    cy.get('@buttonAddHead').click();

    cy.get(circleSelector).then((items) => {
      const [el1, el2] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('circle_small').contain('changing'));
      cy.wrap(el2).should('have.text', '3');
      cy.log(el2)
      cy.wrap(el2.parentElement?.firstChild).should('have.text', '2');
      cy.wrap(el2.parentElement?.lastChild).should('have.text', 'tail');

    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(circleSelector).then((items) => {
        const [el1] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el1).should('have.text', '2');
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el1.parentElement?.lastChild).should('not.have.text', 'tail');

        cy.wait(SHORT_DELAY_IN_MS).then(() => {
          cy.wrap(el1)
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains('default'));
        })
      })
    })

    cy.get('@inputText').type('1');
    cy.get('@buttonAddHead').click();

    cy.get(circleSelector).then((items) => {
      const [el1, el2] = Array.from(items);

      cy.wrap(el1)
        .invoke("attr", "class")
        .then((classList) => expect(classList).contains('circle_small').contain('changing'));
      cy.wrap(el2).should('have.text', '2');
      cy.wrap(el2.parentElement?.firstChild).should('have.text', '1');
      cy.wrap(el2.parentElement?.lastChild).should('not.have.text', 'tail');

    })

    cy.wait(SHORT_DELAY_IN_MS).then(() => {
      cy.get(circleSelector).then((items) => {
        const [el1] = Array.from(items);

        cy.wrap(el1)
          .invoke("attr", "class")
          .then((classList) => expect(classList).contains('modified'));
        cy.wrap(el1).should('have.text', '1');
        cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
        cy.wrap(el1.parentElement?.lastChild).should('not.have.text', 'tail');

        cy.wait(SHORT_DELAY_IN_MS).then(() => {
          cy.wrap(el1)
            .invoke("attr", "class")
            .then((classList) => expect(classList).contains('default'));
        })
      })
    })
  })

//   it('Добавление элемента в tail', () => {
//     cy.get(inputTextSelector).as('inputText');
//     cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');
//     cy.get('@inputText').type('1');
//     cy.get('@buttonAddTail').click();

//     cy.get(circleSelector).then((items) => {
//       const [el1] = Array.from(items);

//       cy.wrap(el1)
//         .invoke("attr", "class")
//         .then((classList) => expect(classList).contains('modified'));
//       cy.wrap(el1).should('have.text', '1');
//       cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
//       cy.wrap(el1.parentElement?.lastChild).should('have.text', 'tail');

//       cy.wait(SHORT_DELAY_IN_MS).then(() => {
//         cy.wrap(el1)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('default'));
//         cy.wrap(el1).should('have.text', '1');
//         cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
//         cy.wrap(el1.parentElement?.lastChild).should('have.text', 'tail');
//       })
//     })

//     cy.get('@inputText').type('2');
//     cy.get('@buttonAddTail').click();

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get(circleSelector).then((items) => {
//         const [el1, el2] = Array.from(items);

//         cy.wrap(el1)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contain('default'));
//         cy.wrap(el2)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contain('modified'));
//         cy.wrap(el2).should('have.text', '2');
//         cy.wrap(el1.parentElement?.lastChild).should('not.have.text', 'tail');
//         cy.wrap(el2.parentElement?.lastChild).should('have.text', 'tail');

//         cy.wait(SHORT_DELAY_IN_MS).then(() => {
//           cy.wrap(el2)
//             .invoke("attr", "class")
//             .then((classList) => expect(classList).contains('default'));
//         })
//       })
//     })

//     cy.get('@inputText').type('3');
//     cy.get('@buttonAddTail').click();

//     cy.get(circleSelector).then((items) => {
//       const [, el2, el3] = Array.from(items);

//       cy.wrap(el2)
//         .invoke("attr", "class")
//         .then((classList) => expect(classList).contains('circle_small').contain('changing'));
//       cy.wrap(el2).should('have.text', '3');
//       cy.wrap(el3.parentElement?.firstChild).should('have.text', '3');
//       cy.wrap(el3.parentElement?.lastChild).should('not.have.text', 'tail');

//       cy.get(circleSelector).then((items) => {
//         const [, el2, el3] = Array.from(items);

//         cy.wrap(el3)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('modified'));
//         cy.wrap(el3).should('have.text', '3');
//         cy.wrap(el2.parentElement?.firstChild).should('not.have.text', '3');
//         cy.wrap(el2.parentElement?.lastChild).should('not.have.text', 'tail');
//         cy.wrap(el3.parentElement?.lastChild).should('have.text', 'tail');
//       })

//       cy.wait(SHORT_DELAY_IN_MS).then(() => {
//         cy.wrap(el3)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('default'));
//       })
//     })
//   })

//   it('Добавление элемента по индексу', () => {
//     cy.get(inputTextSelector).as('inputText');
//     cy.get(inputNumberSelector).as('inputIndex');
//     cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');
//     cy.get('button').contains('Добавить по индексу').parent().as('buttonAddIndex').should('be.disabled');
//     cy.get('@inputText').type('1');
//     cy.get('@buttonAddTail').click();
//     cy.get('@inputText').type('2');
//     cy.get('@buttonAddTail').click();

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get('@inputText').type('3');
//       cy.get('@inputIndex').type('1');
//       cy.get('@buttonAddIndex').click();
//     })

//     cy.get(circleSelector).then((items) => {
//       const [el1, el2, el3] = Array.from(items);

//       cy.wrap(el1)
//         .invoke("attr", "class")
//         .then((classList) => expect(classList).contains('circle_small').contain('changing'));
//       cy.wrap(el1).should('have.text', '3');
//       cy.wrap(el2.parentElement?.firstChild).should('have.text', '3');
//       cy.wrap(el2.parentElement?.lastChild).should('not.have.text', 'tail');
//       cy.wrap(el3.parentElement?.lastChild).should('have.text', 'tail');
//     })

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get(circleSelector).then((items) => {
//         const [el1, el2, el3] = Array.from(items);

//         cy.wrap(el1)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('changing'));
//         cy.wrap(el2)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('circle_small').contain('changing'));
//         cy.wrap(el2).should('have.text', '3');
//         cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
//         cy.wrap(el3.parentElement?.firstChild).should('have.text', '3');
//         cy.wrap(el3.parentElement?.lastChild).should('have.text', 'tail');
//       })
//     })

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get(circleSelector).then((items) => {
//         const [el1, el2, el3] = Array.from(items);
//         cy.wrap(el1)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('default'));
//         cy.wrap(el2)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('modified'));
//         cy.wrap(el2).should('have.text', '3');
//         cy.wrap(el2.parentElement?.lastChild).should('not.have.text', 'tail');
//         cy.wrap(el3.parentElement?.firstChild).should('not.have.text', '3');
//         cy.wrap(el3.parentElement?.lastChild).should('have.text', 'tail');
//       })
//     })

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get(circleSelector).then((items) => {
//         const [, el2] = Array.from(items);
//         cy.wrap(el2)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('default'));
//       })
//     })
//   })

//   it('Удаление элемента из head', () => {
//     cy.get(inputTextSelector).as('inputText');
//     cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');
//     cy.get('button').contains('Удалить из head').parent().as('buttonDeleteHead').should('be.disabled');
//     cy.get('@inputText').type('1');
//     cy.get('@buttonAddTail').click();
//     cy.get('@inputText').type('2');
//     cy.get('@buttonAddTail').click();

//     cy.get('@buttonDeleteHead').click();

//     cy.get(circleSelector).then((items) => {
//       const [el1, el2] = Array.from(items);

//       cy.wrap(el2)
//         .invoke("attr", "class")
//         .then((classList) => expect(classList).contains('circle_small').contain('changing'));
//       cy.wrap(el2).should('have.text', '1');
//       cy.wrap(el1).should('not.have.text', '1');
//       cy.wrap(el1.parentElement?.lastChild).should('have.text', '1');
//     })

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get(circleSelector).should('satisfy', (items) => items.length === 1);
//       cy.get(circleSelector).then((items) => {
//         const [el1] = Array.from(items);

//         cy.wrap(el1)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('default'));
//         cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
//         cy.wrap(el1.parentElement?.lastChild).should('have.text', 'tail');
//       })
//     })

//     cy.get('@buttonDeleteHead').click();

//     cy.get(circleSelector).then((items) => {
//       const [el1, el2] = Array.from(items);

//       cy.wrap(el2)
//         .invoke("attr", "class")
//         .then((classList) => expect(classList).contains('circle_small').contain('changing'));
//       cy.wrap(el2).should('have.text', '2');
//       cy.wrap(el1).should('not.have.text', '2');
//       cy.wrap(el1.parentElement?.lastChild).should('have.text', '2');
//     })

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get(circleSelector).should('satisfy', (items) => items.length === 0);
//     })
//   })

//   it('Удаление элемента из tail', () => {
//     cy.get(inputTextSelector).as('inputText');
//     cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');
//     cy.get('button').contains('Удалить из tail').parent().as('buttonDeleteTail').should('be.disabled');
//     cy.get('@inputText').type('1');
//     cy.get('@buttonAddTail').click();
//     cy.get('@inputText').type('2');
//     cy.get('@buttonAddTail').click();


//     cy.get('@buttonDeleteTail').click();

//     cy.get(circleSelector).then((items) => {
//       const [, el2, el3] = Array.from(items);

//       cy.wrap(el3)
//         .invoke("attr", "class")
//         .then((classList) => expect(classList).contains('circle_small').contain('changing'));
//       cy.wrap(el3).should('have.text', '2');
//       cy.wrap(el2).should('not.have.text', '2');
//       cy.wrap(el2.parentElement?.lastChild).should('have.text', '2');
//     })

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get(circleSelector).should('satisfy', (items) => items.length === 1);
//       cy.get(circleSelector).then((items) => {
//         const [el1] = Array.from(items);

//         cy.wrap(el1)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('default'));
//         cy.wrap(el1.parentElement?.firstChild).should('have.text', 'head');
//         cy.wrap(el1.parentElement?.lastChild).should('have.text', 'tail');
//       })
//     })

//     cy.get('@buttonDeleteTail').click();

//     cy.get(circleSelector).then((items) => {
//       const [el1, el2] = Array.from(items);

//       cy.wrap(el2)
//         .invoke("attr", "class")
//         .then((classList) => expect(classList).contains('circle_small').contain('changing'));
//       cy.wrap(el2).should('have.text', '1');
//       cy.wrap(el1).should('not.have.text', '1');
//       cy.wrap(el1.parentElement?.lastChild).should('have.text', '1');
//     })

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get(circleSelector).should('satisfy', (items) => items.length === 0);
//     })
//   })

//   it('Удаление элемента по индексу', () => {
//     cy.get(inputTextSelector).as('inputText');
//     cy.get(inputNumberSelector).as('inputIndex');
//     cy.get('button').contains('Добавить в tail').parent().as('buttonAddTail').should('be.disabled');
//     cy.get('button').contains('Удалить по индексу').parent().as('buttonDeleteIndex').should('be.disabled');
//     cy.get('@inputText').type('1');
//     cy.get('@buttonAddTail').click();
//     cy.get('@inputText').type('2');
//     cy.get('@buttonAddTail').click();
//     cy.get('@inputIndex').type('1');

//     cy.get('@buttonDeleteIndex').click();

//     cy.get(circleSelector).then((items) => {
//       const [el1] = Array.from(items);

//       cy.wrap(el1)
//         .invoke("attr", "class")
//         .then((classList) => expect(classList).contain('changing'));
//     })

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get(circleSelector).then((items) => {
//         const [el1, el2] = Array.from(items);

//         cy.wrap(el1)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('changing'));
//         cy.wrap(el2)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('changing'));
//       })
//     })

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get(circleSelector).then((items) => {
//         const [el1, el2, el3] = Array.from(items);

//         cy.wrap(el1)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('changing'));
//         cy.wrap(el2)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('changing'));
//         cy.wrap(el3)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('circle_small').contain('changing'));
//         cy.wrap(el3).should('have.text', '2');
//         cy.wrap(el2).should('not.have.text', '2');
//         cy.wrap(el2.parentElement?.lastChild).should('have.text', '2');
//       })
//     })

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get(circleSelector).then((items) => {
//         const [el1] = Array.from(items);

//         cy.wrap(el1)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('default'));
//       })
//     })

//     cy.get('@inputIndex').type('0');
//     cy.get('@buttonDeleteIndex').click();

//     cy.get(circleSelector).then((items) => {
//       const [el1] = Array.from(items);

//       cy.wrap(el1)
//         .invoke("attr", "class")
//         .then((classList) => expect(classList).contain('changing'));
//     })

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get(circleSelector).then((items) => {
//         const [el1, el2] = Array.from(items);

//         cy.wrap(el1)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('changing'));
//         cy.wrap(el2)
//           .invoke("attr", "class")
//           .then((classList) => expect(classList).contains('circle_small').contain('changing'));
//         cy.wrap(el2).should('have.text', '1');
//         cy.wrap(el1).should('not.have.text', '1');
//         cy.wrap(el1.parentElement?.lastChild).should('have.text', '1');
//       })
//     })

//     cy.wait(SHORT_DELAY_IN_MS).then(() => {
//       cy.get(circleSelector).should('not.exist');
//     })
//   })
})