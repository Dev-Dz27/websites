const getTitle = (title) =>
  title
    .replace('people', '')
    .replace('DirectorMusical', 'Musical Director')
    .replace('DirectorTechnical', 'Technical Director')
    .replace('eventsLineupShowIds', 'Lineup')
    .replace('tags', 'Tag')

export default getTitle