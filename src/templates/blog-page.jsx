import { graphql } from 'gatsby';
import Blog from '../pages/blog';

export default Blog;

export const pageQuery = graphql`
  query TemplateBlogPage($skip: Int) {
    site: site {
      siteMetadata {
        disqus
      }
    }

    # Get tags
    tags: allMarkdownRemark {
      ...tagsFragment
    }

    # Get calendar
    calendar: allMarkdownRemark {
      ...calendarFragment
    }

    # Get posts
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___updatedDate] }
      filter: {
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "/blog/" }
      }
      limit: 10
      skip: $skip
    ) {
      ...blogFeedFragment
    }
  }
`
