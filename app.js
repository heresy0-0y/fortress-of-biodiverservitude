const button = document.querySelector('#search');
const form = document.querySelector("#search-bar")
const textInput = document.querySelector("#search-bar").value
let countryCodes = []
let countryNames = []

// async function fetchCodes() {
//   //https://www.mediawiki.org/wiki/API:Parsing_wikitext#GET_request
//   let url = "https://en.wikipedia.org/w/api.php?" +
//     new URLSearchParams({
//       origin: "*",
//       action: "parse",
//       page: "ISO 3166-1 alpha-2",
//       section: '6',
//       // https://www.mediawiki.org/wiki/API:JSON_version_2
//       formatversion: 2,
//       format: "json",
//   });

//   try {
//     const response = await axios.get(url)
//     const data = response.data
//     // renderScape(data)
//     let document = data.parse
//     // let table = document.querySelector('table')
//     // let sectionHTML = sectionCodes.

//     // console.log(data)
//     // console.log(document)
//     let docText = document.text
//     console.log(typeof(docText))
//     console.log(docText)

//     // console.log(sectionHTML)
//   } catch (error) {
//     console.log(error)
//   }
// }
// let codesSectionW = fetchCodes().parse.text
// let textinner = codes.parse.text
// let tables = codes.querySelectAll('a')
// console.log(textinner)

async function fetchImage(decimalLatitude, decimalLongitude) {
  let url = `https://api.gbif.org/v1/occurrence/search?limit=1&decimalLatitude=${decimalLatitude}&decimalLongitude=${decimalLongitude}&mediaType=StillImage&taxonKey=212`;
  try {
    const response = await axios.get(url)
    const data = response.data
    renderScape(data)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  fetchSound(decimalLatitude, decimalLongitude)
}
async function fetchSound(decimalLatitude, decimalLongitude) {
  let url = `https://api.gbif.org/v1/occurrence/search?limit=1&decimalLatitude=${decimalLatitude}&decimalLongitude=${decimalLongitude}&mediaType=Sound&taxonKey=212`;
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
// // // fetchCodes()
// form.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const textInput = document.querySelector("#blank").value
//   console.log(textInput)
//   // toggleSlate()
//   // setTimeout(toggleSlate, 2700)
//   fetchImage(`${textInput}`)
//   fetchSound(`${textInput}`)
// })

function renderScape(data) {
  const name = data.results[0].species
  const image = data.results[0].media[0].identifier

  const speciesProfile = document.createElement('section')
  const speciesMain = document.createElement('div')
  const moreInfoText = document.createElement('div')
  const moreInfo = document.createElement('div')
  const imageEl = document.createElement('img')

  let nameWiki = ''
  let temp = name.split(' ')
  nameWiki += temp[0] + '_' + temp[1]
  
  moreInfoText.innerHTML = `<a href="https://wikipedia.org/wiki/${nameWiki}" target="_blank">${name}</a>`
  moreInfo.classList.add('moreInfo')
  moreInfoText.classList.add('infoText')
  moreInfo.append(moreInfoText)
  imageEl.src = image
  speciesMain.classList.add('pic')
  speciesMain.append(imageEl)
  speciesMain.append(moreInfo)
  speciesProfile.append(speciesMain)
  speciesProfile.classList.add('species-profile')
  document.querySelector('.species-main').append(speciesProfile)

}

function renderSound(data) {
  // const name = data.results[0].scientificName
  let sound = undefined
  data.results[0].media.forEach((e) => {
    if (e.type === 'Sound') {
      sound = e.identifier
    }
  })

  // const speciesMain = document.querySelector('')
  // const nameHeading = document.createElement('h3')
  const audioEl = document.createElement('audio')
  
  // nameHeading.innerText = `${name}`
  audioEl.controls = true
  audioEl.loop = true
  audioEl.autoplay = true
  audioEl.muted = true
  audioEl.innerHTML = `<source src=${sound}>`
  // speciesMain.append(audioEl)
  // speciesMain.append(nameHeading)

  //Change destination element, a seperate dropdown for audio

  document.querySelector('.species-profile').append(audioEl)

}

function removeProfile() {
  let profile = document.querySelector('section')
  while (profile) {
    profile.remove()
  break;
  }
}

mapboxgl.accessToken = 'pk.eyJ1IjoiaGVyZXN5MHYweSIsImEiOiJja2owa292b3AzMGRsMnJwNHB0b2oyY2V1In0.sdVYq4n4mc0bNMrsUhQIfQ';
var coordinates = document.getElementById('coordinates');
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/heresy0v0y/ckjgh723n1qnc19p79zecqyba',
center: [0, 0],
zoom: 2
});
  
var marker = new mapboxgl.Marker({
draggable: true
})
.setLngLat([0, 0])
.addTo(map);
  
function onDragEnd() {
var lngLat = marker.getLngLat();
coordinates.style.display = 'block';
coordinates.innerHTML ='Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
  let longitude = lngLat.lng
  let latitude = lngLat.lat
  console.log(longitude, latitude)
  let decimalLongitude = `${longitude - 10},${longitude + 10}`
  let decimalLatitude = `${latitude - 10}, ${latitude + 10}`
  removeProfile()
  fetchImage(decimalLatitude, decimalLongitude)
}
  
marker.on('dragend', onDragEnd);
