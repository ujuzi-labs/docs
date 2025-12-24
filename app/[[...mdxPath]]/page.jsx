import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '@/mdx-components.js'

// Wrap generateStaticParams to handle errors gracefully
const baseGenerateStaticParams = generateStaticParamsFor('mdxPath')

export const generateStaticParams = async (...args) => {
  try {
    return await baseGenerateStaticParams(...args)
  } catch (error) {
    console.error('Error generating static params:', error)
    // Return empty array to allow build to continue
    // Individual pages will be generated on-demand
    return []
  }
}

const Wrapper = getMDXComponents().wrapper
 
export default async function Page(props) {
  const params = await props.params
  try {
    const result = await importPage(params.mdxPath)
    const { default: MDXContent, toc, metadata } = result
    return (
      <Wrapper toc={toc} metadata={metadata}>
        <div className="w-full">
          <div className="max-w-[850px] w-full mx-auto">
            <MDXContent {...props} params={params} />
          </div>
        </div>
      </Wrapper>
    )
  } catch (error) {
    console.error('Error loading page:', error)
    // Return a fallback page
    return (
      <Wrapper toc={[]} metadata={{ title: 'Error loading page' }}>
        <div className="w-full">
          <div className="max-w-[850px] w-full mx-auto">
            <h1>Error loading page</h1>
            <p>The page could not be loaded. Please try again later.</p>
          </div>
        </div>
      </Wrapper>
    )
  }
}
