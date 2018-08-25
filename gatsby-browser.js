import React from 'react'
import Transition from './src/layouts/transition'

export const wrapPageElement = ({ element, props }) => {
  return <Transition {...props}>{element}</Transition>
}
