import React from 'react'
import { Page } from '../components/Page'

export default ({
  data: {
    events: { edges: events },
  },
}) => (
  <Page>
    <h3 className="title is-3">Events</h3>
    <div className="tile is-ancestor">
      <div className="tile is-parent is-vertical">
        {events.map(({ node }) => (
          <div key={node.id} className="tile is-child">
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4 is-spaced">{node.title}</p>
                    <p className="subtitle is-5">{node.eventDate}</p>
                  </div>
                </div>

                <div className="content">{node.description.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Page>
)

export const pageQuery = graphql`
  query EventsQuery {
    events: allContentfulEvent(sort: { fields: [eventDate], order: ASC }) {
      edges {
        node {
          id
          title

          description {
            description
          }
          location {
            lon
            lat
          }
          eventDate(formatString: "YYYY MMMM DD")
        }
      }
    }
  }
`
