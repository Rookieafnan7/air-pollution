let state = false;
function displayFormat() {}
const ppm = document.querySelector(".ppm");
const status_bar = document.querySelector(".status");
const inner_box = document.querySelector(".inner-box");
const url =
  "https://blynk.cloud/external/api/get?token=Wi26gKs8y0CjpB-KoCLXHKPRR5WpzKhN&v1";
const check =
  "https://blynk.cloud/external/api/isHardwareConnected?token=Wi26gKs8y0CjpB-KoCLXHKPRR5WpzKhN";

async function getPPMValue() {
  // const Http = new XMLHttpRequest();

  // Http.open("GET", url);
  // Http.send();

  // Http.onreadystatechange = (e) => {
  //     console.log(Http.responseText)
  // }
  try {
    const response = await fetch(check);
    // console.log(response);
    state = await response.json();
    console.log(state);
    if (!state) {
      ppm.innerHTML = 0;
      status_bar.innerHTML = "Sensor is OFF";
      inner_box.style.backgroundColor = "#fcb8b8";
    } else {
      try {
        const response = await fetch(url);
        if (response.error) {
          throw Error(response.error);
        }
        const value = parseFloat(await response.json());
        console.log(value);
        inner_box.style.backgroundColor = "#72d476";
        ppm.innerHTML = value;
        status_bar.innerHTML = "Sensor is ON";
      } catch (err) {
        ppm.innerHTML = 0;
        status_bar.innerHTML = "Cannot Read Values";
        inner_box.style.backgroundColor = "#fcb8b8";
      }
    }
  } catch (err) {
    console.log(err);
  }

  //   if (value == 0) {
  //     console.log("Washing Machine is off");
  //     status_color.style.backgroundColor = "red";
  //     status_text.innerHTML = "OFF";
  //     desc.innerHTML = "The Washing machine is available for use.";
  //   } else if (value == 1) {
  //     console.log("Washing Machine is running");
  //     status_color.style.backgroundColor = "green";
  //     status_text.innerHTML = "ON";
  //     desc.innerHTML = "The Washing machine is busy.";
  //   }
}

setInterval(getPPMValue, 1000);
