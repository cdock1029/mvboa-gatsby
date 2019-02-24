import React from 'react'
import { Link, navigate } from 'gatsby'
import { css } from '@emotion/core'

// TODO: fix janky

export default class Header extends React.PureComponent {
  state = { isActive: false }
  handleToggle = () => {
    this.setState(({ isActive }) => ({ isActive: !isActive }))
  }
  close = (e, path) => {
    e.preventDefault()
    this.setState(
      ({ isActive }) => {
        if (!isActive) {
          return null
        }
        return { isActive: false }
      },
      () => {
        setTimeout(() => {
          navigate(path)
        }, 100)
      },
    )
  }
  render() {
    return (
      <nav
        className="navbar is-danger is-fixed-top"
        role="navigation"
        aria-label="main navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link
              to="/"
              onClick={e => this.close(e, '/')}
              className="navbar-item">
              <span className="title is-4 has-text-white">MVBOA</span>
            </Link>
            <div
              onClick={this.handleToggle}
              role="button"
              className={`navbar-burger${
                this.state.isActive ? ' is-active' : ''
              }`}
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
              fontWeight: '600',
              letterSpacing: '0.05em',
            }}
            className={`navbar-menu${this.state.isActive ? ' is-active' : ''}`}>
            <div className="navbar-start" />
            <div
              className={`navbar-end is-size-4-touch has-text-centered ${touchOnlyPadding}`}>
              <Link
                to="/members"
                onClick={e => this.close(e, '/members')}
                className="navbar-item">
                Members
              </Link>
              <Link
                to="/links"
                onClick={e => this.close(e, '/links')}
                className="navbar-item">
                Links
              </Link>
              <Link
                to="/documents"
                onClick={e => this.close(e, '/documents')}
                className="navbar-item">
                Documents
              </Link>
              <Link
                to="/"
                onClick={e => this.close(e, '/')}
                className="navbar-item">
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
