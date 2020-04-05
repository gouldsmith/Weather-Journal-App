/* Global Variables */
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = ",us&appid=9798e1521629e4757bb273c5e5aad438&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const feels = document.getElementById("feelings").value;

  getWeather(baseURL, zipCode, apiKey, feels).then(function (data) {
    console.log(
      `It's ${data.main.feels_like} degrees out and I'm ${feels} on ${newDate}`
    );
    postData("/add", {
      temp: data.main.feels_like,
      feelings: feels,
      date: newDate,
    })
    .then(updateUI())
  });
}

const getWeather = async (baseURL, zipCode, apiKey) => {
  const res = await fetch(baseURL + zipCode + apiKey);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// POST Request
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
};

// Update UI
const updateUI = async (url = "/all") => {
  const req = await fetch(url);
  try {
    const allData = await req.json();
    console.log(allData)
    // add data to UI
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('content').innerHTML = allData.feelings;

  } catch (error) {
    console.log("error", error);
  }
};
