import { TagIcon } from '@heroicons/react/outline'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import _map from 'lodash/map'
import _size from 'lodash/size'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import _title from 'title'

import {
  Box,
  Carousel,
  CarouselSlideList,
  CarouselSlide,
  CarouselNext,
  CarouselPrevious,
  Flex,
  Heading,
  Paragraph,
  Section,
  Text,
} from '@jeromefitz/design-system/components'
import { HeroImage } from '@jeromefitz/design-system/components/Hero/HeroImage'
import { darkTheme, styled } from '@jeromefitz/design-system/stitches.config'

import { CarouselArrowButton, GrabBox, FocusArea } from '~components/Carousel'
import { Breakout } from '~components/Container'
import useSpotify from '~hooks/useSpotify'
import fetcher from '~lib/fetcher'

import { backgrounds } from './index.props'

const HOUR = 3600000
// const MINUTE = 60000
// const SECOND = 1000

const DEFAULT_URL = '/api/spotify/top-tracks'

const css_info = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '0.5rem',
}

const css_icon = {
  marginTop: '3px',
  width: '1rem',
}

const backgroundsSize = _size(backgrounds)
const info = {
  error: {
    text: 'Hrm, Spotify API is down.',
    cta: 'Please check back later',
  },
  loading: {
    text: 'Computers ‘puting....',
    cta: '– Cam’ron',
  },
  success: {
    text: 'Click any link to the left',
    cta: 'Join on Spotify',
  },
}

