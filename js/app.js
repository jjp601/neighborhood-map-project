var map;

// FourSquare API Credentials 
var CLIENT_ID = 'VATU5M23P4DG2WGJWBDXHU5URQOFRHFW520Z0G5YUPV2L5TE';
var CLIENT_SECRET = 'C2JWS1R1JSTOG05PRAALEYO3ZD1KK3BHG5A1Y0VPNOBYFWTE';

// Map Styles
var styles = [
    {
      featureType: 'water',
      stylers: [
        { color: '#19a0d8' }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.stroke',
      stylers: [
        { color: '#ffffff' },
        { weight: 6 }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        { color: '#e85113' }
      ]
    },{
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        { visibility: 'on' },
        { color: '#f0e4d3' }
      ]
    }
  ];

// Location Information
var places = [{
    name: "Block 16",
    lat: 41.257441,
    lng: -95.937771,
    address: "1611 Farnam St, Omaha, NE 68106",
    id: "place0",
    venue: "4b5f1788f964a52095a529e3",
    visible: ko.observable(true),
    show: true,
}, {
    name: "Herbe Sainte",
    lat: 41.240628,
    lng: -96.014914,
    address: "1934 S 67th St, Omaha, NE 68106",
    id: "place1",
    venue: "5838fbc1fc73d41260d279e8",
    visible: ko.observable(true),
    show: true
}, {
    name: "Au Courant",
    lat: 41.285235,
    lng: -96.00676,
    address: "6064 Maple St, Omaha, NE 68104",
    id: "place2",
    venue: "5848b656d21e030f39a024d6",
    visible: ko.observable(true),
    show: true
}, {
    name: "Kitchen Table",
    lat: 41.257275,
    lng: -95.935318,
    address: "1415 Farnam St, Omaha, NE 68102",
    id: "place3",
    venue: "51a8db50498e89db9a229b35",
    visible: ko.observable(true),
    show: true
}, {
    name: "The Drover",
    lat: 41.239149,
    lng: -96.025954,
    address: "2121 S 73rd St, Omaha, NE 68124",
    id: "place4",
    venue: "4ad4f296f964a520f4fe20e3",
    visible: ko.observable(true),
    show: true
}, {
    name: "Via Farina",
    lat: 41.248701,
    lng: -95.929635,
    address: "1108 S 10th St, Omaha, NE 68108",
    id: "place5",
    venue: "570d29bf498e642238615543",
    visible: ko.observable(true),
    show: true
}, {
    name: "Noli's Pizzeria",
    lat: 41.257634,
    lng: -95.973542,
    address: "4001 Farnam St, Omaha, NE 68131",
    id: "place6",
    venue: "5525b8b9498e298039260788",
    visible: ko.observable(true),
    show: true
}, {
    name: "Shucks Fish House",
    lat: 41.252275,
    lng: -95.941407,
    address: "1911 Leavenworth Street, Omaha, NE 68102",
    id: "place7",
    venue: "4ae09a4ff964a520d78021e3",
    visible: ko.observable(true),
    show: true
}, {
    name: "Laka Lono",
    lat: 41.255583,
    lng: -95.932127,
    address: "1202 Howard St, Omaha, NE 68102",
    id: "place8",
    venue: "58013cb0d67ce4fd75ecd75a",
    visible: ko.observable(true),
    show: true
}, {
    name: "Krug Park",
    lat: 41.284778,
    lng: -96.008588,
    address: "6205 Maple St, Omaha, NE 68104",
    id: "place9",
    venue: "4e31d7efe4cd681b14d3528d",
    visible: ko.observable(true),
    show: true
}, {
    name: "The Berry & Rye",
    lat: 41.25514,
    lng: -95.931001,
    address: "1105 Howard St, Omaha, NE 68102",
    id: "place10",
    venue: "516f8dbfe4b0b51140e1f8a3",
    visible: ko.observable(true),
    show: true
}, {
    name: "Leadbelly",
    lat: 41.257466,
    lng: -95.961285,
    address: "3201 Farnam St #6101, Omaha, NE 68131",
    id: "place11",
    venue: "56e4c222498e7d17c83e8445",
    visible: ko.observable(true),
    show: true
}, ];

// Initialize the Neighborhood Map
function initMap() {
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(41.252363, -95.997988),
        styles: styles,
        mapTypeControl: false
    };
    if ($(window).width() <= 1200) {
        mapOptions.zoom = 12;
    }
    if ($(window).width() <= 800) {
        mapOptions.zoom = 11;
    }
    if ($(window).width() <= 500) {
        mapOptions.zoom = 10;
    }
    
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    setLocations(places);

    showPlaces();
}

function gMapError() {
    alert('Data from Google Maps failed to load');
}

