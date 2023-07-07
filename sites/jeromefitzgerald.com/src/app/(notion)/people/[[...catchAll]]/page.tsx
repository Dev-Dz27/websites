import type { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import isEqual from 'lodash/isEqual'
import uniqWith from 'lodash/uniqWith'
import type { Metadata } from 'next'

import { getDataFromCache } from '~app/(cache)'
import { CONSTANTS } from '~app/(notion)/(config)/constants'
import type { PageObjectResponsePerson } from '~app/(notion)/(config)/segments'
import { getPersonData } from '~app/(notion)/(config)/segments'
import {
  getPropertyTypeData,
  getSegmentInfo,
  getDatabaseQuery,
} from '~app/(notion)/(config)/utils'

import { Listing } from './People.Listing'
import { Slug } from './Person.Slug'

const isDev = process.env.NODE_ENV === 'development'
const { DATABASE_ID, SEGMENT } = CONSTANTS.PEOPLE

// export const dynamic = 'auto'
// export const dynamicParams = true
// export const fetchCache = 'default-cache'
// export const revalidate = TIME.MINUTE
// export const runtime = 'nodejs'

export async function generateMetadata({ ...props }): Promise<Metadata> {
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })
  const data = await getDataFromCache({
    database_id: segmentInfo.isIndex ? '' : DATABASE_ID,
    filterType: 'equals',
    segmentInfo,
  })

  const isPublished =
    getPropertyTypeData(data?.page?.properties, 'Is.Published') || false
  // console.dir(data?.page?.properties)

  return isPublished
    ? data?.seo
    : { title: `404 | ${segmentInfo?.segment} | ${process.env.NEXT_PUBLIC__SITE}` }
}

async function _generateStaticParams({ ...props }) {
  // @todo(types)
  const segments: any = [{ catchAll: [] }]
  const combos: any = []

  console.dir(`> generateStaticParams (${SEGMENT})`)
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })
  // const data = await getDataFromCache({
  //   database_id: '',
  //   filterType: 'equals',
  //   segmentInfo,
  // })
  const dataStatic: QueryDatabaseResponse = await getDatabaseQuery({
    database_id: DATABASE_ID,
    filterType: 'starts_with',
    segmentInfo,
  })
  const hasContent = dataStatic?.results?.length > 0

  /**
   * @note(next)   Do not pass the `SEGMENT` itself, comes from Next
   * @note(notion) Modified Slug.Preview is what we are looking for.
   */
  if (hasContent) {
    dataStatic.results.map((item: PageObjectResponsePerson) => {
      const { properties } = item
      const { isPublished } = getPersonData(properties)
      if (!isPublished) return
      // const propertyTypeData: any = getPropertyTypeData(properties, 'Slug.Preview')
      // const href = propertyTypeData?.string.replaceAll(`/${SEGMENT}/`, '')
      const href = getPropertyTypeData(properties, 'Slug.Preview')?.replaceAll(
        `/${SEGMENT}/`,
        ''
      )
      const catchAll = href.split('/')
      segments.push({ catchAll })
      if (catchAll.length > 0) {
        for (let index = 0; index < catchAll.length; index++) {
          const element = catchAll.slice(0, index)
          element.length > 0 && combos.push({ catchAll: element })
        }
      }
    })
  }
  const routes = !!combos && uniqWith(combos, isEqual)
  !!routes && console.dir(`routes: turned off for now`)
  !!routes && console.dir(routes)
  // !!routes && routes.map((route) => segments.push(route))

  // console.dir(segments)

  return segments
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateStaticParams = isDev ? undefined : _generateStaticParams
// export { generateStaticParams }

export default function Page({ preview = false, revalidate = false, ...props }) {
  const segmentInfo = getSegmentInfo({ SEGMENT, ...props })

  if (segmentInfo.isIndex) {
    return (
      <Listing preview={preview} revalidate={revalidate} segmentInfo={segmentInfo} />
    )
  }
  return <Slug preview={preview} revalidate={revalidate} segmentInfo={segmentInfo} />
}
