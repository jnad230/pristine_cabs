"use strict"
// The purpose of this js file is to display all the ‘current,’ ‘future,’ and ‘past,’ bookings the user made. It serves as a checkpoint within the app allowing the user 
// to review the bookings made, displaying brief information. However, also incorporating a button redirecting the user to the ‘future booking summary page’ to 
// view all the information of the bookings made stored in the local storage.


// this function is called "view" and it's purpose is to save the index of a selected trip to local storage and redirect users to a summary page.
// this function takes in one parameter: index of the trip, and doesn't return any values.
function view(index)
{
    localStorage.setItem(INDEX_KEY,index);
    window.location.assign("futureBookingSum.html");// redirect to the future booking page
}
// this function is called "display" and it's purpose is to sort out all bookings and display them in appropriate groups on the html page.
// this function takes in no parameters and does not return any thing.
function display()
{
    let displayPastRef = document.getElementById("past");
    let displayFutureRef = document.getElementById("future");
    let outputPast = `<ul class="mdl-list"><h4>Past</h4>`;
    let outputFuture = ` <ul class="mdl-list"><h4>Future</h4>`;
    for(let i = 0; i<userSession._list.length;i++)
    {
       let timeNow = new Date(); 
       let timeMs = timeNow.getTime();
       let dateBooked = new Date(userSession._list[i]._date);
       let monthNow = dateBooked.getMonth()
       let dateNow = dateBooked.getDate();
       let yearNow = dateBooked.getFullYear();
       let timeBooked = userSession._list[i]._time;
       let hourBooked = parseInt(timeBooked[0]+timeBooked[1]);
       let minuteBooked = parseInt(timeBooked[3] + timeBooked[4]);
       let bookingData = new Date(yearNow, monthNow, dateNow, hourBooked, minuteBooked, 0, 0);


       if(bookingData.getTime() < timeMs)
       {
           outputPast += `<li class="mdl-list__item mdl-list__item--three-line">
                            <span class="mdl-list__item-primary-content">
                                <span>Final Destination: ${userSession._list[i].destination}</span>
                                <span class="mdl-list__item-text-body">
                                    Number of spots: ${userSession._list[i].totalStops} <br>
                                    Total Distance: ${userSession._list[i].distance} Km <br>
                                    Total Fare: $${userSession._list[i].cost} <br>
                                </span>
                            </span>
                            <span class="mdl-list__item-secondary-content"> ${userSession._list[i].date} </span>
                            <span class="mdl-list__item-secondary-content">
                                <a class="mdl-list__item-secondary-action" onclick="view(${i})"><i
                                        class="material-icons">info</i></a>                            
                        </li>`;
       }
       else if(bookingData.getTime() > timeMs)
       {
           outputFuture += `<li class="mdl-list__item mdl-list__item--three-line">
                                <span class="mdl-list__item-primary-content">
                                    <span>Final Destination: ${userSession._list[i].destination}</span>
                                    <span class="mdl-list__item-text-body">
                                        Number of spots: ${userSession._list[i].totalStops} <br>
                                        Total Distance: ${userSession._list[i].distance} Km <br>
                                        Total Fare: $${userSession._list[i].cost} <br>
                                    </span>
                                </span>
                                <span class="mdl-list__item-secondary-content"> ${userSession._list[i].date} </span>
                                <span class="mdl-list__item-secondary-content">
                                    <a class="mdl-list__item-secondary-action" onclick="view(${i})"><i
                                            class="material-icons">info</i></a>
                                </span>                                
                            </li>`;
       }
    }
    outputPast += `</ul>`;
    outputFuture += `</ul>`;
    displayPastRef.innerHTML = outputPast;
    displayFutureRef.innerHTML = outputFuture;
}

display();