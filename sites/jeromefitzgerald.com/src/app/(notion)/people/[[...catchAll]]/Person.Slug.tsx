import { isObjectEmpty } from '@jeromefitz/utils'
import { notFound } from 'next/navigation'

import { getCustom } from '~app/(cache)/getCustom'
// import { FourOhFour } from '~app/(errors)/404'
import { getPersonData } from '~app/(notion)/(utils)/utils'
import { Notion as Blocks } from '~components/Notion'
import { Relations } from '~components/Relations'
import {
  SectionContent,
  SectionHeader,
  SectionHeaderContent,
  SectionHeaderTitle,
  SectionWrapper,
  Tags,
} from '~components/Section'
import { Testing } from '~components/Testing'

import { DATABASE_ID } from './Person.constants'
import type { PropertiesPerson } from './Person.types'
// import { UpcomingShows } from './Show.UpcomingShows'

type RELATIONS_TYPE = keyof PropertiesPerson
const RELATIONS: RELATIONS_TYPE[] = [
  'Relation.Shows.Cast',
  'Relation.Shows.Producer',
]

async function Slug({ preview, revalidate, segmentInfo }) {
  const data = await getCustom({
    database_id: DATABASE_ID,
    filterType: 'equals',
    preview,
    revalidate,
    segmentInfo,
  })
  const is404 = isObjectEmpty(data?.blocks || {})
  // if (is404) return <FourOhFour isNotPublished={false} segmentInfo={segmentInfo} />
  if (is404) return notFound()

  const { properties }: { properties: PropertiesPerson } = data?.page
  const { isPublished, tags, title } = getPersonData(properties)

  // if (!isPublished)
  //   return <FourOhFour isNotPublished={true} segmentInfo={segmentInfo} />
  if (!isPublished) return notFound()

  return (
    <>
      {/* Content */}
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle isTitle>{title}</SectionHeaderTitle>
          <SectionHeaderContent>
            <Tags tags={tags} />
          </SectionHeaderContent>
        </SectionHeader>
        <SectionContent>
          <Blocks data={data?.blocks} />
        </SectionContent>
      </SectionWrapper>
      {/* Info */}
      <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle>Info</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          <Relations
            properties={properties}
            relations={RELATIONS}
            relationsSecondary={[]}
          />
        </SectionContent>
      </SectionWrapper>
      {/* Upcoming Shows */}
      {/* <SectionWrapper>
        <SectionHeader>
          <SectionHeaderTitle>Upcoming Shows</SectionHeaderTitle>
        </SectionHeader>
        <SectionContent>
          <UpcomingShows properties={properties} />
        </SectionContent>
      </SectionWrapper> */}
      <Testing />
    </>
  )
}

export { Slug }