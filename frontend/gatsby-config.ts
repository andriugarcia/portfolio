import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Andriu Portfolio`,
    siteUrl: `https://andriugarcia.com`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-sass",
    "gatsby-plugin-transition-link",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_API_URL || "http://localhost:1337",
        accessToken: process.env.STRAPI_TOKEN,
        collectionTypes: [
          "article",
          "author",
          "project-category",
          {
            singularName: "project",
            queryParams: {
              populate: {
                logo: {
                  populate: {
                    logo: "*",
                  },
                },
                showcase: {
                  populate: {
                    image: "*",
                  },
                },
                content: {
                  populate: "*",
                },
                technologies: {
                  populate: {
                    icon: "*"
                  }
                },
                portraitImages: {
                  populate: {
                    image: "*",
                  },
                },
                landscapeImages: {
                  populate: {
                    image: "*",
                  },
                },
              },
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-T8QKR4PPQ2",
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};

export default config;
