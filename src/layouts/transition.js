import React from 'react'
import posed, { PoseGroup } from 'react-pose'

const timeout = 200

const RoutesContainer = posed.div({
  enter: { delay: timeout, beforeChildren: true, delayChildren: timeout },
})

class Transition extends React.PureComponent {
  render() {
    console.log('transition..')
    const { children, location } = this.props

    // To enable page transitions on mount / initial load,
    // use the prop `animateOnMount={true}` on `PoseGroup`.
    return (
      <PoseGroup id="pose-group" animateOnMount>
        <RoutesContainer id="routes-container" key={location.pathname}>
          {children}
        </RoutesContainer>
      </PoseGroup>
    )
  }
}

export default Transition
