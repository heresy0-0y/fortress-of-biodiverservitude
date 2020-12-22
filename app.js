const button = document.querySelector('#search');
const form = document.querySelector("#search-bar")
const textInput = document.querySelector("#search-bar").value
let countryCodes = []
let countryNames = []

async function fetchCodes() {
  //https://www.mediawiki.org/wiki/API:Parsing_wikitext#GET_request
  let url = "https://en.wikipedia.org/w/api.php?" +
    new URLSearchParams({
      origin: "*",
      // action: "parse",
      page: "ISO 3166-1 alpha-2",
      section: '6',
      // format: "html",
  });

  try {
    const response = await axios.get(url)
    const data = response.data
    // renderScape(data)
    let document = data
    let table = document.querySelector('table')
    // let sectionHTML = sectionCodes.
    console.log(data)
    console.log(table)
    // console.log(sectionHTML)
  } catch (error) {
    console.log(error)
  }
}
let codes = fetchCodes()
// let textinner = codes.parse.text
// let tables = codes.querySelectAll('a')
// console.log(textinner)

async function fetchImage(countryCode) {
  let url = `https://api.gbif.org/v1/occurrence/search?limit=1&country=${countryCode}&mediaType=StillImage&taxonKey=212`;
  try {
    const response = await axios.get(url)
    const data = response.data
    renderScape(data)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
async function fetchSound(countryCode) {
  let url = `https://api.gbif.org/v1/occurrence/search?limit=1&country=${countryCode}&mediaType=Sound&taxonKey=212`;
  try {
    const response = await axios.get(url)
    const data = response.data
    renderSound(data)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  //Nest fetchSound function. Use organismID or other param to get sound of same bird
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const textInput = document.querySelector("#blank").value
  console.log(textInput)
  // toggleSlate()
  // setTimeout(toggleSlate, 2700)
  fetchImage(`${textInput}`)
  fetchSound(`${textInput}`)
})

// console.log(fetchData('AU'))

function renderScape(data) {
  const name = data.results[0].scientificName
  const image = data.results[0].media[0].identifier

  const speciesMain = document.createElement('p')
  const nameHeading = document.createElement('h3')
  const imageEl = document.createElement('img')
  
  nameHeading.innerText = `${name}`
  imageEl.src = image
  speciesMain.append(imageEl)
  speciesMain.append(nameHeading)
  document.querySelector('.species-main').append(speciesMain)

}

function renderSound(data) {
  // const name = data.results[0].scientificName
  let sound = undefined
  data.results[0].media.forEach((e) => {
    if (e.type = 'Sound') {
      sound = e.identifier
    }
  })

  // const speciesMain = document.querySelector('')
  // const nameHeading = document.createElement('h3')
  const audioEl = document.createElement('audio')
  
  // nameHeading.innerText = `${name}`
  audioEl.controls = true
  audioEl.innerHTML = `<source src=${sound}>`
  // speciesMain.append(audioEl)
  // speciesMain.append(nameHeading)
  document.querySelector('.species-main').append(audioEl)

}