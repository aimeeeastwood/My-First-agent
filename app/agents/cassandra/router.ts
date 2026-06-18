import type { Route } from './types'

export function routeMessage(input: string): { route: Route } {
  const text = input.toLowerCase()

  const loreKeywords = [
    'banshee',
    'fa-55',
    'ea-55',
    'ua-55',
    'wellington',
    'kanaky',
    'ofn',
    'oceanic federation',
    'sprite',
    'raiden',
    'aircraft',
    'carrier',
    '6faex',
    'kairos',
  ]

  if (loreKeywords.some((k) => text.includes(k))) {
    return { route: 'lore' }
  }

  if (text.includes('lore') || text.includes('kairos')) {
    return { route: 'lore' }
  }

  if (
    text.includes('http') ||
    text.includes('search') ||
    text.includes('url')
  ) {
    return { route: 'web' }
  }

  if (text.includes('safe') || text.includes('policy')) {
    return { route: 'safety' }
  }

  return { route: 'chat' }
}
