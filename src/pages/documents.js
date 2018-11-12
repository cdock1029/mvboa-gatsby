import React from 'react'
import { graphql } from 'gatsby'
import posed from 'react-pose'
import { Page } from '../components/Page'
import { AdImage } from '../components/AdImage'

const colors = [
  'is-primary',
  'is-warning',
  'is-info',
  'is-danger',
  'is-success',
]

const DocumentsContainer = posed.div({
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
    files: { edges: files },
  },
}) => (
  <Page>
    <AdImage />
    <h3 className="title is-3">Documents</h3>
    <div className="section">
      <div className="tile is-ancestor">
        <DocumentsContainer className="tile is-parent is-vertical">
          {files.map(({ node }, i) => (
            <A
              className={`tile is-child notification ${
                colors[i % colors.length]
              }`}
              key={node.id}
              target="_blank"
              href={`https:${node.file.url}`}>
              {/* <div className="tile notification is-warning" key={node.id}> */}
              <p className="title is-3">{node.title}</p>
              {/* </div> */}
            </A>
          ))}
        </DocumentsContainer>
      </div>
    </div>
  </Page>
)

export const pageQuery = graphql`
  query FilesQuery {
    files: allContentfulAsset(sort: { fields: [title], order: ASC }) {
      edges {
        node {
          id
          title
          file {
            url
          }
        }
      }
    }
  }
`
