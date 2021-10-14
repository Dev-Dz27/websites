import dynamic from 'next/dynamic'
// import { useEffect, useState } from 'react'
import useSWR from 'swr'

import Layout from '~components/Layout'
import Page from '~components/Notion/Page'
import { SLUG__HOMEPAGE } from '~lib/constants'
import fetcher from '~lib/fetcher'
import getCatchAll from '~lib/notion/getCatchAll'
import getImages from '~lib/notion/getImages'
import getPathVariables from '~lib/notion/getPathVariables'

const Breadcrumb = dynamic(() => import('~components/Notion/Breadcrumb'), {})
const ListingShows = dynamic(
  () => import('~components/Notion/Listing/ListingCard'),
  {}
)
const Quote = dynamic(() => import('~components/Notion/Quote'), {})

const CatchAll = (props) => {
  const {
    content: contentFallback,
    info: infoFallback,
    // images: imagesFallback,
    items: itemsFallback,
    // hasMeta,
    // isPage,
    // isIndex,
    // meta,
    // routeType,
    slug,
    // url,
  } = props

  // console.dir(`props`)
  // console.dir(props)

  /**
   * @info Odd behavior, but if listing page we need data swapped
   */
  // const [mounted, setMounted] = useState(true)
  // useEffect(() => setMounted(false), [])
  const { data, error } = useSWR(
    () => (!!slug ? `/api/notion/${slug}` : null),
    // () => (!!slug ? `/api/notion/${slug}?cache=${mounted}` : null),
    fetcher,
    {
      fallbackData: {
        info: infoFallback,
        content: contentFallback,
        items: itemsFallback,
      },
      revalidateOnFocus: true,
    }
  )

  /**
   * @error or @loading
   */
  const isError = error !== undefined
  const isDataUndefined =
    data === undefined || data?.content === undefined || data?.info === undefined
  // const isLoading = !isError && isDataUndefined

  if (isError && isDataUndefined)
    <>
      <Layout>
        <Breadcrumb isIndex={true} title={error ? 'Error...' : 'Loading...'} />
      </Layout>
    </>

  return (
    <>
      <Layout>
        <Page data={data} props={props} />
        <ListingShows />
        <div className="spacer--h mb-4" />
        <Quote />
      </Layout>
    </>
  )
}

export const getStaticProps = async ({ preview = false, ...props }) => {
  // const { catchAll } = props.params
  const catchAll = [SLUG__HOMEPAGE]
  const clear = false
  const pathVariables = getPathVariables(catchAll)
  /**
   * @cache
   */
  const cache = true
  const data = await getCatchAll({ cache, catchAll, clear, preview })
  const images = !!data ? await getImages({ data, pathVariables }) : []

  const dataReturn = { ...data, images }
  return { props: { preview, ...dataReturn, ...pathVariables, ...props } }
}

export default CatchAll
