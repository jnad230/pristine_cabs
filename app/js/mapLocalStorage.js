"use strict"
// This file is called "mapLocalStorage.js" and its responsible for taking information and portraying on the map on the pages it is linked to
// This file also provides the maps with all their required functionality
mapboxgl.accessToken = "pk.eyJ1IjoiMDcyIiwiYSI6ImNrbzg4dzl0MDAwenkydXBkbjhtYThwNGEifQ.-5PYo-wu4dR_PLG7n5nieg";
let map = new mapboxgl.Map({       // Creating a new map instance
    container: 'map',
    center: [144.9648731, -37.8182711],
    zoom: 16,
    style: 'mapbox://styles/mapbox/streets-v9'
});


// TODO: Open Cage token
const MAPBOX_TOKEN = "9a27965b502b48508b80d266a296fb75";

// name of function: webServiceRequest
// purpose: To pass the token and the call back function to retrieve API content
//  parameter:url, data
// description of return values: geocoding data via callback function as an object

function webServiceRequest(url, data) {
    // Build URL parameters from data object.
    let params = "";
    // For each key in data object...
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (params.length == 0) {
                // First parameter starts with '?'
                params += "&";
            }
            else {
                // Subsequent parameter separated by '&'
                params += "&";
            }

            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(data[key]);

            params += encodedKey + "=" + encodedValue;
        }
    }
    let script = document.createElement('script');
    script.src = url + params;
    document.body.appendChild(script);

    console.log(params)
}

let locationsNames = [];                      // Initialising array to hold pickup and final location names
let locationCords = [];                  // Initialising array to hold pick up and final location coordinates

// name of function:getData
// purpose: To pass input location values and pass it to the url for the web request
//  parameter: nill
// description of return values: calls the webRequestFunction and updates the pick up and final location names
function getData() {

    let pickupSumm = document.getElementById("startDDiv").innerHTML;                // Extracts the pickup location from HTML
    let destinationSumm = document.getElementById("finalD").innerHTML;              // Extracts the additional locations from HTML

    let addy = [pickupSumm, destinationSumm];    

    // define the data to pass for the query string to the web service request function
    //       You will need to pass along the token as well as the callback
    // and pass the url as https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=KEY&jsonp=FUNCTION
    
    let data = {
        key: MAPBOX_TOKEN,
        jsonp: "showData"
    };

    // Calling the Web service request function that will pass the data for the query string 
    for (let i = 0; i < addy.length; i++) {
        
        // Object to hold the place name
        let object = {
            place: addy[i],
        };

        locationsNames.push(object);

        webServiceRequest(`https://api.opencagedata.com/geocode/v1/json?q=${addy[i]}`, data);





    }

}


// name of function:showData
// purpose:retrieve geocoding data
//  parameter: result
// description of return values: retrieves geocoding data and uses it to demonstrate data on map
function showData(result) {
    // This prints the data out to the console (from the web service call)
    // Look at the data returned in the console to complete the remaining parts of this function
    console.log(result);

    // Set the map centre to the city coordinates    
    let data = result.results[0];
    map.setCenter([data.geometry.lng, data.geometry.lat]);

    // Create a marker with the location set to the city coordinates
    let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
    marker.setLngLat([data.geometry.lng, data.geometry.lat]);


    // Create a popup with an offset of 45 and set its contents to show 
    //       the city name (from the API) 
    let popup = new mapboxgl.Popup({ offset: 45 });
    popup.setHTML(data.formatted);
    // Attach the popup to the marker
    marker.setPopup(popup);
    // Add the marker to the map
    marker.addTo(map);
    // Add the popup to the map
    popup.addTo(map);



    let object = {

        coordinates: [data.geometry.lng, data.geometry.lat]
    };

    locationCords.push(object);


}



// For the intermediate locations

let interNames = [];                   // Initialising array to hold intermediate location names
let interCords = [];                  // Initialising array to hold intermediate location coordinates

// name of function:getData
// purpose: To pass input location values and pass it to the url for the web request
//  parameter: nill
// description of return values: calls the webRequestFunction and updates the intermediate location names
function getDataInter() {


    let additionalSumm = document.getElementById("iloca").innerText;           // Extracts the final location from HTML

    let NAddStops = document.getElementById("Nstop").innerText;            // Extracts the total no of stops from HTML

    let intermediateSumm = [];

    for (let lineIndex = 1; lineIndex < (NAddStops); lineIndex++) {             //for loop to iterate through the string of additional locations
        intermediateSumm.push(additionalSumm.trim().split('\n')[lineIndex - 1]);
        //The trime and split is responsible for extracting each line of the string and pushing it in the intermediate locations rray
    }


    // TODO: define the data to pass for the query string to the web service request function
    //       You will need to pass along the token as well as the callback
     // and pass the url as https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=KEY&jsonp=FUNCTION

    let data = {
        key: MAPBOX_TOKEN,
        jsonp: "showDataInter"
    };

    // Calling the Web service request function that will pass the data for the query string 


    webServiceRequest(`https://api.opencagedata.com/geocode/v1/json?q=${intermediateSumm}`, data);

    for (let i = 0; i < intermediateSumm.length; i++) {
        
        // Object to hold the place name
        let object = {
            place: intermediateSumm[i],
        };

        interNames.push(object);

        webServiceRequest(`https://api.opencagedata.com/geocode/v1/json?q=${intermediateSumm[i]}`, data);





    }
}


