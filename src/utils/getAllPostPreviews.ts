import { BlogMatterData, BlogPreview } from "./blog"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

function getAllPostPreviews(): BlogPreview[] {
  const postsDir = path.join(process.cwd(), "src", "posts")
  const posts = fs.readdirSync(postsDir)

  return posts.map((post) => {
    const mdxFile = fs.readFileSync(path.join(postsDir, post))
    const { data } = matter(mdxFile)
    const slug = post.replace(".mdx", "")

    return {
      matterData: data as BlogMatterData,
      slug,
    }
  })
}

export default getAllPostPreviews