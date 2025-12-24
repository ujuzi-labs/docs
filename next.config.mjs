import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
})

// Custom webpack plugin to transform MDX/MD files and remove base64 images
class RemoveBase64ImagesPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('RemoveBase64ImagesPlugin', (compilation) => {
      // Intercept modules during the build process
      compilation.hooks.buildModule.tap('RemoveBase64ImagesPlugin', (module) => {
        // Only process MDX/MD files
        if (module.resource && /\.(mdx?|md)$/.test(module.resource)) {
          // Transform the source content if available
          try {
            if (module._source) {
              // Try to get the source content
              let source = null
              if (typeof module._source.source === 'function') {
                source = module._source.source()
              } else if (module._source._value !== undefined) {
                source = module._source._value
              }
              
              if (typeof source === 'string' && source.includes('data:image')) {
                // Remove base64 images - match both ![](data:image...) and ![alt](data:image...)
                const transformed = source.replace(
                  /!\[([^\]]*)\]\(data:image\/[^)]+\)/g,
                  '![$1](data:image/png;base64,)'
                )
                
                // Update the source
                if (module._source._value !== undefined) {
                  module._source._value = transformed
                } else if (typeof module._source.update === 'function') {
                  module._source.update(transformed)
                }
              }
            }
          } catch (e) {
            // Silently fail if source is not accessible - this is expected for some modules
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
    
    // Transform MDX/MD files to remove base64 images
    config.plugins.push(new RemoveBase64ImagesPlugin())
    
    return config
  },
})
