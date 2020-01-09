module.exports = {
  siteMetadata: {
    title: `Gatsby Typescript Starter`,
  },
  plugins: [
    // Add typescript stack into webpack
    `gatsby-plugin-typescript`,
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          auth: true,
          database: false,
          firestore: true,
          storage: false,
          messaging: false,
          functions: false,
          performance: false,
        },
        credentials: {
          apiKey: 'YOUR_GATSBY_FIREBASE_API_KEY',
          authDomain: 'YOUR_GATSBY_FIREBASE_AUTH_DOMAIN',
          databaseURL: 'YOUR_GATSBY_FIREBASE_DATABASE_URL',
          projectId: 'YOUR_GATSBY_FIREBASE_PROJECT_ID',
          storageBucket: 'YOUR_GATSBY_FIREBASE_STORAGE_BUCKET',
          messagingSenderId: 'YOUR_GATSBY_FIREBASE_MESSAGING_SENDER_ID',
          appId: 'YOUR_GATSBY_FIREBASE_APP_ID',
          measurementId: 'YOUR_GATSBY_FIREBASE_MEASUREMENT_ID',
        }
      },
    },
  ],
}
