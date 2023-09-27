/* eslint-disable no-undef */
import 'cypress-wait-until';


describe('Teste de Abertura do Sistema', () => {
  it('Deve abrir o sistema sem erros', () => {
    cy.visit('http://localhost:5173/');

    cy.contains('Vídeos').should('exist');
  });
});

describe('Teste de Mudanças com Setas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Deve haver mudanças ao pressionar a seta para a esquerda', () => {
    cy.get('.video-container').should('exist').then(() => {
      cy.get('.btn-anterior').click();

      cy.contains('Rogério Skylab- O meu pau fica duro- Tubo de ensaio curitiba.').should('exist');
    });
  });

  it('Deve haver mudanças ao pressionar a seta para a direita', () => {
    cy.get('.video-container').should('exist').then(() => {
      cy.get('.btn-proximo').click();

      cy.contains('ANIMAL PLANET - Roliúde Memes').should('exist');
    });
  });
});

describe('Teste de seleção de vídeo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Deve ir para a página específica do vídeo', () => {
    cy.get('.video-container').should('exist').click();

   cy.get('.video').should('exist');
  });  

  it('Deve voltar para a home', () => {
    cy.get('.video-container').should('exist').click();

   cy.get('.btn-voltar').should('exist').click();

   cy.get('.video-container').should('exist');
  });  
});