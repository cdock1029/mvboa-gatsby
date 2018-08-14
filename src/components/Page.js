import React from 'react'
import PageTransition from 'gatsby-plugin-page-transitions'
import { cx } from 'react-emotion'

export const Page = ({ children, className }) => (
  <PageTransition>
    <div className={cx('container', className)}>
      <div className="columns is-desktop">
        <div className="column is-three-fifths-desktop is-offset-one-fifth-desktop">
          {children}
        </div>
      </div>
    </div>
  </PageTransition>
)
