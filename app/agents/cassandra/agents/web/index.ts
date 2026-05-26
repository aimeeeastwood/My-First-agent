export async function webAgent(input: string) {
  // later: fetchUrl tool only + sanitiser

  return {
    route: 'web',
    output: `🌐 Web result for: ${input}`,
  }
}
