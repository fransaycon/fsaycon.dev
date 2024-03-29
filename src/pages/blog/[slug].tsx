import React from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import { MDXRemote } from "next-mdx-remote"
import HN from "../../common/HN"
import getPostBySlug from "../../utils/getPostBySlug"
import { ParsedUrlQuery } from "querystring"
import getAllSlugs from "../../utils/getAllSlugs"
import { BlogPost } from "../../utils/blog"
import Page from "../../common/Page"
import Fold from "../../common/Fold"
import stitches from "../../stitches"
import Image from "../../Blog/Image"
import MetaHead from "../../common/MetaHead"
import Code from "../../Blog/Code"
import Anchor from "../../Blog/Anchor"
import moment from "moment"
import HR from "../../Blog/HR"

interface BlogPageT extends BlogPost {
  slug: string
}

interface BlogPageParams extends ParsedUrlQuery {
  slug: string
}

const components = { ...HN, img: Image, code: Code, a: Anchor, hr: HR }

const Container = stitches.styled(Fold, {
  marginTop: "$rg",
  "> *": {
    "+ *": {
      marginTop: "$xxs",
    },
  },
})

const convertDate = (date: string) =>
  moment(date, "YYYY-MM-DD").format("DD MMM YYYY")

const BlogPage = ({ content, matterData, slug }: BlogPageT) => (
  <Page>
    <MetaHead
      title={`FSAYCON.DEV: ${matterData.title}`}
      description={matterData.description}
      link={slug}
      previewImage={matterData.smPreviewImage}
    />
    <Container>
      <HN.h1>{matterData.title}</HN.h1>
      <div>
        <em>
          <strong>by Franrey Saycon</strong>, {convertDate(matterData.date)} (
          {matterData.duration} read)
        </em>
      </div>
      <article>
        <MDXRemote {...content} components={components} />
      </article>
    </Container>
  </Page>
)

export const getStaticProps: GetStaticProps<unknown, BlogPageParams> = async ({
  params,
}) => {
  const mdxPost = await getPostBySlug(params.slug)

  return {
    props: {
      ...mdxPost,
      slug: `/blog/${params.slug}`,
    },
  }
}

export const getStaticPaths: GetStaticPaths<BlogPageParams> = () => {
  const slugs = getAllSlugs()
  const paths = slugs.map((slug) => ({
    params: { slug },
  }))
  return { paths, fallback: false }
}

export default BlogPage
