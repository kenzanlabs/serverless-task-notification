import CssBaseline from '@material-ui/core/CssBaseline'
import { SFC } from 'react'
import * as React from 'react'
import { createGlobalStyle } from 'styled-components'

const AppGlobalStyles = createGlobalStyle`
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  }
`

const GlobalStyles: SFC = () => (
  <>
    <CssBaseline />
    <AppGlobalStyles />
  </>
)

export default GlobalStyles
