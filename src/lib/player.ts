export function getEmbedUrl(servers: { server: string; embedUrl: string }[]) {
  return servers.find(s => s.server === 'abyss')?.embedUrl || servers[0]?.embedUrl;
}
