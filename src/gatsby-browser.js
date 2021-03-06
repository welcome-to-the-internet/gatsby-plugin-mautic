export const onRouteUpdate = ({ location }, pluginOptions = {}) => {
  if (process.env.NODE_ENV !== `production` || typeof mt !== `function`) {
    return null
  }

  const pathIsExcluded =
    location &&
    typeof window.excludeMTPaths !== `undefined` &&
    window.excludeMTPaths.some(rx => rx.test(location.pathname))

  if (pathIsExcluded) return null

  // wrap inside a timeout to make sure react-helmet is done with it's changes (https://github.com/gatsbyjs/gatsby/issues/9139)
  // reactHelmet is using requestAnimationFrame: https://github.com/nfl/react-helmet/blob/5.2.0/src/HelmetUtils.js#L296-L299
  const sendPageView = () => {
    // const pagePath = location
    //   ? location.pathname + location.search + location.hash
    //   : undefined
    // window.mt(`set`, `page`, pagePath)
    window.mt('send', 'pageview')
  }

  // Minimum delay for reactHelmet's requestAnimationFrame
  const delay = Math.max(32, pluginOptions.pageTransitionDelay || 0)
  setTimeout(sendPageView, delay)

  return null
}
