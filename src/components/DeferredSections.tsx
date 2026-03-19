import { useContent } from '../hooks/useContent'
import Blogs from './Blogs'
import Videos from './Videos'
import Projects from './Projects'
import Contact from './Contact'

export default function DeferredSections() {
  const content = useContent()

  return (
    <>
      <Blogs data={content.data?.blogs ?? []} loading={content.loading} />
      <Videos data={content.data?.videos ?? []} loading={content.loading} />
      <Projects />
      <Contact />
    </>
  )
}
