const postDate = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  try {
    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

// main function 
// function to use data which come from server to show their to client
const handleSubmit = async () => {

  // Declaring variables to use value
  const destination = document.getElementById('Destination').value
  const startTrip = document.getElementById('start').value
  const endTrip = document.getElementById('end').value
  const data = await postDate('http://localhost:8080/add-url', {
    destination
  })
  console.log(data);
  const img = data.pixaBayData
    // get data 
  document.getElementById('duration').innerHTML = getDiffDay(endTrip, startTrip)
  document.getElementById('city').innerText = destination
  document.getElementById('snow').innerHTML = data.weatherbitData.snow
  document.getElementById('description').innerHTML = data.weatherbitData.description
  document.getElementById('temp').innerHTML = data.weatherbitData.temp
  document.getElementById('img').src = img

   updateUI()

}


// function to caculate  trip duration
// end trip - start trip = (result) / (1000 * 60 * 60 * 24)
function getDiffDay(date1, date2) {
  const diffTime = Math.abs(new Date(date2) - new Date(date1))
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
// function to update UI
function updateUI() {
  const tripInfo = document.getElementById('trip_info')
  tripInfo.style.textAlign = "center"
  tripInfo.style.padding = "30px"
  tripInfo.style.margin = "40px"
  tripInfo.style.border = "1px solid #545454"
  tripInfo.style.width = "40%"
  tripInfo.style.backgroundColor = "rgb(240, 235, 235)"
  const city = document.getElementById('city')
  city.style.font = " bold 40px Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
  city.style.color = "rgb(65, 62, 62)"
  const durationText = document.getElementById('duration-text')
  durationText.innerHTML = "Duration:"
  durationText.style.font = " bold 20px arial,serif "
  durationText.style.color = "rgb(136, 157, 189)"
  durationText.style.backgroundColor = "white"
  const tempText = document.getElementById('temp-text')
  tempText.innerHTML = "Temperature:"
  tempText.style.font = " bold 18px arial,serif "
  tempText.style.color = "rgb(136, 157, 189)"
  tempText.style.backgroundColor = "white"
  const snowText = document.getElementById('snow-text')
  snowText.innerHTML = "Snow:"
  snowText.style.font = " bold 18px arial,serif "
  snowText.style.color = "rgb(136, 157, 189)"
  snowText.style.backgroundColor = "white"
  const descriptionText = document.getElementById('description-text')
  descriptionText.innerHTML = "The weather will be at your wonderful trip:"
  descriptionText.style.font = " bold 20px arial,serif"
  descriptionText.style.color = "rgb(136, 157, 189)"
  descriptionText.style.backgroundColor = "white"
}

export default handleSubmit