// name of function:showData
// purpose:retrieve geocoding data
//  parameter: result
// description of return values: retrieves geocoding data and uses it to demonstrate data on map
function showDataInter(result) {
    // This prints the data out to the console (from the web service call)
    // TODO: Look at the data returned in the console to complete the remaining parts of this function
    console.log(result);

    // TODO: Set the map centre to the city coordinates    
    let data = result.results[0];
    map.setCenter([data.geometry.lng, data.geometry.lat]);

    // TODO: Create a marker with the location set to the city coordinates
    let marker = new mapboxgl.Marker({ "color": "#FF8C00" });
    marker.setLngLat([data.geometry.lng, data.geometry.lat]);


    // TODO: Create a popup with an offset of 45 and set its contents to show 
    //       the city name (from the API) 
    let popup = new mapboxgl.Popup({ offset: 45 });
    popup.setHTML(data.formatted);
    // TODO: Attach the popup to the marker
    marker.setPopup(popup);
    // TODO: Add the marker to the map
    marker.addTo(map);
    // TODO: Add the popup to the map
    popup.addTo(map);



    let object = {

        coordinates: [data.geometry.lng, data.geometry.lat]
    };

    interCords.push(object);


}



// name of function:showPath
// purpose: to show the path between displayed locations on map
//  parameter: nill
// description of return values: path on map
function showPath() {

    // removing the polygon and circle layer before adding the polyline
    removeLayerWithId('polygon')
    removeLayerWithId('circle')

    let object = {
        type: "geojson",
        data: {
            type: "Feature",
            properties: {},
            geometry: {
                type: "LineString",
                coordinates: []
            }
        }
    };

    // Adding pick up location coordinates to source object required to show path
    object.data.geometry.coordinates.push(locationCords[1].coordinates);

    // Adding intermediate location coordinates to object required to show path
    for (let i = 0; i < interCords.length; i++) {
        object.data.geometry.coordinates.push(interCords[i].coordinates);

    }

    // Adding final destination location coordinates to source object required to show path
    object.data.geometry.coordinates.push(locationCords[0].coordinates);

    map.addLayer({
        id: "routes",
        type: "line",
        source: object,
        layout: { "line-join": "miter", "line-cap": "butt" },
        paint: { "line-color": "#304fbf", "line-width": 6 }
    });
}

// name of function:showPolygon
// purpose: to show the polygon between displayed locations on map
//  parameter: nill
// description of return values: polygon on map
function showPolygon() {

    // removing the polyline and circle layer before adding the polygon
    removeLayerWithId('routes')
    removeLayerWithId('circle')

    let object = {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [[]]
            }
        }
    };

    // Adding pick up location coordinates to source object required to show polygon
    object.data.geometry.coordinates[0][0] = locationCords[1].coordinates;

    // Adding intermediate location coordinates to object required to show polygon

    for (let i = 0; i < interCords.length; i++) {

        object.data.geometry.coordinates[0][i + 1] = interCords[i].coordinates;
        // sets the elements from index 2 to 2nd last element to intermediate location coordinates

    }



    // Adding final destination location coordinates to source object required to show polygon
    object.data.geometry.coordinates[0][interCords.length + 2] = locationCords[0].coordinates;

    // adding the first location again to the last
    object.data.geometry.coordinates[0][0] = locationCords[0].coordinates;

    map.addLayer({
        id: 'polygon',
        type: 'fill',
        source: object,
        layout: {},
        paint: {
            'fill-color': '#d8e328',
            'fill-opacity': 0.8
        }
    });
}

// name of function:removeLayerWithId
// purpose: to remove layers to prevent overlay of show path, show polygon and showcricle
//  parameter: idToRemove - id of the layer to be removed
// description of return values: called at the sart of each of the layer functions to prevent overlay 
function removeLayerWithId(idToRemove) {
    let hasPoly = map.getLayer(idToRemove)
    if (hasPoly !== undefined) {
        map.removeLayer(idToRemove)
        map.removeSource(idToRemove)
    }
}

// name of function:showPolygon
// purpose: to show the polygon between displayed locations on map
//  parameter: nill
// description of return values: polygon on map
function showCircle() {

    // removing the polyline and circle layer before adding the polygon
    removeLayerWithId('polygon')
    removeLayerWithId('circle')

    map.addSource('circle', {
        "type": "geojson",
        "data": {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": locationCords[1].coordinates
            },
            "properties": {}
        }
    });

    map.addLayer({
        id: 'circle',
        type: 'circle',
        source: 'circle',
        paint: {
            'circle-color': '#00b7bf',
            'circle-radius': 250,
            'circle-opacity': 0.2,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#333',
        },
    });


}

// name of function:panToStart
// purpose: pans to the start location of the user
//  parameter: nill
// description of return values: flys to users location coordinates
function panToStart() {
    let start = locationCords[1].coordinates;
    map.panTo(start);
}

// used to call the getData and getDataInter functions upon page load
window.onload = function () {
    getData();
    getDataInter();
};


