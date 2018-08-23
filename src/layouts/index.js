import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import theme from '../theme'
import Header from '../components/Header'
import '../app.scss'

// TODO: icon attribution
//<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

export default class Layout extends React.PureComponent {
  render() {
    const { children } = this.props
    return (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <Header />
          <main className="section">{children}</main>
        </React.Fragment>
      </ThemeProvider>
    )
  }
}
