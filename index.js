import fetch from "node-fetch"

const API_KEY = "1249fc7479359ba2dd465d807279b71d"


    async function fetchJSON(url) {
        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Request failed, status ${response.status}`, { cause: response });
        }
    }
    
    async function getCoordinatesByCity (city) {
        let resURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
        const response = await fetchJSON(resURL);
        return getFlyInfo(response[0].lat, response[0].lon);
    }
    
    async function getFlyInfo(lat, long) {
        let resURL = `https://iss-pass.herokuapp.com/json?lat=${lat}&lon=${long}`;
        const flyInfo = await fetchJSON(resURL);
        return flyInfo;
    }
    
    getCoordinatesByCity("Toronto").then(flyInfo => {
        const risetimeNum = flyInfo.response[0].risetime
        const durationNum = flyInfo.response[0].duration
        const concat = '' + risetimeNum + durationNum
        const convertedToNum = parseInt(concat)
        const date = new Date(convertedToNum)
        console.log('next passage:', date);
    }).catch(err => {
        console.log('error:', err);
    })






