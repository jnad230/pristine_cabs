"use strict"

//This file is called "main.js" and is linked to all the html files in the 
// assignment 2 folder. The purpose of this file is to create the classes and functions required to 
// create individual trips and store them in an array. The classes contain all the neccesary methods and this file contains all the necesaary functions 
// to save the data to local storage and initiate and maintain the queue. The file also contains universal code which 
// creates the class instance for a session 


const APP_DATA_KEY = "taxiAppData";
const INDEX_KEY = "listIndex";
class Trip
{
    constructor(time,date,cost,taxiType,pickUp,destination,distance,totalStops,locations,lng,lat)
    {
        this._time = time;
        this._date = date;
        this._cost = cost;
        this._taxiType = taxiType;
        this._pickUp = pickUp;
        this._destination = destination;
        this._distance = distance;
        this._totalStops = totalStops;
        this._locations = locations;
        this._lng = lng;
        this._lat = lat;
        this._taxiNo = Math.floor(Math.random()*(999-100)+100);
    }
    get time()
    {
        return this._time;
    }
    get date()
    {
        return this._date;
    }
    get cost()
    {
        return this._cost;
    }
    get taxiType()
    {
        return this._taxiType;
    }
    get pickUp()
    {
        return this._pickUp;
    }
    get destination()
    {
        return this._destination;
    }
    get distance()
    {
        return this._distance;
    }
    get totalStops()
    {
        return this._totalStops;
    }
    get locations()
    {
        return this._locations;
    }
    set taxiType(newType)
    {
        return this._taxiType = newType;
    }
    // This method returns the data obtained from local storage from strings back into an instance of the trip class.
    fromData(data)
    {
        this._time = data._time;
        this._date = data._date;
        this._cost = data._cost;
        this._taxiType = data._taxiType;
        this._pickUp = data._pickUp;
        this._destination = data._destination;
        this._distance = data._distance;
        this._totalStops = data._totalStops;
        this._locations = data._locations;
        this._lng = data._lng;
        this._lat = data._lat;
        this._taxiNo = data._taxiNo;
    }
    
    
}

class Session
{
    constructor()
    {
        this._list = [];
    }
    get list()
    {
        return this._list;
    }
    // This method takes in a variety of parameters that are associated with the attributes in the 'trip' class and creates a new instance of
    // that class before adding to the end of the "_list" array.
    addList(time,date,cost,taxiType,pickUp,destination,distance,totalStops,locations)
    {
        let addTrip = new Trip(time,date,cost,taxiType,pickUp,destination,distance,totalStops,locations);
        this._list.push(addTrip);
    }
    // This method takes in the index of a particular trip as a parameter and removes that trip from the array "_list".
    removeTrip(index)
    {
        this._list.splice(index,1);
    }
    // This method takes in the index of a particular trip as a parameter and retrieves and returns that trip form the array, "_list".
    getTrip(index)
    {
        let temp = this._list[index]
        return temp;
    }
    // This method takes in and object as a parameter and restores the instance of the session class stored in local storage from strings back into an instance of the class.
    fromData(object)
    {
        this._list = [];
        for(let i = 0; i<object._list.length; i++)
        {
            let trip = new Trip;
            trip.fromData(object._list[i]);
            this._list.push(trip);
        }
    }
   
}
// This function checks if data exists in local storage at the given key and returns true if it exists and false if it doesn't.
// The function takes one parameter which is the key.
function dataCheck(key)
{
    if (typeof(Storage) !== "undefined")
    {
        console.log("Local storage is available");
        let data = retrieveData(key);
        if (data !== null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        console.log("Local storage not supported or blocked");
    }

}
// This function stringifies data before storing it in local storage under the key that is passed into the function.
// This function takes in two parameters the key and data.
function storeData(key,data)
{
    if (typeof(data) === 'object')
    {
        data = JSON.stringify(data);
    }
    localStorage.setItem(key, data);
}
// This function retrieves data from local storage at the key passed into the function as an argument. This function also parses the data back 
// into an object where needed an returns it using a return statement.
function retrieveData(key)
{
    let data = localStorage.getItem(key);
    try
    {
      data = JSON.parse(data);
    }
    catch (error)
    {
      console.log(error);
    }
    finally
    {
      return data;
    }
}

let userSession = new Session;
let a = dataCheck(APP_DATA_KEY);
if(a == true)
{
    let data = retrieveData(APP_DATA_KEY);
    userSession.fromData(data);
}
else
{
    storeData(APP_DATA_KEY,userSession);
}