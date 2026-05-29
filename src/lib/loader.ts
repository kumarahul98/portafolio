/**
 * Hides and removes the #app-loader markup baked into index.html. The home page
 * drives a richer progress animation; other routes just dismiss it on mount.
 */
export function hideAppLoader() {
  const loader = document.getElementById('app-loader')
  if (!loader) return
  loader.classList.add('is-hidden')
  window.setTimeout(() => loader.remove(), 360)
}
