import { Heading } from '@jeromefitz/design-system'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const heading_2 = ({ content, id }) => {
  return (
    <Heading as="h3" css={{ mb: '$4', mt: '$4', '@bp1': { mt: 0 } }} size="2">
      {getContentTypeDetail({ content, id })}
    </Heading>
  )
}

export default heading_2
