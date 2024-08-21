import { makeAPIRequest, renderTable } from "./helpers"

const formNode = document.querySelector('form.search') as HTMLFormElement
const loaderWrapperNode = document.querySelector(".loader-wrapper") as HTMLDivElement

const tableWrapperNode = document.querySelector(".table-wrapper")

formNode.addEventListener("submit", async e => {

  e.preventDefault()

  try {

    loaderWrapperNode.classList.remove("hide")
    tableWrapperNode?.classList.add("hide");

    const formData = new FormData(e.currentTarget as HTMLFormElement)

    const searchTerm = (formData.get("search-query") as string).trim()

    // make API Request
    const endpoint = `${import.meta.env.VITE_SERVER_URL}/relay/sites-with-fareharbor-scripts?searchTerm=${searchTerm}`
    const [success, data] = await makeAPIRequest(endpoint)

    if (!success) throw new Error(data)

    // render table
    const urls = data.urls

    renderTable(urls as string[])

  } catch (error) {

  } finally {
    loaderWrapperNode.classList.add("hide")
    tableWrapperNode?.classList.remove("hide")
  }

})









