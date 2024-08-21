
type Success = [true, data: any]

type Failure = [false, message: string]


export const makeAPIRequest = async (url: string, options: RequestInit = {}): Promise<Success | Failure> => {

  try {
    const resp = await fetch(url, {
      ...options
    })

    const data = await resp.json()

    return [true, data]
  } catch (error: any) {

    console.log({ error })
    return [false, error.message]
  }
}

const generateHtmlForUrls = (urls: string[]) => {

  const div = document.createElement("div")
  div.innerHTML = urls.map(url => `
      <div class="table-row">
        <p>${url}</p>
        <button class="copy-url">Copy</button>
      </div>
    `).join('');

  return div

};


export const renderTable = (siteUrls: string[]) => {

  const locationOfEmptyString = siteUrls.indexOf("")

  const existingUrls = siteUrls.slice(0, locationOfEmptyString)
  const newUrls = siteUrls.slice(locationOfEmptyString + 1)

  const existingUrlsTableRows = generateHtmlForUrls(existingUrls);
  const newUrlsTableRows = generateHtmlForUrls(newUrls);


  const recentUrlsTableNode = document.querySelector(".recent-urls") as HTMLDivElement
  const existingUrlsTableNode = document.querySelector(".existing-urls") as HTMLDivElement

  if (newUrls.length) {
    recentUrlsTableNode.innerHTML = newUrlsTableRows.innerHTML
  } else {
    recentUrlsTableNode.innerHTML = `<div class='no-urls'>No Urls Found</div>`

  }


  if (existingUrls.length) {
    existingUrlsTableNode.innerHTML = existingUrlsTableRows.innerHTML
  } else {
    existingUrlsTableNode.style.display = "none"
  }


}