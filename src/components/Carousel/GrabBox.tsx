import { styled } from '@jeromefitz/design-system/stitches.config'

const GrabBox = styled('div', {
  cursor: 'grab',
  '&:active': { cursor: 'grabbing' },

  // Fill in spaces between slides
  mr: '-$$gap',
  pr: '$$gap',
})

export default GrabBox
