
const form = document.querySelector('form')
const GIFSContanier = document.querySelector('div')

const api = 'FNYUjdoaTc2ljpMaAVloD9JLZdXuqgtT'

const getGIPHYApiURl = GIFName =>
  `https://api.giphy.com/v1/gifs/search?api_key=${api}&limit=1&q=${GIFName}`


const generateGIFImg = (downsizedGIFUrl, GIFData) => {
  const img = document.createElement('img')

  img.setAttribute('src', downsizedGIFUrl)
  img.setAttribute('alt', GIFData.data[0].title)

  return img
}

const fetchGIF = async inputValue => {
  try {
    const GIPHYApiUrl = getGIPHYApiURl(inputValue)
    const response = await fetch(GIPHYApiUrl)

    if (!response.ok) {
      throw new Error('Não foi possivel obter os dados')
    }
    return response.json()
  } catch (error) {
    alert(`Error: ${error.message}`)
  }
}

const isertGIFInToDom = async inputValue => {
  const GIFData = await fetchGIF(inputValue)
  if(GIFData) {
    const downsizedGIFUrl = GIFData.data[0].images.downsized.url
    const img = generateGIFImg(downsizedGIFUrl, GIFData)
  
    GIFSContanier.insertAdjacentElement('afterbegin', img)
  
    form.reset()
  }
}

form.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.search.value

  isertGIFInToDom(inputValue)
})
