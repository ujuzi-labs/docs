import nextra from 'nextra'
import remarkRemoveBase64Images from './remark-remove-base64-images.js'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
  mdxOptions: {
    remarkPlugins: [remarkRemoveBase64Images],
  },
})

// Custom webpack plugin to transform MDX/MD files and remove base64 images
class RemoveBase64ImagesPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('RemoveBase64ImagesPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'RemoveBase64ImagesPlugin',
          stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets) => {
          // This approach won't work for source files, need different hook
        }
      )
      
      // Intercept module sources during build
      compilation.hooks.buildModule.tap('RemoveBase64ImagesPlugin', (module) => {
        if (module.resource && /\.(mdx?|md)$/.test(module.resource)) {
          // Transform source if available
          if (module._source && typeof module._source._value === 'string') {
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
    
    // Transform MDX/MD files to remove base64 images
    config.plugins.push(new RemoveBase64ImagesPlugin())
    
    return config
  },
})
