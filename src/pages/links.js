import React from 'react'
import { graphql } from 'gatsby'
import posed from 'react-pose'
import { Page } from '../components/Page'

const colors = [
  'is-primary',
  'is-warning',
  'is-info',
  'is-danger',
  'is-success',
]

const LinksContainer = posed.div({
  enter: {
    delay: 200,
    beforeChildren: true,
    delayChildren: 300,
    staggerChildren: 70,
  },
})

const A = posed.a({
  enter: { x: 0, opacity: 1 },
  exit: { x: 70, opacity: 0 },
})

export default ({
  data: {
    links: { edges: links },
  },
}) => (
  <Page>
    <h3 className="title is-3">Links</h3>
    <div className="section">
      <div className="tile is-ancestor">
        <LinksContainer className="tile is-parent is-vertical">
          {links.map(({ node }, i) => (
            <A
              className={`tile is-child notification ${
                colors[i % colors.length]
              }`}
              key={node.id}
              href={node.url}>
              {/* <div className="tile notification is-warning" key={node.id}> */}
              <p className="title is-3">{node.title}</p>
              {/* </div> */}
            </A>
          ))}
        </LinksContainer>
      </div>
    </div>
  </Page>
)

export const pageQuery = graphql`
  query LinksQuery {
    links: allContentfulLink(sort: { fields: [title], order: ASC }) {
      edges {
        node {
          id
          url
          title
        }
      }
    }
  }
`
