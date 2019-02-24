import React from 'react'
import styled from '@emotion/styled'

export function AdImage() {
  return (
    <AdRow href="https://purchaseofficials.com">
      <img
        src="https://res.cloudinary.com/idaeo/image/upload/v1539871611/mvboa/purchase_officials_light.png"
        alt="Purchase Officials"
      />
    </AdRow>
  )
}

const AdRow = styled('a')`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 20rem;
    border: 25px solid white;
    outline: 2px solid #555;
  }
  padding: 1.5em;
  margin-bottom: 1rem;
`
