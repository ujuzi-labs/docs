// Script to remove references to missing images from MDX/MD files
import { readFile, writeFile } from 'fs/promises'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const contentDir = join(__dirname, '..', 'content')
const publicDir = join(__dirname, '..', 'public')

// Get list of all image files in public directory
async function getPublicImages() {
  const images = new Set()
  try {
    const files = await readdir(publicDir)
    files.forEach(file => {
      if (/\.(png|jpg|jpeg|svg|gif)$/i.test(file)) {
        images.add(file.toLowerCase())
        // Also add without extension for matching
        const nameWithoutExt = file.replace(/\.(png|jpg|jpeg|svg|gif)$/i, '')
        images.add(nameWithoutExt.toLowerCase())
      }
    })
  } catch (error) {
    console.error('Error reading public directory:', error.message)
  }
  return images
}

function imageExists(imagePath, publicImages) {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath
  const fullPath = join(publicDir, cleanPath)
  
  // Check if file exists
  if (existsSync(fullPath)) {
    return true
  }
  
  // Also check by filename (case-insensitive)
  const filename = cleanPath.split('/').pop().toLowerCase()
  return publicImages.has(filename) || publicImages.has(filename.replace(/\.(png|jpg|jpeg|svg|gif)$/i, ''))
}

async function processFile(filePath, publicImages) {
  try {
    const content = await readFile(filePath, 'utf-8')
    
    // Find all image references: ![alt](/path/to/image.png)
    const imageRegex = /!\[([^\]]*)\]\(([^)]+\.(png|jpg|jpeg|svg|gif))\)/gi
    let transformed = content
    let modified = false
    
    transformed = transformed.replace(imageRegex, (match, alt, imagePath) => {
      // Check if image exists
      if (!imageExists(imagePath, publicImages)) {
        console.log(`Removing missing image: ${imagePath} from ${filePath}`)
        modified = true
        const altText = alt || 'Image manquante'
        return `*[${altText} - Image non disponible: ${imagePath}]*`
      }
      return match
    })
    
    // Only write if content changed
    if (modified) {
      await writeFile(filePath, transformed, 'utf-8')
      console.log(`Processed: ${filePath}`)
      return true
    }
    return false
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message)
    return false
  }
}


async function main() {
  console.log('Removing references to missing images from MDX/MD files...')
  const publicImages = await getPublicImages()
  console.log(`Public images found: ${Array.from(publicImages).join(', ')}`)
  
  // Make publicImages available to processFile via closure
  const processFileWithImages = async (filePath) => {
    return await processFile(filePath, publicImages)
  }
  
  const processDirectoryWithImages = async (dirPath) => {
    try {
      const entries = await readdir(dirPath)
      let processedCount = 0
      
      for (const entry of entries) {
        const fullPath = join(dirPath, entry)
        const stats = await stat(fullPath)
        
        if (stats.isDirectory()) {
          processedCount += await processDirectoryWithImages(fullPath)
        } else if (stats.isFile() && (entry.endsWith('.md') || entry.endsWith('.mdx'))) {
          if (await processFileWithImages(fullPath)) {
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
  
  const processedCount = await processDirectoryWithImages(contentDir)
  console.log(`Processed ${processedCount} file(s)`)
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

