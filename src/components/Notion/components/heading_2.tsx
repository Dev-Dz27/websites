import { Heading } from '@jeromefitz/design-system/components'

import getContentTypeDetail from '../utils/getContentTypeDetail'

const heading_1 = ({ content, id }) => {
  return (
    <Heading as="h3" css={{ fontWeight: '700', mb: '$3' }} size="2">
      {getContentTypeDetail({ content, id })}
    </Heading>
  )
}

export default heading_1