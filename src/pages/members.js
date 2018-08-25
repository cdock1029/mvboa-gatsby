import React from 'react'
import { graphql } from 'gatsby'
import styled from 'react-emotion'
import Downshift from 'downshift'
import Helmet from 'react-helmet'
// import posed, { PoseGroup } from 'react-pose'
import { Page } from '../components/Page'

// const MembersContainer = posed.div({
//   enter: {
//     delay: 200,
//     beforeChildren: true,
//     staggerChildren: 90,
//     delayChildren: 300,
//   },
// })

// const A = posed.a({
//   enter: { x: 0, opacity: 1 },
//   exit: { x: 100, opacity: 0 },
// })

const myOHSAARoot =
  'http://officials.myohsaa.org/Officials/OfficiatingDirectory?role=Official&permitNumber='

const SearchRow = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  top: 3.25em;
  left: 0;
  right: 0;
  display: flex;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  z-index: 20;
  /* background-color: #37a794; */
  & > span {
    width: 100%;
    padding: 1em;
    border: 1px solid navy;
  }
`
const Spacer = styled.div`
  height: 90px;
`

function stdName(obj) {
  return `${obj.lastName}, ${obj.firstName}`
}

export default class Member extends React.Component {
  state = {
    members: this.props.data.members.edges,
  }
  render() {
    const members = this.props.data.members.edges
    // const { members } = this.state
    return (
      <>
        <Helmet>
          <link
            rel="preload"
            as="script"
            href="https://use.fontawesome.com/releases/v5.2.0/js/solid.js"
          />
          <link
            rel="preload"
            as="script"
            href="https://use.fontawesome.com/releases/v5.2.0/js/fontawesome.js"
          />
          <script
            defer
            src="https://use.fontawesome.com/releases/v5.2.0/js/solid.js"
          />
          <script
            defer
            src="https://use.fontawesome.com/releases/v5.2.0/js/fontawesome.js"
          />
        </Helmet>
        <Downshift
          onChange={selection => console.log({ selection })}
          defaultIsOpen
          itemToString={node => {
            return node ? stdName(node) : ''
          }}>
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => {
            console.log({ inputValue, selectedItem })
            return (
              <div>
                <SearchRow>
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label" {...getLabelProps()}>
                        Search
                      </label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            {...getInputProps()}
                            className="input is-large"
                            placeholder="Search members"
                          />
                          <span className="icon is-medium is-left">
                            <i className="fas fa-search" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SearchRow>
                <Page>
                  <Spacer />
                  <h3 className="title is-3">Members</h3>
                  <div className="tile is-ancestor">
                    <div
                      className="tile is-parent is-vertical"
                      {...getMenuProps()}>
                      {/* <PoseGroup> */}
                      {members
                        .filter(({ node }) => {
                          return (
                            !inputValue ||
                            stdName(node)
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                          )
                        })
                        .map(({ node }, index) => (
                          <a
                            {...getItemProps({
                              key: node.id,
                              index,
                              item: node,
                              style: {
                                opacity: 1,
                                transform: 'none',
                              },
                            })}
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

                              <div
                                className="card-content"
                                css={{
                                  backgroundColor:
                                    highlightedIndex === index
                                      ? 'gainsboro'
                                      : 'initial',
                                }}>
                                <div className="media">
                                  {/* <div className="media-left">{node.permitNumber}</div> */}
                                  <div className="media-content">
                                    <p
                                      className="title is-4"
                                      css={{
                                        fontWeight:
                                          selectedItem &&
                                          selectedItem.id === node.id
                                            ? '700'
                                            : 'initial',
                                      }}>{`${node.lastName}, ${
                                      node.firstName
                                    }`}</p>
                                    {/* <p className="subtitle is-5">{node.permitNumber}</p> */}
                                  </div>
                                  <div className="media-right">
                                    <p
                                      className="title is-4"
                                      css={{ textAlign: 'right' }}>
                                      {node.memberClass}
                                    </p>
                                    <p className="subtitle is-6 has-text-grey-light">
                                      Class
                                    </p>
                                  </div>
                                </div>
                                <div className="content">
                                  <p className="title is-5">
                                    {node.permitNumber}
                                  </p>
                                  <p className="subtitle is-6 has-text-grey-light">
                                    Permit number
                                  </p>
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                      {/* </PoseGroup> */}
                    </div>
                  </div>
                </Page>
              </div>
            )
          }}
        </Downshift>
      </>
    )
  }
}

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
