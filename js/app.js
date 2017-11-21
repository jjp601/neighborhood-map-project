var map;
var contentBoxes = [];

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
    venue: "4b5f1788f964a52095a529e3"
}, {
    name: "Herbe Sainte",
    lat: 41.240628,
    lng: -96.014914,
    address: "1934 S 67th St, Omaha, NE 68106",
    venue: "5838fbc1fc73d41260d279e8"
}, {
    name: "Au Courant",
    lat: 41.285235,
    lng: -96.00676,
    address: "6064 Maple St, Omaha, NE 68104",
    venue: "5848b656d21e030f39a024d6"
}, {
    name: "Kitchen Table",
    lat: 41.257275,
    lng: -95.935318,
    address: "1415 Farnam St, Omaha, NE 68102",
    venue: "51a8db50498e89db9a229b35"
}, {
    name: "The Drover",
    lat: 41.239149,
    lng: -96.025954,
    address: "2121 S 73rd St, Omaha, NE 68124",
    venue: "4ad4f296f964a520f4fe20e3"
}, {
    name: "Via Farina",
    lat: 41.248701,
    lng: -95.929635,
    address: "1108 S 10th St, Omaha, NE 68108",
    id: "place5",
    venue: "570d29bf498e642238615543"
}, {
    name: "Noli's Pizzeria",
    lat: 41.257634,
    lng: -95.973542,
    address: "4001 Farnam St, Omaha, NE 68131",
    venue: "5525b8b9498e298039260788"
}, {
    name: "Shucks Fish House",
    lat: 41.252275,
    lng: -95.941407,
    address: "1911 Leavenworth Street, Omaha, NE 68102",
    venue: "4ae09a4ff964a520d78021e3"
}, {
    name: "Laka Lono",
    lat: 41.255583,
    lng: -95.932127,
    address: "1202 Howard St, Omaha, NE 68102",
    venue: "58013cb0d67ce4fd75ecd75a"
}, {
    name: "Krug Park",
    lat: 41.284778,
    lng: -96.008588,
    address: "6205 Maple St, Omaha, NE 68104",
    venue: "4e31d7efe4cd681b14d3528d"
}, {
    name: "The Berry & Rye",
    lat: 41.25514,
    lng: -95.931001,
    address: "1105 Howard St, Omaha, NE 68102",
    venue: "516f8dbfe4b0b51140e1f8a3"
}, {
    name: "Leadbelly",
    lat: 41.257466,
    lng: -95.961285,
    address: "3201 Farnam St #6101, Omaha, NE 68131",
    venue: "56e4c222498e7d17c83e8445"
}, ];

// Create Knockout Observables for each place
var Place = function(data) {
    var self = this;

    self.name = ko.observable(data.name);
    self.lat = ko.observable(data.lat);
    self.lng = ko.observable(data.lng);
    self.address = ko.observable(data.address);
    self.venue = ko.observable(data.venue);
    self.show = ko.observable(true);

    this.contentBox = new google.maps.InfoWindow();
    contentBoxes.push(this.contentBox);

    // Create the map markers for each place
    this.placeMarker = new google.maps.Marker({
        position: new google.maps.LatLng(self.lat(), self.lng()),
        map: map,
        venue: self.venue(),
        name: self.name(),
        address: self.address(),
        icon: makeMarkerIcon('F14D16'),
        animation: google.maps.Animation.DROP
    });

    this.placeMarker.setMap(map);

    // Click Event for each Place's marker and retrieving photos with Foursquare API
    this.placeMarker.addListener('click', function() {
        closeContentBoxes();
        $.ajax({
            dataType: "jsonp",
            url: 'https://api.foursquare.com/v2/venues/' +
                self.venue() + '/photos' +
                '?client_id=' + CLIENT_ID +
                '&client_secret=' + CLIENT_SECRET +
                '&v=20170101'

        })

        .done(function(response) {
            var photo = response.response.photos.items;
            self.contentBox.open(map, self.placeMarker);
            $(photo).each(function(item, val) {
                self.contentBox.setContent('<img src="' + val.prefix + '160x150' + val.suffix + '">' +
                '<br><a href="https://foursquare.com/v/venue/' + self.venue() + '" target="_blank">Image from Foursquare' + 
                '<i class="fa fa-foursquare fa-lg" aria-hidden="true"></i></a></br>' + 
                '<br><hr><strong>' +
                self.name() + '</strong><br><p>' +
                self.address() + '</p>');
            });
        })
        // Foursquare Error Handling function
        .fail(function() {
            alert("Data from Foursquare failed to load");
        });
        map.setCenter(self.placeMarker.getPosition());
        self.placeMarker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout((function() {
            self.placeMarker.setAnimation(null);
        }).bind(this), 700);
    });

    // Click Event for each Place's marker when the list item is clicked
    this.placeMarkerClick = function(PlaceItem) {
        google.maps.event.trigger(self.placeMarker, 'click');
    };
};

var ViewModel = function() {
    var self = this;
    
    // Toggle the Search Menu View
    this.toggleSlide = function() {
        $("#locations-menu").slideToggle("slow");
    };

    // Creates an observable array of the places data
    this.placeList = ko.observableArray();
    places.forEach(function(placeItem) {
        self.placeList.push(new Place(placeItem));
    });

    // Filter locations from the Search Menu using Knockout.js to display the places and the list item that matches
    this.query = ko.observable('');

    this.placeSearch = ko.computed(function() {
        var search = self.query().toLowerCase();
        if (search === null) {
            return self.placeList();
        } else {
            return ko.utils.arrayFilter(self.placeList(), function(placeItem) {
                if (placeItem.name().toLowerCase().indexOf(search) >= 0) {
                    placeItem.show(true);
                    placeItem.placeMarker.setVisible(true);
                    return true;
                } else {
                    placeItem.show(false);
                    placeItem.placeMarker.setVisible(false);
                    return false;
                }
            });
        }
    }, self);
};

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

// Clears the content box from the map
function closeContentBoxes() {
    for (var i = 0; i < contentBoxes.length; i++) {
        contentBoxes[i].close();
    }
}

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

    ko.applyBindings(new ViewModel());
}
// Google Map Error handling function
function gMapError() {
    alert('Data from Google Maps failed to load');
}
