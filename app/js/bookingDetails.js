"use strict"
// The purpose of this JS file is to display the information that the user input from the booking page and allow the user to cancel their booking by clicking the cancel button. 
// Nevertheless, the users are allowed to cancel their booking by clicking on the ‘cancel button which then will redirect back to the home page. The user will be able visit the 
// booking summary page, once they confirm their booking by clicking on the confirm button.


let temp = userSession._list.length;
let startRef = document.getElementById("startDDiv");
let finalRef = document.getElementById("iloca");     
let dateRef = document.getElementById("Sdate");
let timeRef = document.getElementById("Stime");
let destinationRef = document.getElementById("finalD");
let stopsRef = document.getElementById("Nstop");
let costRef = document.getElementById("cost");
let distanceRef = document.getElementById("distance");
let typeRef = document.getElementById("taxi");

let intLocOutput = "";


for(let i = 0; i<(userSession._list[temp-1].totalStops - 1) ; i++)
{
    intLocOutput += `<br> ${userSession._list[temp-1]._locations[i]}`;
}

    startRef.innerText = `${userSession._list[temp - 1]._pickUp}`;
    finalRef.innerHTML = intLocOutput;
    dateRef.innerText = `${userSession._list[temp - 1]._date}`;
    timeRef.innerText = `${userSession._list[temp - 1]._time}`;
    destinationRef.innerText = `${userSession._list[temp - 1]._destination}`;
    stopsRef.innerText = `${userSession._list[temp - 1]._totalStops}`;
    costRef.innerText = `$${userSession._list[temp - 1]._cost}`;
    distanceRef.innerText = `${userSession._list[temp - 1]._distance} Km`;
    typeRef.innerText = `${userSession._list[temp - 1]._taxiType}`;
    


   
// This functions is called "cancel" and it's purpose is to delete a trip from local storage and redirect the user to the home page.
// This function has no parameters and doesn't return any values.
function cancel()
{
    userSession.removeTrip(temp - 1);
    storeData(APP_DATA_KEY, userSession);
    window.location.assign("index.html");
}

// this function is names "confirm" and is called when the confirm booking button is clicked on the summary page and redirects the user to the booking list page.
function confirm()
{
    window.location.assign("allbookings.html");
}