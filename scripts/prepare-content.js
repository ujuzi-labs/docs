// Script to prepare content files before build:
// 1. Remove base64 images
// 2. Remove references to missing images
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
    let content = await readFile(filePath, 'utf-8')
    let modified = false
    
    // Step 1: Remove base64 images
    if (content.includes('data:image')) {
      const transformed = content.replace(
        /!\[([^\]]*)\]\(data:image\/[^)]+\)/g,
        (match, alt) => {
          const altText = alt || 'Image base64 non supportée'
          modified = true
          return `*[${altText} - Image base64 supprimée pour le build]*`
        }
      )
      content = transformed
    }
    
    // Step 2: Remove references to missing images
    const imageRegex = /!\[([^\]]*)\]\(([^)]+\.(png|jpg|jpeg|svg|gif))\)/gi
    const transformed = content.replace(imageRegex, (match, alt, imagePath) => {
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

async function processDirectory(dirPath, publicImages) {
  try {
    const entries = await readdir(dirPath)
    let processedCount = 0
    
    for (const entry of entries) {
      const fullPath = join(dirPath, entry)
      const stats = await stat(fullPath)
      
      if (stats.isDirectory()) {
        processedCount += await processDirectory(fullPath, publicImages)
      } else if (stats.isFile() && (entry.endsWith('.md') || entry.endsWith('.mdx'))) {
        if (await processFile(fullPath, publicImages)) {
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
  console.log('Preparing content files for build...')
  console.log('Step 1: Removing base64 images...')
  console.log('Step 2: Removing references to missing images...')
  
  const publicImages = await getPublicImages()
  console.log(`Public images found: ${Array.from(publicImages).join(', ')}`)
  
  const processedCount = await processDirectory(contentDir, publicImages)
  console.log(`Processed ${processedCount} file(s)`)
  console.log('Content preparation complete!')
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})

