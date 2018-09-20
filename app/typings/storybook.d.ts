import { RenderFunction } from '@storybook/react'

declare module '@storybook/react' {
  interface Story {
    addWithJSX(storyName: string, callback: RenderFunction): this
  }
}
