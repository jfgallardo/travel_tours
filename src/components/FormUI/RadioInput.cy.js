import RadioInput from './RadioInput.vue'

describe('<RadioInput />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(RadioInput)
  })
})