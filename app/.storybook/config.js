import { withKnobs } from '@storybook/addon-knobs'
import { configure, setAddon, addDecorator } from '@storybook/react'
import JSXAddon from 'storybook-addon-jsx'

setAddon(JSXAddon)
addDecorator(withKnobs)

const req = require.context('../src', true, /\.stories\.tsx?$/)

const loadStories = () => {
  req.keys().forEach(file => req(file))
}

configure(loadStories, module)
