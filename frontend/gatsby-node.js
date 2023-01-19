exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
  query {
    allStrapiProject {
      nodes {
        id
      }
    }
    }
  `)
  
  data.allStrapiProject.nodes.forEach(node => {

    const slug = node.id;
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/project-post.tsx`),
      context: { slug: slug },
    })
  })
}