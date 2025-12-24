// Remark plugin to remove base64 images from markdown/MDX files
export default function remarkRemoveBase64Images() {
  return (tree) => {
    const visit = (node) => {
      if (node.type === 'image' && node.url && node.url.startsWith('data:image')) {
        // Replace base64 image with placeholder
        node.url = ''
        node.alt = node.alt || '[Image base64 non supportée]'
      }
      if (node.children) {
        node.children.forEach(visit)
      }
    }
    visit(tree)
  }
}

