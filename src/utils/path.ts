export function jump(p: string){
  const base = window.MOG_BASE || ''
  return `${base}${p}`
}