// Shows places on the Map
function showPlaces() {
    for (var i = 0; i < places.length; i++) {
        if (places[i].show === true) {
            places[i].placeMarker.setMap(map);
        } else {
            places[i].placeMarker.setMap(null);
        }
    }
}

// Set the locations of the places and their infoWindows
function setLocations(location) {

    for (i = 0; i < location.length; i++) {
        location[i].placeMarker = new google.maps.Marker({
            position: new google.maps.LatLng(location[i].lat, location[i].lng),
            map: map,
            name: location[i].name,
            venue: location[i].venue,
            icon: makeMarkerIcon('F14D16')
        });

    // Create and style the map markers for each place
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(20, 35),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(20,35));
        return markerImage;
    }    


        var contentBox = new google.maps.InfoWindow();

        // Click Event for each Place's marker and retrieving photos with Foursquare API
        new google.maps.event.addListener(location[i].placeMarker, 'click', (function(place, i) {
            return function() {
                $.ajax({
                    dataType: "jsonp",
                    url: 'https://api.foursquare.com/v2/venues/' +
                        location[i].venue + '/photos' +
                        '?client_id=' + CLIENT_ID +
                        '&client_secret=' + CLIENT_SECRET +
                        '&v=20170101'
                })

                .done(function(response) {
                    var photo = response.response.photos.items;
                    contentBox.open(map, location[i].placeMarker);
                    // Populates the content box and loads a photo from Foursquare
                    $(photo).each(function(item, val) {
                        contentBox.setContent('<img src="' + val.prefix + '160x150' + val.suffix + '">' +
                        '<br><a href="https://foursquare.com/v/venue/' + location[i].venue + '" target="_blank">Image from Foursquare' + 
                        '<i class="fa fa-foursquare fa-lg" aria-hidden="true"></i></a></br>' + 
                        '<br><hr><strong>' +
                        location[i].name + '</strong><br><p>' +
                        location[i].address + '</p>');
                    });
                    map.setCenter(place.getPosition());
                    location[i].placeMarker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout((function() {
                        location[i].placeMarker.setAnimation(null);
                    }).bind(this), 750);
                })
                // Error Handling function
                .fail(function() {
                    alert("Data from Foursquare failed to load");
                });
                
            };
        })(location[i].placeMarker, i));

        // Click Event for each Place's marker when the list item is clicked and retrieving photos with Foursquare API
        var searchMenu = $('#place' + i);
        searchMenu.click((function(place, i) {
            return function() {
                $.ajax({
                    dataType: "jsonp",
                    url: 'https://api.foursquare.com/v2/venues/' +
                        location[i].venue + '/photos' +
                        '?client_id=' + CLIENT_ID +
                        '&client_secret=' + CLIENT_SECRET +
                        '&v=20170101'
                })

                .done(function(response) {
                    var photo = response.response.photos.items;
                    contentBox.open(map, place);
                    // Populates the content box and loads a photo from Foursquare
                    $(photo).each(function(item, val) {
                        contentBox.setContent('<img src="' + val.prefix + '160x150' + val.suffix + '">' +
                        '<br><a href="https://foursquare.com/v/venue/' + location[i].venue + '" target="_blank">Image from Foursquare' + 
                        '<i class="fa fa-foursquare fa-lg" aria-hidden="true"></i></a></br>' +
                        '<br><hr><strong>' +
                        location[i].name + '</strong><br><p>' +
                        location[i].address + '</p>');
                    });
                    map.setCenter(place.getPosition());
                    place.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout((function() {
                        place.setAnimation(null);
                    }).bind(this), 750);
                })
                // Error Handling function
                .fail(function() {
                    alert("Data from Foursquare failed to load");
                });

            };
        })(location[i].placeMarker, i));
    }
}

// Show or hide places in sync with the search
$("input").keyup(function() {
    showPlaces();
});


var viewModel = {
    query: ko.observable(''),
    // This function will loop through the places array and displays all the map markers
    resetMap : function() {
        initMap();
        for (var i = 0; i < places.length; i++) {
            if (places[i].show === true) {
                places[i].placeMarker.setMap(map);  
            } else {
                places[i].show = true;
                showPlaces();
                places[i].placeMarker.setAnimation(google.maps.Animation.DROP);
            }
        }
    },
    // Toggle the Search Menu View
    toggleSlide : function() {
        $("#locations-menu").slideToggle("slow");
    },
};

// Filter locations from the Search Menu using Knockout.js to display the places and the list item that matches
viewModel.places = ko.computed(function() {
    var self = this;
    var search = self.query().toLowerCase();
    return ko.utils.arrayFilter(places, function(place) {
        if (place.name.toLowerCase().indexOf(search) >= 0) {
            place.show = true;
            return place.visible(true);
        } else {
            place.show = false;
            showPlaces();
            return place.visible(false);
        }
    });
}, viewModel);

ko.applyBindings(viewModel);
