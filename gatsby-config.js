module.exports = {
  siteMetadata: {
    title: 'MVBOA',
    description: 'Mahoning Valley Basketball Officials Association',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve('./src/layouts/index.js'),
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        autoLabel: true,
        labelFormat: 'EMOTION--[filename]--[local]',
        hoist: true,
      },
    },
    `gatsby-plugin-sass`,
    'gatsby-plugin-react-helmet',
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Mahoning Vally Basketball Officials Assoc.',
        short_name: 'MVBOA',
        start_url: '/',
        background_color: 'whitesmoke',
        theme_color: '#ff3860',
        display: 'fullscreen',
        icon: 'src/images/basketball_512.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    `gatsby-plugin-netlify`,
  ],
}
