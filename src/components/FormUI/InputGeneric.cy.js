import InputGeneric from './InputGeneric.vue'

describe('<InputGeneric />', () => {

  it('renders', () => {
    cy.mount(InputGeneric)
  })

  it('uses custom text for the button input', () => {
    cy.mount(InputGeneric, {
      props: {
        label: 'Label',
        placeholder: 'Placeholder',
        name: 'name',
        modelValue: 'Julio Fuentes',
        textR: 'textR'
      },
    })
    cy.get('button').should('contains.text', 'Click me!')
  })
})