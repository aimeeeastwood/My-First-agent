import fs from 'fs'
import path from 'path'

export function loadLore() {
  const knowledgeDir = path.join(process.cwd(), 'knowledge')

  const files = fs.readdirSync(knowledgeDir)

  return files
}
