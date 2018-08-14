import React from 'react'
import Link, { push } from 'gatsby-link'
import { cx, css } from 'react-emotion'

export default class Header extends React.PureComponent {
  state = { isActive: false }
  handleToggle = () => {
    this.setState(({ isActive }) => ({ isActive: !isActive }))
  }
  close = () => {
    this.setState(({ isActive }) => {
      if (!isActive) {
        return null
      }
      return { isActive: false }
    })
  }
  render() {
    console.log('render')
    return (
      <nav
        className="navbar is-danger"
        role="navigation"
        aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" onClick={this.close} className="navbar-item">
              <span className="title is-4 has-text-white">MVBOA</span>
            </Link>
            <div
              onClick={this.handleToggle}
              role="button"
              className={cx('navbar-burger', {
                'is-active': this.state.isActive,
              })}
              aria-label="menu"
              aria-expanded="false">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </div>
          </div>
          <div
            css={{
              textTransform: 'uppercase',
              fontWeight: '500',
              // fontVariantCaps: 'all-small-caps',
            }}
            className={cx('navbar-menu', {
              'is-active': this.state.isActive,
            })}>
            <div className="navbar-start" />
            <div
              className={`navbar-end is-size-4-touch has-text-centered ${touchOnlyPadding}`}>
              <Link to="/members" onClick={this.close} className="navbar-item">
                Members
              </Link>
              <Link to="/links" onClick={this.close} className="navbar-item">
                Links
              </Link>
              <Link to="/" onClick={this.close} className="navbar-item">
                Events
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

const touchOnlyPadding = css`
  @media (max-width: 1087px) {
    padding-top: 1em;
    padding-bottom: 1em;
  }
`
