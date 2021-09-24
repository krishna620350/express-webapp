const submit = document.getElementById('submit');
const name = document.getElementById('search');
const cityname = document.getElementById('cityname');
const temp = document.getElementById('temp-real');
const mintemp = document.getElementById('mintemp');
const maxtemp = document.getElementById('maxtemp');
const temp_status = document.getElementById("temp-status");
const datahide = document.querySelector(".middle-layer");
const day = document.getElementById('day');
const date = document.getElementById('date');

const getinfo = async(event) => {
    event.preventDefault();
    let cname = name.value;
    if (cname === '') {
        cityname.innerText = "plz enter cityname";
        datahide.classList.add('data-hide');
    } else {
        try {
            const getcurrent = () => {
                var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                let currenttime = new Date();
                let day = weekday[currenttime.getDay()];
                return day;
            };
            const gettime = () => {
                var months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
                let currenttime = new Date();
                let day = currenttime.getDate();
                let month = months[currenttime.getMonth()];
                let year = currenttime.getFullYear();
                return `${day} - ${month} - ${year}`;
            };
            day.innerText = getcurrent();
            date.innerText = gettime();
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cname}&units=metric&appid=fc820a56c17e5b190b82fc6a08aaefab`;
            const response = await fetch(url);
            const data = await response.json();
            const arr = [data];
            cityname.innerText = `${arr[0].name},${arr[0].sys.country}`;
            temp.innerText = arr[0].main.temp;
            mintemp.innerText = arr[0].main.temp_min;
            maxtemp.innerText = arr[0].main.temp_max;
            let tempstatus = arr[0].weather[0].main;
            if (tempstatus === 'Clear') {
                temp_status.innerHTML = "<i class='fa fa-sun' style='margin-left:5px;color:#eccc68'></i>";
            } else if (tempstatus === 'Clouds') {
                temp_status.innerHTML = "<i class='fa fa-cloud' style='margin-left:5px;color:#f1f2f6'></i>";
            } else if (tempstatus === 'Rain') {
                temp_status.innerHTML = "<i class='fa fa-rain' style='margin-left:5px;color:#a4b0be'></i>";
            } else {
                temp_status.innerHTML = "<i class='fa fa-sun' style='margin-left:5px;color:#eccc68'></i>";
            }
            datahide.classList.remove("data-hide");
        } catch {
            cityname.innerText = "plz enter cityname properly";
            datahide.classList.add("data-hide");
        }
    }
}
submit.addEventListener('click', getinfo)