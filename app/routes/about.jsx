import { useLoaderData, json, Link } from 'remix'
import { gql } from 'graphql-request'

import { client } from '~/lib/graphql-client'

import PageTitle from '../components/PageTitle'
import PageIntro from '../components/PageIntro'

const GetAllContent = gql`
  {
    pageBy(uri: "about") {
      title
      page {
        intro
        content
      }
    }
  }
`

export let loader = async () => {
  const { pageBy } = await client.request(GetAllContent)

  return json({ pageBy })
}

export let meta = () => {
  return {
    title: 'About | Ten 1 Seven Studio',
    description: '',
  }
}

export default function About() {
  let { pageBy } = useLoaderData()

  return (
    <>
      <PageTitle link="/" breadcrumb="Home" title={pageBy.title} />
      <PageIntro intro={pageBy.page.intro} />

      {!!pageBy.page.content && (
        <div
          className="wysiwyg"
          dangerouslySetInnerHTML={{ __html: pageBy.page.content }}
        />
      )}
    </>
  )
}
