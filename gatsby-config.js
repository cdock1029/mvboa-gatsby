module.exports = {
  siteMetadata: {
    title: 'MVBOA',
    description: 'Mahoning Valley Basketball Officials Association',
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-page-transitions`,
      options: {
        transitionTime: 200,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `ykxbh0sg3lft`,
        accessToken: `c32a626ada095a0b4905fd930f1492c8dc5545db7db7a12055f9e28078e1d6e2`,
      },
    },
    `gatsby-plugin-netlify`,
  ],
}
