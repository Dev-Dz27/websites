import _filter from 'lodash/filter'
import _map from 'lodash/map'
import _orderBy from 'lodash/orderBy'

const STATUS = {
  IN_PROGRESS: {
    id: 'IN_PROGRESS',
    emoji: '📚️',
    slug: 'in-progress',
    title: 'Currently Reading',
  },
  COMPLETE: {
    id: 'COMPLETE',
    emoji: '🏁️',
    slug: 'complete',
    title: 'Complete',
  },
  PENDING: {
    id: 'PENDING',
    emoji: '🔜️',
    slug: 'pending',
    title: 'Upcoming',
  },
}

const data = {
  'real-artists-have-day-jobs': {
    id: 'real-artists-have-day-jobs',
    slug: 'real-artists-have-day-jobs',
    title: 'Real Artists Have Day Jobs',
    subtitle: 'And Other Awesome Things They Don’t Teach You In School',
    status: STATUS.COMPLETE.id,
    author: 'Sara Benincasa',
  },
  'free-play': {
    id: 'free-play',
    slug: 'free-play',
    title: 'Free Play',
    subtitle: 'Improvisation in Life And Art',
    status: STATUS.IN_PROGRESS.id,
    author: 'Stephen Nachmanovitch',
  },
  'the-power-broker': {
    id: 'the-power-broker',
    slug: 'the-power-broker',
    title: 'The Power Broker',
    subtitle: 'Robert Moses and the Fall of New York',
    status: STATUS.IN_PROGRESS.id,
    author: 'Robert A. Caro',
  },
  'fire-shut-up-in-my-bones': {
    id: 'fire-shut-up-in-my-bones',
    slug: 'fire-shut-up-in-my-bones',
    title: 'Fire Shut Up in My Bones',
    subtitle: 'A Memoir',
    status: STATUS.PENDING.id,
    author: 'Charles M. Blow',
  },
  'the-art-of-doing-science-and-engineering': {
    id: 'the-art-of-doing-science-and-engineering',
    slug: 'the-art-of-doing-science-and-engineering',
    title: 'The Art of Doing Science and Engineering',
    subtitle: 'Learning to Learn',
    status: STATUS.PENDING.id,
    author: 'Richard W. Hamming',
  },
  'the-lady-with-the-borzoi': {
    id: 'the-lady-with-the-borzoi',
    slug: 'the-lady-with-the-borzoi',
    title: 'The Lady With The Borzoi',
    subtitle: 'Blanche Knopf, Literary Tastemaker Extraordinaire',
    status: STATUS.PENDING.id,
    author: 'Laura Claridge',
  },
  'lyndon-johnson-and-the-american-dream': {
    id: 'lyndon-johnson-and-the-american-dream',
    slug: 'lyndon-johnson-and-the-american-dream',
    title: 'Lyndon Johnson & The American Dream',
    subtitle: '',
    status: STATUS.PENDING.id,
    author: 'Doris Kearns',
  },
  'mike-nichols': {
    id: 'mike-nichols',
    slug: 'mike-nichols',
    title: 'Mike Nichols',
    subtitle: 'A Life',
    status: STATUS.PENDING.id,
    author: 'Mark Harris',
  },
  'an-elegant-puzzle': {
    id: 'an-elegant-puzzle',
    slug: 'an-elegant-puzzle',
    title: 'An Elegant Puzzle',
    subtitle: 'Systems of Engineering Management',
    status: STATUS.COMPLETE.id,
    author: 'Will Larson',
  },
  'song-of-achilles': {
    id: 'song-of-achilles',
    slug: 'song-of-achilles',
    title: 'Song of Achilles',
    subtitle: '',
    status: STATUS.COMPLETE.id,
    author: 'Madeline Miller',
  },
  circe: {
    id: 'circe',
    slug: 'circe',
    title: 'Circe',
    subtitle: '',
    status: STATUS.COMPLETE.id,
    author: 'Madeline Miller',
  },
  'what-doesnt-kill-you-makes-you-blacker': {
    id: 'what-doesnt-kill-you-makes-you-blacker',
    slug: 'what-doesnt-kill-you-makes-you-blacker',
    title: 'What Doesn’t Kill You Makes You Blacker',
    subtitle: 'A Memoir in Essays',
    status: STATUS.COMPLETE.id,
    author: 'Damon Young',
  },
  'the-education-of-an-idealist': {
    id: 'the-education-of-an-idealist',
    slug: 'the-education-of-an-idealist',
    title: 'The Education of an Idealist',
    subtitle: 'A Memoir',
    status: STATUS.COMPLETE.id,
    author: 'Samantha Power',
  },
  wenger: {
    id: 'wenger',
    slug: 'wenger',
    title: 'Wenger',
    subtitle: 'My Life and Lessons in Red and White',
    status: STATUS.COMPLETE.id,
    author: 'Arsène Wenger',
  },
  'the-path-to-power': {
    id: 'the-path-to-power',
    slug: 'the-path-to-power',
    title: 'The Path to Power',
    subtitle: 'The Years of Lyndon Johnson',
    status: STATUS.COMPLETE.id,
    author: 'Robert A. Caro',
  },
  'means-of-ascent': {
    id: 'means-of-ascent',
    slug: 'means-of-ascent',
    title: 'Means of Ascent',
    subtitle: 'The Years of Lyndon Johnson',
    status: STATUS.COMPLETE.id,
    author: 'Robert A. Caro',
  },
  'master-of-the-senate': {
    id: 'master-of-the-senate',
    slug: 'master-of-the-senate',
    title: 'Master of the Senate',
    subtitle: 'The Years of Lyndon Johnson',
    status: STATUS.COMPLETE.id,
    author: 'Robert A. Caro',
  },
  'the-passage-of-power': {
    id: 'the-passage-of-power',
    slug: 'the-passage-of-power',
    title: 'The Passage of Power',
    subtitle: 'The Years of Lyndon Johnson',
    status: STATUS.COMPLETE.id,
    author: 'Robert A. Caro',
  },
  working: {
    id: 'working',
    slug: 'working',
    title: 'Working',
    subtitle: '',
    status: STATUS.COMPLETE.id,
    author: 'Robert A. Caro',
  },
  'funny-man': {
    id: 'funny-man',
    slug: 'funny-man',
    title: 'Funny Man',
    subtitle: 'Mel Brooks',
    status: STATUS.COMPLETE.id,
    author: 'Patrick McGilligan',
  },
  'its-good-to-be-the-king': {
    id: 'its-good-to-be-the-king',
    slug: 'its-good-to-be-the-king',
    title: 'It’s Good To Be The King',
    subtitle: 'The Seriously Funny Life of Mel Brooks',
    status: STATUS.COMPLETE.id,
    author: 'Robert Parish',
  },
  'save-yourself': {
    id: 'save-yourself',
    slug: 'save-yourself',
    title: 'Save Yourself',
    subtitle: 'A Memoir',
    status: STATUS.COMPLETE.id,
    author: 'Cameron Esposito',
  },
  'the-stench-of-honolulu': {
    id: 'the-stench-of-honolulu',
    slug: 'the-stench-of-honolulu',
    title: 'The Stench of Honolulu',
    subtitle: 'A Tropical Adventure',
    status: STATUS.COMPLETE.id,
    author: 'Jack Handey',
  },
  'will-not-attend': {
    id: 'will-not-attend',
    slug: 'will-not-attend',
    title: 'Will Not Attend',
    subtitle: 'Lively Stories of Detachment and Isolation',
    status: STATUS.COMPLETE.id,
    author: 'Adam Resnick',
  },
  robin: {
    id: 'robin',
    slug: 'robin',
    title: 'Robin',
    subtitle: '',
    status: STATUS.COMPLETE.id,
    author: 'Dave Itzkoff',
  },
  'so-anyway': {
    id: 'so-anyway',
    slug: 'so-anyway',
    title: 'So Anyway...',
    subtitle: '',
    status: STATUS.COMPLETE.id,
    author: 'John Cleese',
  },
  creativity: {
    id: 'creativity',
    slug: 'creativity',
    title: 'Creativity',
    subtitle: 'A Short and Cheerful Guide',
    status: STATUS.COMPLETE.id,
    author: 'John Cleese',
  },
  'between-the-world-and-me': {
    id: 'between-the-world-and-me',
    slug: 'between-the-world-and-me',
    title: 'Between The World And Me',
    subtitle: '',
    status: STATUS.COMPLETE.id,
    author: 'Ta-Nehisi Coates',
  },
  'when-they-call-you-a-terrorist': {
    id: 'when-they-call-you-a-terrorist',
    slug: 'when-they-call-you-a-terrorist',
    title: 'When They Call You A Terrorist',
    subtitle: 'A Black Lives Matter Memoir',
    status: STATUS.COMPLETE.id,
    author: 'Patrisse Khan-Cullors & Asha Bandela',
  },
  'things-fall-apart': {
    id: 'things-fall-apart',
    slug: 'things-fall-apart',
    title: 'Things Fall Apart',
    subtitle: '',
    status: STATUS.COMPLETE.id,
    author: 'Chinua Achebe',
  },
  'life-happens': {
    id: 'life-happens',
    slug: 'life-happens',
    title: 'Life Happens',
    subtitle: 'And Other Unavoidable Truths',
    status: STATUS.COMPLETE.id,
    author: 'Connie Schultz',
  },
  'and-his-lovely-wife': {
    id: 'and-his-lovely-wife',
    slug: 'and-his-lovely-wife',
    title: '... and His Lovely Wife',
    subtitle: '',
    status: STATUS.PENDING.id,
    author: 'Connie Schultz',
  },
  raw: {
    id: 'raw',
    slug: 'raw',
    title: 'Raw',
    subtitle: 'My Journey Into the Wu-Tang',
    status: STATUS.COMPLETE.id,
    author: 'Lamont U-G-d Hawkins',
  },
  'we-should-all-be-feminists': {
    id: 'we-should-all-be-feminists',
    slug: 'we-should-all-be-feminists',
    title: 'We Should All Be Feminists',
    subtitle: '',
    status: STATUS.COMPLETE.id,
    author: 'Chimamanda Ngozi Adiche',
  },
  'the-devil-you-know': {
    id: 'the-devil-you-know',
    slug: 'the-devil-you-know',
    title: 'The Devil You Know',
    subtitle: 'A Black Power Manifesto',
    status: STATUS.PENDING.id,
    author: 'Charles M. Blow',
  },
  'the-rise-of-theodore-roosevelt': {
    id: 'the-rise-of-theodore-roosevelt',
    slug: 'the-rise-of-theodore-roosevelt',
    title: 'The Rise of Theodore Roosevelt',
    subtitle: '',
    status: STATUS.PENDING.id,
    author: 'Edmund Morris',
  },
  'theodore-rex': {
    id: 'theodore-rex',
    slug: 'theodore-rex',
    title: 'Theodore Rex',
    subtitle: '',
    status: STATUS.PENDING.id,
    author: 'Edmund Morris',
  },
  'colonel-roosevelt': {
    id: 'colonel-roosevelt',
    slug: 'colonel-roosevelt',
    title: 'Colonel Roosevelt',
    subtitle: '',
    status: STATUS.PENDING.id,
    author: 'Edmund Morris',
  },
  'the-bully-puplit': {
    id: 'the-bully-puplit',
    slug: 'the-bully-puplit',
    title: 'The Bully Pulpit',
    subtitle:
      'Theodore Roosevelt, William Howard Taft, and the Golden Age of Journalism',
    status: STATUS.PENDING.id,
    author: 'Doris Kearns',
  },
  'the-fitzgeralds-and-the-kennedys': {
    id: 'the-fitzgeralds-and-the-kennedys',
    slug: 'the-fitzgeralds-and-the-kennedys',
    title: 'The Fitzgeralds and the Kennedys',
    subtitle: 'An American Saga',
    status: STATUS.PENDING.id,
    author: 'Doris Kearns',
  },
  'a-promised-land': {
    id: 'a-promised-land',
    slug: 'a-promised-land',
    title: 'A Promised Land',
    subtitle: '',
    status: STATUS.PENDING.id,
    author: 'Barack Obama',
  },
  'all-about-me': {
    id: 'all-about-me',
    slug: 'all-about-me',
    title: 'All About Me',
    subtitle: 'My Remarkable Life in Show Business',
    status: STATUS.PENDING.id,
    author: 'Mel Brooks',
  },
  'me-myself-and-why': {
    id: 'me-myself-and-why',
    slug: 'me-myself-and-why',
    title: 'Me, Myself, and Why',
    subtitle: 'Searching for the Science of Self',
    status: STATUS.COMPLETE.id,
    author: 'Jennifer Ouellette',
  },
  overstated: {
    id: 'overstated',
    slug: 'overstated',
    title: 'Overstated',
    subtitle: 'A Coast-to-Coast Roast of the 50 States',
    status: STATUS.COMPLETE.id,
    author: 'Colin Quinn',
  },
  'the-woman-of-troy': {
    id: 'the-woman-of-troy',
    slug: 'the-woman-of-troy',
    title: 'The Woman of Troy',
    subtitle: 'A Novel',
    status: STATUS.PENDING.id,
    author: 'Pat Barker',
  },
  lavinia: {
    id: 'lavinia',
    slug: 'lavinia',
    title: 'Lavinia',
    subtitle: '',
    status: STATUS.PENDING.id,
    author: 'Ursula K. Le Guin',
  },
  'the-silence-of-the-girls': {
    id: 'the-silence-of-the-girls',
    slug: 'the-silence-of-the-girls',
    title: 'The Silence of the Girls',
    subtitle: '',
    status: STATUS.PENDING.id,
    author: 'Pat Barker',
  },
  'a-thousand-ships': {
    id: 'a-thousand-ships',
    slug: 'a-thousand-ships',
    title: 'A Thousand Ships',
    subtitle: 'A Novel',
    status: STATUS.PENDING.id,
    author: 'Natalie Haynes',
  },
  mythos: {
    id: 'mythos',
    slug: 'mythos',
    title: 'Mythos',
    subtitle: 'The Greek Myths Reimagined',
    status: STATUS.PENDING.id,
    author: 'Stephen Fry',
  },
  heroes: {
    id: 'heroes',
    slug: 'heroes',
    title: 'Heroes',
    subtitle: 'The Greek Myths Reimagined',
    status: STATUS.PENDING.id,
    author: 'Stephen Fry',
  },
  troy: {
    id: 'troy',
    slug: 'troy',
    title: 'Troy',
    subtitle: 'The Greek Myths Reimagined',
    status: STATUS.PENDING.id,
    author: 'Stephen Fry',
  },
  'say-nothing': {
    id: 'say-nothing',
    slug: 'say-nothing',
    title: 'Say Nothing',
    subtitle: 'A True Story of Murder and Memory in Northern Ireland',
    status: STATUS.PENDING.id,
    author: 'Patrick Radden Keefe',
  },
  'empire-of-pain': {
    id: 'empire-of-pain',
    slug: 'empire-of-pain',
    title: 'Empire of Pain',
    subtitle: 'The Secret History of the Sackler Dynasty',
    status: STATUS.PENDING.id,
    author: 'Patrick Radden Keefe',
  },
  'shape-up': {
    id: 'shape-up',
    slug: 'shape-up',
    title: 'Shape Up',
    subtitle: 'Stop Running in Circles and Ship Work that Matters',
    status: STATUS.IN_PROGRESS.id,
    author: 'Ryan Singer',
  },
  'domain-driven-design': {
    id: 'domain-driven-design',
    slug: 'domain-driven-design',
    title: 'Domain-Driven Design',
    subtitle: 'Tackling Complexity in the Heart of Software',
    status: STATUS.IN_PROGRESS.id,
    author: 'Eric Evans',
  },
  'the-managers-path': {
    id: 'the-managers-path',
    slug: 'the-managers-path',
    title: 'The Manager’s Path',
    subtitle: 'A Guide for Tech Leaders Navigating Growth and Change',
    status: STATUS.IN_PROGRESS.id,
    author: 'Camille Fournier',
  },
}

const getBooksByStatus = (status) => {
  return _filter(_orderBy(data, ['author', 'slug'], ['asc']), ['status', status])
}

const booksByStatus = _map(STATUS, (status) => {
  return {
    data: getBooksByStatus(status.id),
    ...status,
  }
})

export { STATUS }
export default booksByStatus
