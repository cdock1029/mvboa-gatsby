import React from 'react'
import { Page } from '../components/Page'

const myOHSAARoot =
  'http://officials.myohsaa.org/Officials/OfficiatingDirectory?role=Official&permitNumber='

export default ({
  data: {
    members: { edges: members },
  },
}) => (
  <Page>
    <h3 className="title is-3">Members</h3>
    <div className="tile is-ancestor">
      <div className="tile is-parent is-vertical">
        {members.map(({ node }) => (
          <a
            key={node.id}
            className="tile is-child"
            href={`${myOHSAARoot}${node.permitNumber}`}>
            <div className="card">
              {node.role && (
                <header className="card-header">
                  <p className="card-header-title has-text-grey">
                    {node.role.join(' / ')}
                  </p>
                </header>
              )}

              <div className="card-content">
                <div className="media">
                  {/* <div className="media-left">{node.permitNumber}</div> */}
                  <div className="media-content">
                    <p className="title is-4">{`${node.lastName}, ${
                      node.firstName
                    }`}</p>
                    {/* <p className="subtitle is-5">{node.permitNumber}</p> */}
                  </div>
                  <div className="media-right">
                    <p className="title is-4" css={{ textAlign: 'right' }}>
                      {node.memberClass}
                    </p>
                    <p className="subtitle is-6 has-text-grey-light">Class</p>
                  </div>
                </div>
                <div className="content">
                  <p className="title is-5">{node.permitNumber}</p>
                  <p className="subtitle is-6 has-text-grey-light">
                    Permit number
                  </p>
                </div>
              </div>

              {/* <ul>
            <li>{node.firstName}</li>
            <li>{node.lastName}</li>
            <li>{node.permitNumber}</li>
            <li>{node.role.join(', ')}</li>
            <li>{node.memberClass}</li>
          </ul> */}
            </div>
          </a>
        ))}
      </div>
    </div>
  </Page>
)

export const pageQuery = graphql`
  query MembersQuery {
    members: allContentfulMember(
      sort: { fields: [role, lastName], order: ASC }
    ) {
      edges {
        node {
          id
          firstName
          lastName
          memberClass
          permitNumber
          role
        }
      }
    }
  }
`
