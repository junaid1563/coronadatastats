// selecting elements
let continent_element = document.querySelector("#cons");
let continent;
let conTable = document.querySelector("#con-table");
let str = "";
let countryTable = document.querySelector("#country-table");
let currTime = document.querySelector(".current-date");
let search = document.querySelector("#country-name");
let global = document.querySelector(".global");
let totalCases = 0,
  totalDeaths = 0,
  totalRecoverd = 0,
  newCases = 0,
  newDeaths = 0,
  newRecovered = 0;

let cancelBtn = document.querySelector("#cancel");
// getting continent data

let getData = function () {
  str = "";
  fetch(`https://corona.lmao.ninja/v2/continents?yesterday&sort`, {
    method: "GET",
  })
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((data) => {
      data.forEach((con) => {
        str += `<tr><td>${con.continent}</td><td>${con.cases}</td><td>${con.todayCases}</td><td>${con.deaths}</td><td>${con.todayDeaths}</td><td>${con.recovered}</td>
      <td>${con.todayRecovered}</td><td>${con.active}</td>
      </tr>`;
        totalCases += con.cases;
        newCases += con.todayCases;
        totalDeaths += con.deaths;
        newDeaths += con.todayDeaths;
        totalRecoverd += con.recovered;
        newRecovered += con.todayRecovered;
        // console.log(con.cases);
      });

      console.log(totalCases);
      let a = {
        totalCases: totalCases,
        newCases: newCases,
        totalDeaths: totalDeaths,
        newDeaths: newDeaths,
        totalRecoverd: totalRecoverd,
        newRecovered: newRecovered,
      };
      conTable.innerHTML = str;
      return a;
    })
    .then((b) => {
      console.log(b);
      global.innerHTML = `<span class='big-text yellow'>Total Cases</span><br/>
      <span class='medium-text'>${b.totalCases}</span><br/>
      <span class='small-text'>+${b.newCases}</span>
      <br/><span class='big-text red'>Total Deaths</span><br/>
      <span class='medium-text'>${b.totalDeaths}</span>
      <br/><span class='small-text'>+${b.newDeaths}</span><br/>
      <span class='big-text green'>Total Recovered</span><br/>
      <span class='medium-text'>${b.totalRecoverd}</span>
      <br/><span class='small-text'>+${b.newRecovered}</span>`;
    })
    .catch((err) => {
      console.error(err);
    });
};
getData();

// getting country data
let i = 0;
let className = "table-light";
let ctr = "";
let getCountryData = () => {
  fetch("https://corona.lmao.ninja/v2/countries?yesterday&sort", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      countryTable.innerHTML = "";
      data.forEach((c) => {
        ctr += `<tr class=${c.country}><td>${c.country}</td><td>${c.cases}</td><td>${c.todayCases}</td><td>${c.deaths}</td><td>${c.todayDeaths}</td><td>${c.recovered}</td>
      <td>${c.todayRecovered}</td><td>${c.active}</td>
      
      </tr>`;
      });
      countryTable.innerHTML = ctr;
    });
};

getCountryData();
// filtering

let ftr = "";
search.addEventListener("input", (event) => {
  let input = String(event.target.value).toUpperCase();
  if (input == "") {
    ftr = "";
    countryTable.innerHTML = "";
    getCountryData();
    return;
  }
  // }
  // cancelBtn.addEventListener("click", () => {
  //   ftr = "";
  //   ctr = "";
  //   countryTable.innerHTML = "";
  //   event.target.value = "";
  //   getCountryData();
  //   return;
  // });
  fetch("https://corona.lmao.ninja/v2/countries?yesterday&sort", {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((c) => {
        countryTable.innerHTML = "";
        let country = String(c.country).toUpperCase();
        if (country.startsWith(input)) {
          ctr = "";
          ftr += `<tr class=${c.country}><td>${country}</td><td>${c.cases}</td><td>${c.todayCases}</td><td>${c.deaths}</td><td>${c.todayDeaths}</td><td>${c.recovered}</td>
        <td>${c.todayRecovered}</td><td>${c.active}</td>

        </tr>`;
        }
      });
      countryTable.innerHTML = ftr;
    });
});

// getting time

function setTime() {
  let d = new Date();
  let day = d.getDay();
  let date = formatTime(d.getDate());
  let month = d.getMonth();
  let year = d.getFullYear();
  let hour = formatTime(d.getHours());
  let min = formatTime(d.getMinutes());
  let sec = formatTime(d.getSeconds());

  let days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  let months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };
  currTime.innerHTML = `${days[day]} ${date} ${months[month]} ${year} ${hour}:${min}:${sec}`;
}
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

setInterval(setTime, 1000);

// changing content of global
