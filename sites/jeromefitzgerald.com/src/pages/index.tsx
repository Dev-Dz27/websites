import { nextWeirdRoutingSkipData } from 'next-notion/src/constants'
// import { getStaticPathsCatchAll } from 'next-notion/src/getStaticPathsCatchAll'
import { getStaticPropsCatchAll } from 'next-notion/src/getStaticPropsCatchAll'
import { getNotion } from 'next-notion/src/helper'
import { fetcher } from 'next-notion/src/lib/fetcher'
import useSWR from 'swr'

import { Page } from '~components/Layout'
import { notionConfig } from '~config/index'

const notion = getNotion(notionConfig)

const { PAGES__HOMEPAGE } = notionConfig

const PagesIndex = (props) => {
  const {
    content: contentFallback,
    info: infoFallback,
    images: imagesFallback,
    items: itemsFallback,
    slug,
    // url,
  } = props

  const { data, error } = useSWR(
    () => (!!slug ? `/api/v1/cms/${slug}` : null),
    fetcher,
    {
      fallbackData: {
        info: infoFallback,
        content: contentFallback,
        items: itemsFallback,
        images: imagesFallback,
      },
      /**
       * @note(swr): Turned off for the moment for on-demand ISR
       */
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return (
    <>
      <Page data={data} error={error} {...props} />
    </>
  )
}

export const getStaticProps = async ({ preview = false, ...props }) => {
  const catchAll = [PAGES__HOMEPAGE]
  // const { catchAll } = props.params
  if (nextWeirdRoutingSkipData.includes(catchAll[0])) return { props: {} }

  const clear = false
  const pathVariables = notion.custom.getPathVariables({ catchAll })
  const isHomepage = pathVariables?.slug === PAGES__HOMEPAGE

  const data = await getStaticPropsCatchAll({
    catchAll,
    clear,
    notionConfig,
    pathVariables,
    preview,
  })

  return {
    props: { isHomepage, preview, ...data, ...pathVariables, ...props },
    /**
     * @note(next)
     * On-Demand ISR, do not pass revalidate
     *
     * ref: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation-beta
     */
  }
}

// export const getStaticPaths = () => {
//   return getStaticPathsCatchAll(notionConfig)
// }

export default PagesIndex
