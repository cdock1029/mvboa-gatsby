import React from 'react'
import posed from 'react-pose'
import { graphql } from 'gatsby'
import { Page } from '../components/Page'
import { AdImage } from '../components/AdImage'

const EventsContainer = posed.div({
  enter: {
    staggerChildren: 90,
    delay: 200,
    beforeChildren: true,
    delayChildren: 300,
  },
})

const EventDiv = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
})

export default ({
  data: {
    events: { edges: events },
  },
}) => (
  <Page>
    <AdImage />
    <h3 className="title is-3">Events</h3>
    <div className="tile is-ancestor">
      <EventsContainer className="tile is-parent is-vertical">
        {events.map(({ node }) => (
          <EventDiv key={node.id} className="tile is-child">
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
          </EventDiv>
        ))}
      </EventsContainer>
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
          eventDate(formatString: "YYYY MMMM DD")
        }
      }
    }
  }
`
