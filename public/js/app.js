console.log("client side js file loaded")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => { 
    e.preventDefault()
    const location = search.value
    console.log(location)
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')
  
    messageOne.textContent = "from javaScript"
    messageTwo.textContent = "messageTwo"

    fetch('http://localhost:8080/weather?address='+location, {mode: 'no-cors'}).then((response) => {
        response.json().then((data) => {
                if (data.error) {
                    console.log(data.error)
                    messageOne.textContent=data.error
                } else {
                    console.log(data.observation_time)
                    console.log(data.temperature)
                    console.log(data.weather_descriptions[0])
                    console.log(data.feelslike)
                    messageTwo.textContent=data.temperature
                }
        })
    })
    



} )

