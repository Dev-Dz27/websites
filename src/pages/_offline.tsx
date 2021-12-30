import { PageHeading } from '~components/Layout'

const OFFLINE = {
  description: 'You are currently offline. Please check your internet connection.',
  title: 'Offline',
}

const Offline = () => {
  return (
    <>
      <PageHeading description={OFFLINE.description} title={OFFLINE.title} />
    </>
  )
}

export default Offline