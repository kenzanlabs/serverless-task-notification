import CssBaseline from '@material-ui/core/CssBaseline'
import { SFC } from 'react'
import * as React from 'react'
import { createGlobalStyle } from 'styled-components'

const AppGlobalStyles = createGlobalStyle`
  html {
     height: 100%;
  }

  body {
    min-height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    display: flex;
    flex-direction: column;
  }
  
  #root {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 24px;
  }
`

const GlobalStyles: SFC = () => (
  <>
    <CssBaseline />
    <AppGlobalStyles />
  </>
)

export default GlobalStyles
