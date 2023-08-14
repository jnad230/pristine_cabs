"use strict"
// This page is called "booking.js" and is linked to the booking.html file. The purpose of this JS file is to allow the user to input their information in the booking page 
// and save their input data. This includes the pick up location, Final destination, pick up time, pick up date and taxi type.
// Moreover, there is also an option for the user to add their intermediate location by clicking at the add stops button.  If the user wishes to remove the intermediate location, they can do it by 
// clicking at the x icon beside the intermediate location. Furthermore, we set the cost for each type of taxi so that it can be calculated in the total cost for this trip. This file will estimate the total 
// distance and calculate the total cost for the trip and display it to the user before the user can confirm the booking by clicking on the “confirm booking” button which then will redirect the user to the 
// booking summary page(bookingsum.html).



//define all constant variable for fare cost calculation
const LEVY = 1.10;
const FLAGRATE = 4.20;
const KM = 1.622;
const NIGHT_LEVY = 1.20;
const SEDAN = 0.00;
const SUV = 3.50;
const VAN = 6.00;
const MINIBUS = 10.00;
let intlocations = [];


// this function is called "addStops" and is linked to the 'add stops' button on the booking page through the updatelist function. This function takes in one parameter which is data and also 
//retireves the data inserted into the associated div on the html page. The infomation retrieved is then pushed into an array and is also ouptuted as a text on the html page.
function addStops(data) 
{
    let addStopRef = document.getElementById("stopList");
    let stopRef = document.getElementById("addStops");
    data.push(stopRef.value);
    let output = `<div class="mdl-list"><span>Intermediate Stops</span>`;
    for(let i = 0; i<data.length;i++)
    {
        output += `<li class="mdl-list__item mdl-list__item--three-line">
        <span class="mdl-list__item-primary-content">
            <span id = "intermediate" >${data[i]}</span>
        </span>
        <span class="mdl-list__item-secondary-content">
            <a class="mdl-list__item-secondary-action" onclick="remove(${i})"><i
                    class="material-icons">cancel</i></a>
        </span>        
        </li>`;
    }
    output += `</div>`;
    addStopRef.innerHTML = output;
}

// This function is called 'remove' and is linked to the cancel button on the booking page. The function takes in one parameter which is index.
// This function removes the location saved at the index in the intlocations array and iterates through the edited array and outputs the remaining locations 
// as text on the html page. 
function remove(index)
{
    let addStopRef = document.getElementById("stopList");
    intlocations.splice(index,1);
    let output = `<div class="mdl-list"><span>Intermediate Stops</span>`;

   
    for(let i = 0; i<intlocations.length;i++)
    {
        output += `<li class="mdl-list__item mdl-list__item--three-line">
        <span class="mdl-list__item-primary-content">
            <span>${intlocations[i]}</span>
        </span>
        <span class="mdl-list__item-secondary-content">
            <a class="mdl-list__item-secondary-action" onclick="remove(${i})"><i
                    class="material-icons">cancel</i></a>
        </span>        
        </li>`;
    }
    output += `</div>`;
    addStopRef.innerHTML = output;
}
// This function is called "updateList" and is linked to the "add stops" button on the booking page. This function updates the displayed list of 
// intermediate locations on the page as locations are added.
function updateList()
{
    addStops(intlocations);
}

// This function is called "distance" and it's purpose is to calculate the total distance betwween locations inputted by the user. The functions takes in 
// two parameters which contain the coordinates for all of the locations and uses the Haversine Formula to calculate the total distance of the trip in Km. This 
// function returns the total distance of the trip in Km


function distance(array1, array2)
{
    let allCoords = [];
    let distance = 0;
    const RADIUS = 6371;
    let counter = array1.length;
    allCoords.push(array1[counter -1]);
    for(let i = 0; i< array2.length; i++)
    {
        allCoords.push(array2[i]);
    }
    allCoords.push(array1[counter - 2]);
    console.log(allCoords);
    for(let j = 0; j<allCoords.length - 1; j++)
    {
        let lat1 = allCoords[j].coordinates[1] * Math.PI/180;
        let lat2 = allCoords[j +1].coordinates[1] * Math.PI/180;
        let changeLat = (lat2 - lat1);
        let changeLong = (allCoords[j +1].coordinates[0] - allCoords[j].coordinates[0]) * Math.PI/180;

        let a = Math.sin(changeLat/2) * Math.sin(changeLat/2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(changeLong/2) * Math.sin(changeLong/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        distance = distance + (RADIUS * c);
    }

    return distance;
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

// This function is called "displayCostDist" and it's purpose is to display the total cost and distance of the trip along with the confirmation button
// after the taxi type is selected. The function takes in no parameters and doesn't return anything.
function displayCostDist()
{
    let timeRef = document.getElementById("time");
    let typeRef = document.getElementById("taxiType");
    

    let time = timeRef.value;
    let taxiType = typeRef.value;
    
    let totalDistance = distance(locationCords,interCords);
    let totalCost = price(totalDistance,time, taxiType);
    totalDistance = totalDistance.toFixed(2);
    totalCost = totalCost.toFixed(2);

    let displayInfo = document.getElementById("costDistance");

    displayInfo.innerHTML = `<span>Cost: $${totalCost}</span><br>
                             <span>Distance: ${totalDistance} Km</span><br>
                             <button
                                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" onclick = "makeBooking()">
                                Confirm Booking
                            </button>`
    
}

// this function is called "makeBooking" and it's purpose is to retrieve all the users' inputs as well as the associated cost and distance of the trip
// and save it to local storage. THe function takes in no parameters and doesn't return a value.
function makeBooking()
{

    let timeRef = document.getElementById("time");
    let dateRef = document.getElementById("doB");
    let typeRef = document.getElementById("taxiType");
    let pickUpRef = document.getElementById("pickUp");
    let destinationRef = document.getElementById("destination");



    let time = timeRef.value;
    let date = dateRef.value;
    let taxiType = typeRef.value;
    let pickUp = pickUpRef.value;
    let destination = destinationRef.value;
    let totalDistance = distance(locationCords, interCords);
    let totalCost = price(totalDistance,time, taxiType);
    totalDistance = totalDistance.toFixed(2);
    totalCost = totalCost.toFixed(2);
    let totalStops = intlocations.length + 1; /* length of additonal stops array +2*/

    let timeProbRef = document.getElementById("time_msg");
    let dateProbRef = document.getElementById("doB_msg");
    let typeProbRef = document.getElementById("taxiType_msg");
    let pickUpProbRef = document.getElementById("pickUp_msg");
    let destinationProbRef = document.getElementById("destination_msg");


    if (time == "") {
        timeProbRef.innerText = "Enter a Time."
        return;
    }
    else if (date == "") {
        dateProbRef.innerText = "Enter a Date."
        return;
    }
    else if (taxiType == "") {
        typeProbRef.innerText = "Choose a Taxi Type."
        return;
    }
    else if (pickUp == "") {
        pickUpProbRef.innerText = "Choose a pickup location."
        return;
    }
    else if (destination == "") {
        destinationProbRef.innerText = "Choose a destination."
        return;
    }
    else {
        userSession.addList(time,date,totalCost,taxiType,pickUp,destination,totalDistance,totalStops,intlocations)
        storeData(APP_DATA_KEY, userSession);
        window.alert("Your booking is successful");
        window.location.assign("bookingsum.html");
    }
}
