import React from 'react'
import posed, { PoseGroup } from 'react-pose'

// const timeout = 350

const RoutesContainer = posed.div({
  // todo: look into this, delayChildren etc..
  // enter: { delayChildren: timeout /*beforeChildren: true*/ },
  // exit: { delay: timeout },
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
