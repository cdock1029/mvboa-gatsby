import React from 'react'
import { Page } from '../components/Page'

const colors = [
  'is-primary',
  'is-warning',
  'is-info',
  'is-danger',
  'is-success',
]

export default ({
  data: {
    links: { edges: links },
  },
}) => (
  <Page>
    <h3 className="title is-3">Links</h3>
    <div className="section">
      <div className="tile is-ancestor">
        <div className="tile is-parent is-vertical">
          {links.map(({ node }, i) => (
            <a
              className={`tile is-child notification ${
                colors[i % colors.length]
              }`}
              key={node.id}
              href={node.url}>
              {/* <div className="tile notification is-warning" key={node.id}> */}
              <p className="title is-3">{node.title}</p>
              {/* </div> */}
            </a>
          ))}
        </div>
      </div>
    </div>
  </Page>
)

export const pageQuery = graphql`
  query LinksQuery {
    links: allContentfulLink {
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
