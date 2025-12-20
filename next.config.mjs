import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  }
})

export default withNextra({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/processes/process-infrastructuring/timeli',
        destination: '/processes/process-infrastructuring/timelining',
        permanent: false, // Set to false for temporary redirect (302)
      },
      {
        source: '/processes/ground-potentialising/deplo',
        destination: '/processes/ground-potentialising/deploy',
        permanent: false, // Set to false for temporary redirect (302)
      }
    ]
  },
  webpack: (config, { webpack }) => {
    // Ignore module resolution errors for image files in public directory
    // This prevents build failures when Nextra tries to resolve images that don't exist
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^private-next-root-dir\/public\/.*\.(png|jpg|jpeg|svg|gif)$/,
      })
    )
    return config
  },
})
