import {
  Banner,
  Container,
  Flex,
  // IconButton,
  Link,
  Separator,
  Text,
} from '@jeromefitz/design-system/components'
// import { darkTheme } from '@jeromefitz/design-system/stitches.config'
import { ArrowTopRightIcon, CalendarIcon } from '@radix-ui/react-icons'
import NextLink from 'next/link'

import { Media } from '~context/Media'
import { Shadows } from '~styles/const'

// @todo(dynamic) notion api, upcoming event or evergreen info
const meta = {
  left: 'FRI 02/25',
  leftExtended: 'FRI 02/25 09:30PM',
  leftIcon: <CalendarIcon />,
  right: 'The Playlist',
  rightExtended: 'The Playlist: Kalyani Singh',
  rightIcon: <ArrowTopRightIcon />,
  url: '/events/2022/02/25/the-playlist',
}

const _Banner = () => {
  return (
    <Container breakout css={{ zIndex: '99' }}>
      <NextLink href={meta.url} passHref>
        <Link>
          <Banner
            css={{
              // backgroundImage: Gradients.light.active,
              // [`.${darkTheme} &`]: { backgroundImage: Gradients.dark.active },
              boxShadow: Shadows[1],
              py: '$2',
              width: '100%',
            }}
            variant="violet"
          >
            <CalendarIcon />
            <Media at="xs">
              <Text css={{ fontWeight: 500 }} size="2">
                {meta.left}
              </Text>
            </Media>
            <Media greaterThan="xs">
              <Text css={{ fontWeight: 500 }} size="2">
                {meta.leftExtended}
              </Text>
            </Media>
            <Separator orientation="vertical" />
            <Flex direction="row" gap="1">
              <Media at="xs">
                <Text css={{ fontWeight: 500 }} size="2">
                  {meta.right}
                </Text>
              </Media>
              <Media greaterThan="xs">
                <Text css={{ fontWeight: 500 }} size="2">
                  {meta.rightExtended}
                </Text>
              </Media>
              {meta.rightIcon}
            </Flex>

            {/* <IconButton
              css={{ mr: '$4', position: 'absolute', right: 0 }}
              variant="ghost"
            >
              <Cross1Icon />
            </IconButton> */}
          </Banner>
        </Link>
      </NextLink>
    </Container>
  )
}

export { _Banner as Banner }
