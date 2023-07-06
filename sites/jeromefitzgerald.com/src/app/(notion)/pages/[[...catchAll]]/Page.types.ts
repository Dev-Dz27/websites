import type {
  FormulaPropertyItemObjectResponse,
  PageObjectResponse,
  RichTextPropertyItemObjectResponse,
  TitlePropertyItemObjectResponse,
} from '@notionhq/client/build/src/api-endpoints'
import type { Spread } from 'next-notion/src/Notion.types'

type PropertiesPage = {
  'Slug.Preview': RichTextPropertyItemObjectResponse
  ID: FormulaPropertyItemObjectResponse
  Title: TitlePropertyItemObjectResponse
}
type PageObjectResponseVenue = Spread<
  [PageObjectResponse, { properties: PropertiesPage }]
>

export type { PageObjectResponseVenue, PropertiesPage }