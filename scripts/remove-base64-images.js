// Script to remove base64 images from MDX/MD files before build
import { readFile, writeFile } from 'fs/promises'
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const contentDir = join(__dirname, '..', 'content')

async function processFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf-8')
    
    // Check if file contains base64 images
    if (content.includes('data:image')) {
      // Remove base64 images - match both ![](data:image...) and ![alt](data:image...)
      // Replace with a text placeholder to avoid module resolution issues
      const transformed = content.replace(
        /!\[([^\]]*)\]\(data:image\/[^)]+\)/g,
        (match, alt) => {
          const altText = alt || 'Image base64 non supportée'
          return `*[${altText} - Image base64 supprimée pour le build]*`
        }
      )
      
      // Only write if content changed
      if (transformed !== content) {
        await writeFile(filePath, transformed, 'utf-8')
        console.log(`Processed: ${filePath}`)
        return true
      }
    }
    return false
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message)
    return false
  }
}

async function processDirectory(dirPath) {
  try {
    const entries = await readdir(dirPath)
    let processedCount = 0
    
    for (const entry of entries) {
      const fullPath = join(dirPath, entry)
      const stats = await stat(fullPath)
      
      if (stats.isDirectory()) {
        processedCount += await processDirectory(fullPath)
      } else if (stats.isFile() && (entry.endsWith('.md') || entry.endsWith('.mdx'))) {
        if (await processFile(fullPath)) {
          processedCount++
        }
      }
    }
    
    return processedCount
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message)
    return 0
  }
}

async function main() {
  console.log('Removing base64 images from MDX/MD files...')
  const processedCount = await processDirectory(contentDir)
  console.log(`Processed ${processedCount} file(s)`)
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

