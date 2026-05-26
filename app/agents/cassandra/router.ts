import type { Route } from './types'

export function routeMessage(input: string): { route: Route } {
  const text = input.toLowerCase()

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
