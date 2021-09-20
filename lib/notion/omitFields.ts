const omitFields = {
  shows: [
    'info.object',
    'info.created_time',
    'info.last_edited_time',
    'info.parent',
    'info.data.address',
    'info.data.date',
    'info.data.datePublished',
    'info.data.episodesPeopleGuest',
    'info.data.episodesPeopleSoundEngineer',
    'info.data.episodesPeopleThanks',
    'info.data.events',
    // 'info.data.festivals',
    // 'info.data.peopleCast',
    // 'info.data.peopleCastPast',
    // 'info.data.peopleCrew',
    // 'info.data.peopleDirector',
    // 'info.data.peopleDirectorMusical',
    // 'info.data.peopleDirectorTechnical',
    // 'info.data.peopleProducer',
    // 'info.data.peopleThanks',
    // 'info.data.peopleWriter',
    // 'info.data.podcastsPeopleHost',
    'info.data.showsPeopleCastPast',
    'info.data.showsPeopleCrew',
    'info.data.showsPeopleDirector',
    'info.data.showsPeopleDirectorMusical',
    'info.data.showsPeopleDirectorTechnical',
    'info.data.showsPeopleMusic',
    'info.data.showsPeopleProducer',
    'info.data.showsPeopleWriter',
    // 'info.data.social',
    // 'info.data.tags',
  ],
  people: [
    'object',
    'created_time',
    'last_edited_time',
    'parent',
    'data.address',
    'data.date',
    'data.datePublished',
    'data.episodesPeopleGuest',
    'data.episodesPeopleSoundEngineer',
    'data.episodesPeopleThanks',
    'data.events',
    'data.festivals',
    'data.peopleCast',
    'data.peopleCastPast',
    'data.peopleCrew',
    'data.peopleDirector',
    'data.peopleDirectorMusical',
    'data.peopleDirectorTechnical',
    'data.peopleMusic',
    'data.peopleProducer',
    'data.peopleThanks',
    'data.peopleWriter',
    'data.podcastsPeopleHost',
    'data.showsPeopleCastPast',
    'data.showsPeopleCrew',
    'data.showsPeopleDirector',
    'data.showsPeopleDirectorMusical',
    'data.showsPeopleDirectorTechnical',
    'data.showsPeopleMusic',
    'data.showsPeopleProducer',
    'data.showsPeopleWriter',
    'data.social',
    'data.tags',
  ],
}

export default omitFields