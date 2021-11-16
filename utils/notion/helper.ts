import { Client } from '@notionhq/client'

import { DATABASES, ROUTE_TYPES, SEO, SLUG__HOMEPAGE, TAGS } from '~config/websites'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

const PROPERTIES = {
  addressCity: 'Address.City',
  addressLatitude: 'Address.GeoLat',
  addressLongitude: 'Address.GeoLng',
  addressNeighborhood: 'Address.Neighborhood',
  addressState: 'Address.State',
  addressStreet: 'Address.Street',
  addressZipCode: 'Address.PostalCode',
  authors: 'Authors',
  categories: 'Category',
  date: 'Date',
  datePublished: 'Date.Published',
  dateRecorded: 'Date.Recorded',
  duration: 'Duration',
  email: 'Email',
  episode: 'Episode',
  episodes: 'EpisodeIDs',
  episodesPeopleGuest: 'Episodes.People.Guest',
  episodesPeopleSoundEngineer: 'Episodes.People.SoundEngineer',
  episodesPeopleThanks: 'Episodes.People.Thanks',
  episodesVenues: 'Episodes.Venues.RecordAt',
  events: 'EventIDs',
  eventsLineupShowIds: 'Lineup.ShowIDs',
  explicit: 'Explicit',
  festivals: 'Festival',
  food: 'Food',
  mp3: 'MP3',
  name: 'Name',
  nameFirst: 'Name.First',
  nameLast: 'Name.Last',
  namePreferred: 'Name.Preferred',
  noIndex: 'NoIndex',
  peopleCast: 'People.Cast',
  peopleCastGuest: 'People.CastGuest',
  peopleCastPast: 'People.CastPast',
  peopleCrew: 'People.Crew',
  peopleCrewPast: 'People.CrewPast',
  peopleDirector: 'People.Director',
  peopleDirectorMusical: 'People.DirectorMusical',
  peopleDirectorTechnical: 'People.DirectorTechnical',
  peopleGuest: 'People.Guest',
  peopleHost: 'People.Host',
  peopleProducer: 'People.Producer',
  peopleMusic: 'People.Music',
  peopleSoundEngineer: 'People.SoundEngineer',
  peopleThanks: 'People.Thanks',
  peopleWriter: 'People.Writer',
  phoneNumber: 'Phone',
  podcastAuthor: 'Author',
  podcastAuthorEmail: 'Author.Email',
  podcasts: 'PodcastIDs',
  podcastsPeopleHost: 'Podcasts.People.Host',
  published: 'Published',
  // rollupLineupTitle: 'Rollup.Lineup.Titles',
  rollupCast: 'Rollup.Cast',
  rollupCastGuest: 'Rollup.CastGuest',
  rollupCastPast: 'Rollup.CastPast',
  rollupCrew: 'Rollup.Crew',
  rollupDirector: 'Rollup.Director',
  rollupDirectorMusical: 'Rollup.DirectorMusical',
  rollupDirectorTechnical: 'Rollup.DirectorTechnical',
  rollupGuest: 'Rollup.Guest',
  rollupHost: 'Rollup.Host',
  rollupLineup: 'Rollup.Lineup',
  rollupMusic: 'Rollup.Music',
  rollupProducer: 'Rollup.Producer',
  rollupShow: 'Rollup.Show',
  rollupSoundEngineer: 'Rollup.SoundEngineer',
  rollupTags: 'Rollup.Tags',
  rollupTagsSecondary: 'Rollup.Tags.Secondary',
  rollupThanks: 'Rollup.Thanks',
  rollupVenue: 'Rollup.Venue',
  rollupWriter: 'Rollup.Writer',
  season: 'Season',
  seoDescription: 'SEO.Description',
  seoImage: 'SEO.Image',
  seoImageDescription: 'SEO.Image.Description',
  shows: 'ShowIDs',
  showsPeopleCast: 'Shows.People.Cast',
  showsPeopleCastPast: 'Shows.People.CastPast',
  showsPeopleCrew: 'Shows.People.Crew',
  showsPeopleDirector: 'Shows.People.Director',
  showsPeopleDirectorMusical: 'Shows.People.DirectorMusical',
  showsPeopleDirectorTechnical: 'Shows.People.DirectorTechnical',
  showsPeopleMusic: 'Shows.People.Music',
  showsPeopleProducer: 'Shows.People.Producer',
  showsPeopleThanks: 'Shows.People.Thanks',
  showsPeopleWriter: 'Shows.People.Writer',
  showsTags: 'Rollup.Shows.Tags',
  slug: 'Slug',
  socialFacebook: 'Social.Facebook',
  socialInstagram: 'Social.Instagram',
  socialTwitter: 'Social.Twitter',
  spotifyShow: 'Spotify.Show',
  subtitle: 'Subitle',
  tags: 'Tags',
  tailwindColorBackground: 'Tailwind.Color.Background',
  ticketUrl: 'TicketUrl',
  title: 'Title',
  type: 'Type',
  venues: 'VenueIDs',
  venuesSlugs: 'Rollup.Venues.Slug',
  venuesRecordedAt: 'Venues.RecordedAt',
}

const dateTimestamp = new Date().toISOString()
// const dateTimestampBlog = new Date('2020-01-01').toISOString()

const QUERIES = {
  dateBefore: {
    property: PROPERTIES.date,
    date: {
      before: dateTimestamp,
    },
  },
  dateOnOrAfter: {
    property: PROPERTIES.date,
    date: {
      on_or_after: dateTimestamp,
    },
  },
  published: {
    property: PROPERTIES.published,
    checkbox: {
      equals: false,
    },
  },
  slug: {
    property: PROPERTIES.slug,
    text: {
      equals: '',
    },
  },
}

export {
  notion,
  DATABASES,
  PROPERTIES,
  QUERIES,
  SEO,
  SLUG__HOMEPAGE,
  ROUTE_TYPES,
  TAGS,
}
