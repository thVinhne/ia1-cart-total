import { readFileSync } from 'node:fs'

const files = ['src/cart.js', 'test/cart.test.js']
let hasError = false

for (const file of files) {
  const content = readFileSync(file, 'utf8')
  
  // Tách content thành từng dòng để kiểm tra tab và trailing space
  const lines = content.split('\n')
  
  lines.forEach((line, index) => {
    const lineNumber = index + 1
    
    // Kiểm tra tabs
    if (line.includes('\t')) {
      console.error(`[Lỗi Format] ${file}:${lineNumber} - Chứa ký tự tab. Vui lòng dùng space.`)
      hasError = true
    }
    
    // Kiểm tra trailing spaces (khoảng trắng dư ở cuối dòng)
    if (line.endsWith(' ') || (line.length > 0 && line.endsWith('\t'))) {
      console.error(`[Lỗi Format] ${file}:${lineNumber} - Chứa khoảng trắng thừa ở cuối dòng.`)
      hasError = true
    }
  })

  // Kiểm tra newline cuối file (nếu file không rỗng)
  if (content.length > 0 && !content.endsWith('\n')) {
    console.error(`[Lỗi Format] ${file} - Thiếu ký tự xuống dòng (newline) ở cuối file.`)
    hasError = true
  }
}

if (hasError) {
  console.error('Format check failed')
  process.exitCode = 1
} else {
  console.log('Format check passed')
}