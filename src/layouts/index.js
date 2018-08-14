import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import theme from '../theme'
import Header from '../components/Header'
import '../app.scss'

export default class Layout extends React.PureComponent {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Header />
          <main className="section">{this.props.children()}</main>
        </React.Fragment>
      </ThemeProvider>
    )
  }
}
