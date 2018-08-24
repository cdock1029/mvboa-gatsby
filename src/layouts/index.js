import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'emotion-theming'
import styled from 'react-emotion'
import Helmet from 'react-helmet'
import theme from '../theme'
import Header from '../components/Header'
import '../app.scss'

// TODO: icon attribution
//<div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

const Main = styled.main`
  margin-top: 3.25em;
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
                {/* <script
                  defer
                  src="https://use.fontawesome.com/releases/v5.2.0/js/solid.js"
                  integrity="sha384-YmNA3b9AQuWW8KZguYfqJa/YhKNTwGVD5pQc1cN0ZAVRudFFtR17HR7rooNcVXe4"
                  crossorigin="anonymous"
                />
                <script
                  defer
                  src="https://use.fontawesome.com/releases/v5.2.0/js/fontawesome.js"
                  integrity="sha384-QcnrgQuRmocjIBY6ByWMmDvUg3HO4MSdVjY7ynJwZfvTDhVPPQOUI9TRzc6/7ZO1"
                  crossorigin="anonymous"
                /> */}
              </Helmet>
              <ThemeProvider theme={theme}>
                <React.Fragment>
                  <Header />
                  <Main className="section">{children}</Main>
                </React.Fragment>
              </ThemeProvider>
            </>
          )
        }}
      </StaticQuery>
    )
  }
}
