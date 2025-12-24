import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
})

// Custom webpack plugin to transform MDX files and remove base64 images
class TransformMdxPlugin {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap('TransformMdxPlugin', (nmf) => {
      nmf.hooks.beforeResolve.tap('TransformMdxPlugin', (data) => {
        // This will be handled by the loader
        return
      })
    })
    
    compiler.hooks.compilation.tap('TransformMdxPlugin', (compilation) => {
      compilation.hooks.buildModule.tap('TransformMdxPlugin', (module) => {
        if (module.resource && /\.mdx?$/.test(module.resource)) {
          // Transform the source to remove base64 images
          if (module._source && module._source._value) {
            module._source._value = module._source._value.replace(
              /!\[\]\(data:image\/[^)]+\)/g,
              '![Image base64 non supportée]()'
            )
          }
        }
      })
    })
  }
}

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
    // Transform MDX files to remove base64 images
    config.plugins.push(new TransformMdxPlugin())
    
    return config
  },
})
