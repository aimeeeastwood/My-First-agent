export type Route = 'chat' | 'web' | 'lore' | 'safety'

export type RoutedMessage = {
  route: Route
  confidence?: number
}
