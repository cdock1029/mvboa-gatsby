import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'emotion-theming'
import posed from 'react-pose'
import styled from 'react-emotion'
import Helmet from 'react-helmet'
import theme from '../theme'
import Header from '../components/Header'
import '../app.scss'

// TODO: icon attribution
//<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

const Transition = posed.div({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
})

const Main = styled(Transition)`
  margin-top: 3.25em;
  position: relative;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export default class Layout extends React.PureComponent {
  render() {
    const { children } = this.props
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
                description
              }
            }
          }
        `}>
        {({
          site: {
            siteMetadata: { title, description },
          },
        }) => {
          console.log({ title, description })
          return (
            <>
              <Helmet
                title={title}
                meta={[{ name: 'description', content: description }]}>
                <html lang="en" />
              </Helmet>
              <ThemeProvider theme={theme}>
                <React.Fragment>
                  <Header />
                  <Main id="main-transition" className="section">
                    {children}
                  </Main>
                </React.Fragment>
              </ThemeProvider>
            </>
          )
        }}
      </StaticQuery>
    )
  }
}
