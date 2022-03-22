
export function formatPath(name: string) {
  return name.split(' ').join('-').toLowerCase()
}