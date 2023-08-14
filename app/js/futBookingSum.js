"use strict"
// This page is called "futBookingSum.js" and is linked to the "futureBookingSum.html" page. This page is responsible for displaying 
// the booking information of a selected booking. 

const LEVY = 1.10;
const FLAGRATE = 4.20;
const KM = 1.622;
const NIGHT_LEVY = 1.20;
const SEDAN = 0.00;
const SUV = 3.50;
const VAN = 6.00;
const MINIBUS = 10.00;

let queueIndex = localStorage.getItem(INDEX_KEY);

let startRef = document.getElementById("startD");
let finalRef = document.getElementById("iloca");
let dateRef = document.getElementById("Sdate");
let timeRef = document.getElementById("Stime");
let destinationRef = document.getElementById("finalD");
let stopsRef = document.getElementById("Nstop");
let costRef = document.getElementById("cost");
let distanceRef = document.getElementById("distance");
let typeRef = document.getElementById("taxi");

let intLocOutput = "";
for (let i = 0; i < (userSession._list[queueIndex].totalStops - 1); i++)
{
    intLocOutput += `<br> ${userSession._list[queueIndex]._locations[i]}`;
}

// This function is called price and it's purpose is to calculate the cost of a trip. The fucntion takes in three parameters, total distance of the trip, time 
// of the trip and the taxi type and performs the necesary calculations and validations to calculate the cost. The functions returns the total cost of the trip is 
// dollars.
function price(distance,time, taxiType)
{
    let vehicleLevy = 0;
    let price = 0;
    let hourOfBooking = parseInt(time[0] + time[1]);
    if(taxiType == "Sedan")
    {
        vehicleLevy = SEDAN;
    }
    else if(taxiType == "SUV")
    {
        vehicleLevy = SUV;
    }
    else if(taxiType == "Van")
    {
        vehicleLevy = VAN;
    }
    else if(taxiType == "Minibus")
    {
        vehicleLevy == MINIBUS;
    }
    price = FLAGRATE + LEVY + (KM * distance) + vehicleLevy;

    if(hourOfBooking < 9 && time > 17)
    {
        price = NIGHT_LEVY*price;
    }

    return price;
}


// This function is called "remove". This function is connected to a button on the html page. This function
// converts the time saved in the booking to a number and compares this time with the current time. If the time difference between the 2 times 
// is greater than 24 hours the selected booking will be deleted from local storage.
function remove() 
{
    if(confirm("Are you sure you want to delete Booking?"))
    {
        const MS_IN_A_DAY = 86400000;
        let dateNow = new Date();
        let dateBooked = new Date(userSession._list[queueIndex]._date);
        let yearBooked = dateBooked.getFullYear();
        let monthBooked = dateBooked.getMonth();
        let dayBooked = dateBooked.getDate();
        let timeBooked = userSession._list[queueIndex]._time;
        let hourBooked = parseInt(timeBooked[0]+timeBooked[1]);
        let minuteBooked = parseInt(timeBooked[3] + timeBooked[4]);
        let formattedDateBooked = new Date(yearBooked, monthBooked, dayBooked, hourBooked, minuteBooked, 0, 0);
        console.log(formattedDateBooked);
        let timeInBetween = formattedDateBooked.getTime() - dateNow.getTime();
        

        if(timeInBetween > MS_IN_A_DAY)
        {
            userSession.removeTrip(queueIndex);
            storeData(APP_DATA_KEY, userSession);
            window.location.assign("index.html");
        }
        else
        {
            alert("Bookings can only be changed or updated more than 24 hours before they commence.");
        }
    }    
}

// this function is named "bacK" and is called when the back booking button is clicked on the summary page and redirects the user the booking list page.
function back()
{
    window.location.assign("allbookings.html");
}

startRef.innerText = `${userSession._list[queueIndex]._pickUp}`;
finalRef.innerHTML = intLocOutput;
dateRef.innerText = `${userSession._list[queueIndex]._date}`;
timeRef.innerText = `${userSession._list[queueIndex]._time}`;
destinationRef.innerText = `${userSession._list[queueIndex]._destination}`;
stopsRef.innerText = `${userSession._list[queueIndex]._totalStops}`;
costRef.innerText = `$${userSession._list[queueIndex]._cost}`;
distanceRef.innerText = `${userSession._list[queueIndex]._distance} Km`;
typeRef.innerText = `${userSession._list[queueIndex]._taxiType}`;





function editType() 
{

    let changeRef = document.getElementById("change");
    const MS_IN_A_DAY = 86400000;
    let dateNow = new Date();
    let dateBooked = new Date(userSession._list[queueIndex]._date);
    let yearBooked = dateBooked.getFullYear();
    let monthBooked = dateBooked.getMonth();
    let dayBooked = dateBooked.getDate();
    let timeBooked = userSession._list[queueIndex]._time;
    let hourBooked = parseInt(timeBooked[0]+timeBooked[1]);
    let minuteBooked = parseInt(timeBooked[3] + timeBooked[4]);
    let formattedDateBooked = new Date(yearBooked, monthBooked, dayBooked, hourBooked, minuteBooked, 0, 0);
    console.log(formattedDateBooked);
    let timeInBetween = formattedDateBooked.getTime() - dateNow.getTime();
    
    if(timeInBetween > MS_IN_A_DAY) 
    {
        userSession._list[queueIndex]._taxiType = changeRef.value;
        let type = userSession._list[queueIndex]._taxiType;
        let time = userSession._list[queueIndex]._time;
        let totalDist = userSession._list[queueIndex]._distance;
        userSession._list[queueIndex]._cost = price(totalDist,time, type).toFixed(2);
        storeData(APP_DATA_KEY, userSession);
        startRef.innerText = `${userSession._list[queueIndex]._pickUp}`;
        finalRef.innerHTML = intLocOutput;
        dateRef.innerText = `${userSession._list[queueIndex]._date}`;
        timeRef.innerText = `${userSession._list[queueIndex]._time}`;
        destinationRef.innerText = `${userSession._list[queueIndex]._destination}`;
        stopsRef.innerText = `${userSession._list[queueIndex]._totalStops}`;
        costRef.innerText = `$${userSession._list[queueIndex]._cost}`;
        distanceRef.innerText = `${userSession._list[queueIndex]._distance} Km`;
        typeRef.innerText = `${userSession._list[queueIndex]._taxiType}`;

    }
    else 
    {
        alert("Bookings can only be changed or updated more than 24 hours before they commence.");
        window.location.assign("allbookings.html");
    }
   
}