const TA = () => {
  const [url, urlSet] = useState(
    DEFAULT_URL + `?limit=20&offset=0&time_range=short_term`
  )
  const {
    data: { time_range },
  } = useSpotify()

  const { data, error } = useSWR(url, fetcher, {
    refreshInterval: HOUR,
    revalidateOnFocus: false,
  })

  useEffect(() => {
    urlSet(DEFAULT_URL + `?limit=20&offset=0&time_range=${time_range}`)
    return () => {}
  }, [time_range])

  const loading = !data && !error
  const tracks = data?.items || []
  const hasError = !loading && _size(tracks) === 0

  const lastUsedFocusArea = React.useRef<HTMLElement>(null)
  const isRoving = React.useRef(false)

  React.useEffect(() => {
    lastUsedFocusArea.current = document.querySelector('[data-focus-area]')
  }, [])

  const onFocusAreaFocus = React.useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      lastUsedFocusArea.current = event.currentTarget
    },
    []
  )

  // We are implementing a simple roving tab index with some tweaks
  const onFocusAreaKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.target === event.currentTarget) {
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          const allAreas = Array.from(
            document.querySelectorAll<HTMLElement>('[data-focus-area]')
          )
          const thisIndex = allAreas.findIndex((el) => el === event.currentTarget)
          const nextIndex = Math.min(thisIndex + 1, allAreas.length - 1)
          const nextDemo = allAreas[nextIndex]
          isRoving.current = true
          nextDemo.focus()
          ;(nextDemo as any).scrollIntoViewIfNeeded?.(true)
          lastUsedFocusArea.current = nextDemo
          isRoving.current = false
        }

        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          const allAreas = Array.from(
            document.querySelectorAll<HTMLElement>('[data-focus-area]')
          )
          const thisIndex = allAreas.findIndex((el) => el === event.currentTarget)
          const prevIndex = Math.max(thisIndex - 1, 0) // thisIndex - 1 >= 0 ? thisIndex - 1 : allAreas.length - 1;
          const prevDemo = allAreas[prevIndex]
          isRoving.current = true
          prevDemo.focus()
          ;(prevDemo as any).scrollIntoViewIfNeeded?.(true)
          lastUsedFocusArea.current = prevDemo
          isRoving.current = false
        }

        // Tab key press moves focus to the next element after the carousel
        if (event.key === 'Tab' && event.shiftKey === false) {
          const selector =
            'a, button, input, select, textarea, [data-focus-area-exit]'
          const elements = Array.from(
            document.querySelectorAll<HTMLElement>(selector)
          ).filter(
            (element) =>
              element.tabIndex !== -1 || element.hasAttribute('data-focus-area-exit')
          )

          // Find last exit guard
          elements.reverse()
          const lastExit = elements.find((el) =>
            el.matches('[data-focus-area-exit]')
          )
          elements.reverse()
          const lastExitIndex = elements.indexOf(lastExit)
          const nextElement = elements[lastExitIndex + 1]

          if (nextElement) {
            event.preventDefault()
            nextElement.focus()
          }
        }

        // Shift + Tab key press moves focus to the previous element before the carousel
        if (event.key === 'Tab' && event.shiftKey) {
          const selector =
            'a, button, input, select, textarea, [data-focus-area-entry]'
          const elements = Array.from(
            document.querySelectorAll<HTMLElement>(selector)
          ).filter(
            (element) =>
              element.tabIndex !== -1 ||
              element.hasAttribute('data-focus-area-entry')
          )

          // Find first entry guard
          const firstEntry = elements.find((el) =>
            el.matches('[data-focus-area-entry]')
          )
          const firstEntryIndex = elements.indexOf(firstEntry)
          const prevElement = elements[firstEntryIndex - 1]

          if (prevElement) {
            event.preventDefault()
            prevElement.focus()
          }
        }
      }
    },
    []
  )

  React.useEffect(() => {
    // @todo(complexity) 11
    // eslint-disable-next-line complexity
    const tabListener = (event: KeyboardEvent) => {
      // Catch that Tab that lands into carousel contents from
      // elsewhere, and redirect focus to the nearest focus area
      if (
        event.key === 'Tab' &&
        event.shiftKey === false &&
        event.target instanceof HTMLElement &&
        !event.target.hasAttribute('data-focus-area')
      ) {
        const selector =
          'a, button, input, select, textarea, [data-focus-area-entry]'
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(selector)
        ).filter(
          (element) =>
            element.tabIndex !== -1 ||
            element === event.target ||
            element.hasAttribute('data-focus-area-entry')
        )

        // Find first entry guard
        const firstEntryIndex = elements.findIndex((el) =>
          el.hasAttribute('data-focus-area-entry')
        )

        if (elements.indexOf(event.target) + 1 === firstEntryIndex) {
          event.preventDefault()
          lastUsedFocusArea.current?.focus()
        }
      }

      // Catch that Shift + Tab that lands into carousel contents from
      // elsewhere, and redirect focus to the nearest focus area
      if (
        event.key === 'Tab' &&
        event.shiftKey &&
        event.target instanceof HTMLElement &&
        !event.target.hasAttribute('data-focus-area')
      ) {
        const selector = 'a, button, input, select, textarea, [data-focus-area-exit]'
        const elements = Array.from(
          document.querySelectorAll<HTMLElement>(selector)
        ).filter(
          (element) =>
            element.tabIndex !== -1 ||
            element === event.target ||
            element.hasAttribute('data-focus-area-exit')
        )

        // Find last exit guard
        elements.reverse()
        const lastExit = elements.find((el) =>
          el.hasAttribute('data-focus-area-exit')
        )
        elements.reverse()
        const lastExitIndex = elements.indexOf(lastExit)

        if (elements.indexOf(event.target) - 1 === lastExitIndex) {
          event.preventDefault()
          lastUsedFocusArea.current?.focus()
        }
      }
    }

    document.addEventListener('keydown', tabListener)
    return () => document.removeEventListener('keydown', tabListener)
  }, [])

  return (
    <Section
      css={{
        paddingTop: '$4',
        // Starting at 850px viewport height, grow the padding top from $5 until it's $9.
        '@media (min-width: 900px) and (min-height: 850px)': {
          paddingTop: 'min($9, calc($5 + 0.35 * (100vh - 850px)))',
        },
      }}
    >
      <Breakout>
        <Box css={{ position: 'relative' }}>
          <Carousel>
            <CarouselSlideList
              css={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridAutoColumns: 'min-content',
                ox: 'auto',
                oy: 'hidden',
                py: '$1',
                WebkitOverflowScrolling: 'touch',

                // Gap between slides
                $$gap: '$space$5',

                // calculate the left padding to apply to the scrolling list
                // so that the carousel starts aligned with the container component
                // the "1145" and "$5" values comes from the <Container /> component
                '$$scroll-padding': 'max($$gap, calc((100% - 1145px) / 2 + $$gap))',
                pl: '$$scroll-padding',

                // hide scrollbar
                MsOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },

                // Can't have nice grid gap because Safari butchers scroll padding with it
                '& > *': {
                  pr: '$$gap',
                },
              }}
            >
              {/* {rangeMap(10, (i) => { */}
              {/* {_map(artists, (artist, i) => { */}
              {_map(tracks, (track, i: number) => {
                const bgIndex = i > backgroundsSize ? backgroundsSize : i

                // @hack for testing
                // const _href = artist.external_urls.spotify
                // const _title1 = artist.name
                // const _title2 = ''
                // const _title3 = ''
                // const _meta = artist.image
                // const _genres = artist.genres
                // const _alt = `Photo of ${artist.name}`
                console.dir(track)
                const _href = track.external_urls.spotify
                const _title1 = track.artist
                const _title2 = `“${track.name}”`
                const _title3 = `${
                  track.album.name
                } (${track.album.release_date.slice(0, 4)})`
                const _meta = track.album.image
                const _genres = track.genres
                const _alt = `Image of ${track.artist}’s “${track.album.name}” album cover`

                const genres = _map(_genres.slice(0, 5), (genre) =>
                  _title(genre)
                ).join(', ')

                const genresExtra =
                  _genres.length > 4 &&
                  _genres.length - 5 > 0 &&
                  `, + ${_genres.length - 5} more`
                return (
                  <CarouselSlide key={`tt-${i}`}>
                    <FocusArea
                      aria-label="Dialog component demo"
                      onKeyDown={onFocusAreaKeyDown}
                      onFocus={onFocusAreaFocus}
                    >
                      <SlideContainer
                        aria-hidden
                        css={{
                          background: backgrounds[bgIndex]?.light,
                          [`.${darkTheme} &`]: {
                            background: backgrounds[bgIndex]?.dark,
                          },
                          overflow: 'hidden',
                          ai: 'end',
                          jc: 'center',
                          ac: 'center',

                          // backgroundImage: `url(${artist.meta.base64})`,
                          backgroundSize: 'cover',
                          // backgroundColor: 'rgba(0, 0, 0, 0.61)',
                          backdropFilter: 'blur(10px)',
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.1)',
                          [`.${darkTheme} &`]: {
                            boxShadow: '0px 5px 30px -5px rgba(255, 255, 255, 0.1)',
                          },
                          '@hover': {
                            '&:hover': {
                              boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.5)',
                              [`.${darkTheme} &`]: {
                                boxShadow:
                                  '0px 5px 30px -5px rgba(255, 255, 255, 0.3)',
                              },
                              '& img': {
                                transform: 'scale(1.02)',
                              },
                            },
                          },
                          '&:focus': {
                            boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.5)',
                            [`.${darkTheme} &`]: {
                              boxShadow:
                                '0px 5px 30px -5px rgba(255, 255, 255, 0.3)',
                            },
                            '& img': {
                              transform: 'scale(1.02)',
                            },
                          },
                          '&:active': {
                            boxShadow: '0px 5px 30px -5px rgba(0, 0, 0, 0.5)',
                            [`.${darkTheme} &`]: {
                              boxShadow:
                                '0px 5px 30px -5px rgba(255, 255, 255, 0.3)',
                            },
                            '& img': {
                              transform: 'scale(1.02)',
                            },
                          },
                          transition: 'all 0.2s ease-in-out',
                          mt: '$4',
                          '@media (prefers-reduced-motion)': {
                            transition: 'none',
                            transform: 'none',
                          },
                        }}
                        href={_href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <HeroImage alt={_alt} meta={_meta} />
                      </SlideContainer>
                    </FocusArea>
                    <GrabBox css={{ m: '$1', pt: '$1' }}>
                      <Text
                        as="h3"
                        size="5"
                        css={{ fontWeight: 500, lineHeight: '1.75' }}
                      >
                        {/* {lpad(i + 1)}. */}
                        {_title1}
                      </Text>
                      {!!_title2 && (
                        <>
                          <Text
                            as="p"
                            size="4"
                            variant="gray"
                            css={{ lineHeight: '1.5' }}
                          >
                            {_title2}
                          </Text>
                          <Text
                            as="p"
                            size="3"
                            variant="gray"
                            css={{ lineHeight: '1.25' }}
                          >
                            {_title3}
                          </Text>
                        </>
                      )}
                      {genres && (
                        <Box role="listitem" css={{ ...css_info, my: '$2' }}>
                          <TagIcon className="hi2ri" style={css_icon} />
                          <Text
                            as="p"
                            size="2"
                            variant="gray"
                            css={{ lineHeight: '1.25' }}
                          >
                            {genres}
                            {genresExtra}
                          </Text>
                        </Box>
                      )}
                    </GrabBox>
                  </CarouselSlide>
                )
              })}
              <CarouselSlide>
                <FocusArea onKeyDown={onFocusAreaKeyDown} onFocus={onFocusAreaFocus}>
                  <SlideContainer
                    css={{
                      // backgroundColor: '$whiteA6',
                      boxShadow: '0 0 0 1px $colors$slateA5',
                      // [`.${darkTheme} &`]: {
                      //   backgroundColor: '$blackA4',
                      // },
                      backgroundColor: '$spotify-green',
                      mt: '$4',
                    }}
                  >
                    <Flex align="center" direction="column" gap="2">
                      <Text size="2" css={{ color: '$spotify-black' }}>
                        {loading
                          ? info.loading.text
                          : hasError
                          ? info.error.text
                          : info.success.text}
                      </Text>
                      <Text size="3">
                        {/* <NextLink href="/shows" passHref>
                          <Link
                            css={{ display: 'inline-flex', alignItems: 'center' }}
                          > */}
                        {loading
                          ? info.loading.cta
                          : hasError
                          ? info.error.cta
                          : info.success.cta}
                        {/* <ArrowRightIcon />
                          </Link>
                        </NextLink> */}
                      </Text>
                    </Flex>
                  </SlideContainer>
                </FocusArea>
              </CarouselSlide>
            </CarouselSlideList>

            <Box
              css={{
                position: 'absolute',
                top: 'calc(50% - $7)',
                left: '15px',
              }}
            >
              <CarouselPrevious
                aria-label="Show next demo"
                tabIndex={-1}
                as={CarouselArrowButton}
              >
                <ArrowLeftIcon />
              </CarouselPrevious>
            </Box>
            <Box
              css={{
                position: 'absolute',
                top: 'calc(50% - $7)',
                right: '15px',
              }}
            >
              <CarouselNext
                aria-label="Show previous demo"
                tabIndex={-1}
                as={CarouselArrowButton}
              >
                <ArrowRightIcon />
              </CarouselNext>
            </Box>
          </Carousel>
        </Box>
      </Breakout>
    </Section>
  )
}

const TAContainer = () => {
  return (
    <Box css={{ position: 'relative', mt: '$2' }}>
      <Heading size="3" as="h2" css={{ my: '$2' }}>
        Top Tracks
      </Heading>
      <Paragraph
        size="2"
        as="p"
        css={{ color: '$colors$gray11', mt: '$1', mb: '$3' }}
      >
        Sometimes I tend to play the same song over and over again (and over and over
        again).
      </Paragraph>
      <TA />
    </Box>
  )
}

const SlideContainer = styled('a', {
  display: 'flex',
  position: 'relative',
  ai: 'center',
  jc: 'center',
  width: 300,
  height: 300,
  borderRadius: '$3',
  mb: '$2',

  // Content slightly above vertical center feels perfectly centred
  pb: '$3',

  // Can't select text because the carousel is draggable
  userSelect: 'none',
  // cursor: 'default',

  '@bp1': {
    width: 400,
    height: 400,
  },
})

export default TAContainer