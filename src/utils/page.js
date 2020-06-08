const title = process.env.VUE_APP_TITLE || "p5design-admin";
export function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
