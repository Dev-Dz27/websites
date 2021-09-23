import _filter from 'lodash/filter'
// const isDev = false
const isDev = process.env.NODE_ENV !== 'production'

const navigation = [
  { active: false, href: '/', title: 'home', titleMobile: 'home' },
  { active: false, href: '/blog', title: 'blog', titleMobile: 'blog' },
  { active: false, href: '/comedy', title: 'comedy', titleMobile: 'comedy' },
  {
    active: true,
    href: '/shows',
    title: 'shows',
    titleMobile: 'shows',
  },
  {
    active: true,
    href: '/events',
    title: 'events',
    titleMobile: 'events',
  },
  { active: true, href: '/music', title: 'music', titleMobile: 'music' },
  { active: false, href: '/people', title: 'people', titleMobile: 'people' },
  { active: true, href: '/podcasts', title: 'podcasts', titleMobile: 'podcasts' },
  { active: false, href: '/venues', title: 'venues', titleMobile: 'venues' },
  {
    active: isDev,
    href: '/playground',
    title: 'p',
    titleMobile: 'p',
  },
  {
    active: isDev,
    href: '/events/2020',
    title: 'e',
    titleMobile: 'e',
  },
]

const activeLinks = _filter(navigation, 'active')

export { activeLinks }
export default navigation
