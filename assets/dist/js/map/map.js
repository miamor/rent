/* Loại: (type)
 * S: Phòng riêng, khu vệ sinh/nấu nướng chung
 * M: Phòng khép kín, chung nhà
 * L: Nhà riêng (thuê cả nhà)
 * Số người: (room) 1, 2,...
 */

var browser = {
    isMobile: window.navigator.userAgent.indexOf('iPad') > 0
};
var minZoomAllowSearch = 10;
var minZoom = 5;
var defaultCenter = '20.9947910308838:105.86784362793003'; // hanoi
var options = {city:'',district:'',ward:'',street:''};
var c_city = c_district = c_ward = null;
var city = district = ward = street = project = null;
var utilMarkers = {
    restaurant: {
        default: {
            url: MAIN_URL+'/assets/img/pin_lg_Restaurant.png',
        },
        sm: {
            url: MAIN_URL+'/assets/img/pin_sm_Restaurant.png',
        },
        click: {
            url: MAIN_URL+'/assets/img/pin_lg_Restaurant.png',
        }
    }
}
var markerSize = new google.maps.Size(23, 25);
var markerOrigin = new google.maps.Point(12, 12);
var markerAnchor = new google.maps.Point(0, 32);
var labelPoint = new google.maps.Point(0,0); // 11,25
var iconMarker = {
    default: {
        labelOrigin: labelPoint,
        url: MAIN_URL+'/assets/img/marker.svg',
        /*scaledSize: markerSize,
        size: markerSize,
        origin: markerOrigin,
        anchor: markerAnchor*/
    },
    hover: {
        labelOrigin: labelPoint,
        url: MAIN_URL+'/assets/img/marker-hightlight.svg',
        /*scaledSize: markerSize,
        size: markerSize,
        origin: markerOrigin,
        anchor: markerAnchor*/
    },
    select: {
        labelOrigin: labelPoint,
        url: MAIN_URL+'/assets/img/marker5.png',
        /*scaledSize: markerSize,
        size: markerSize,
        origin: markerOrigin,
        anchor: markerAnchor*/
    },
    group: {
        url: MAIN_URL+'/assets/img/marker-plus.svg',
    }
};
var zoom_markerView = 16;
var zoom_moderate = 14;
var zoom_utilityView = 15;
var cityList = [];

(function($) {
    function CoordMapType(a) {
        this.tileSize = a
    };
    CoordMapType.prototype.getTile = function(a, b, c) {
        var d = c.createElement('div');
        d.innerHTML = a;
        d.style.width = this.tileSize.width + 'px';
        d.style.height = this.tileSize.height + 'px';
        d.style.fontSize = '10';
        d.style.borderStyle = 'solid';
        d.style.borderWidth = '1px';
        d.style.borderColor = '#AAAAAA';
        return d
    };
    ProductMap = function(o, p, q, r, s) {
        var v = $(this).attr('id');
        $thismap = this;
        this.data = [];
        this.dataProject = [];
        this.map = null;
        this.mapType = s.mapType;
        this.mapPoly = null;
        this.polyline = null;
        this.listLatlgn = null;
        this.projectOverlay = new Array();
        this.markerCluster = null;
        this.markerPoint = new google.maps.Marker();
        this.autocomplete = null;
        this.geocoder = new google.maps.Geocoder();
        this.circle = null;
        this.circleAroundSearchPoint = null;
        this.currentPid = null;
        this.currentPjid = null;
        this.currentUid = null;
        this.BoxSearchPlace = null;
        this.tooltip = null;
        //this.btnUpdateMapidleResult = $('.btn-map-update-result');
        $thismap.isDrawing = s.lstPoint != undefined && s.lstPoint != '';
        this.isMapidle = false;
        this.isShowRefreshButton = false;
        this.isShowUtil = false;
        this.isDetails = false;
        this.pointPos = null;
        this.pointRadius = null;
        this.infoBoxOptions = {
            disableAutoPan: false,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-188, 20),
            zIndex: 1000,
            boxClass: 'bdsInfoWindow',
            closeBoxURL: "http://file4.batdongsan.com.vn/images/Product/Maps/close.png",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            alignBottom: true,
            enableEventPropagation: false
        };
        this.infoWindow = new google.maps.InfoWindow();
        this.infoTipWindow = new google.maps.InfoWindow();
        this.selectedMarker = new google.maps.Marker({
            icon: iconMarker.select
        });

        this.oms = null;

        this.beginDrawButton = $('.' + o);
        this.deleteShapeButton = $('.' + p);
        this.fullScreenButton = $('.' + q);
        this.exitFullScreenButton = $('.' + r);

        this.isMapResize = false;

        this.input = {};
        this.input.type = document.getElementById('type');
        this.input.city = document.getElementById('city');
        this.input.district = document.getElementById('district');
        this.input.ward = document.getElementById('ward');
        this.input.street = document.getElementById('street');
        this.input.direction = document.getElementById('direction');
        this.input.price = document.getElementById('price');
        this.input.area = document.getElementById('area');
        this.input.zoom = document.getElementById('zoom');
        this.input.center = document.getElementById('center');
        this.input.points = document.getElementById('points');
        this.input.product = document.getElementById('product');
        this.input.isShowUtil = document.getElementById('isShowUtil');
        this.input.details = document.getElementById('details');
        this.input.location = document.getElementById('location');
        this.input.lat = document.getElementById('lat');
        this.input.lng = document.getElementById('lng');
        this.input.location_radius = document.getElementById('location_radius');

        this.setContext = function(a, b, c) {
            if (a != undefined && a != '') {
                this.showInfoWindow(a)
            }
            if (b != undefined && c != undefined) {
                var d = parseFloat(c.split(':')[0]);
                var e = parseFloat(c.split(':')[1]);
                this.map.setCenter(new google.maps.LatLng(d, e));
                this.map.setZoom(parseInt(b))
            }
        };

        google.maps.event.addListener(this.infoWindow, 'domready', function() {
            $('.gm-style-iw').each(function () {
                var iwOuter = $(this);
                iwOuter.parent().attr('class', '');
                if (iwOuter.find('#iw-container').length) {
                    iwOuter.parent().addClass('gw-style-parent');
                    //iwOuter.parent().css('height', 250);
                    var iwBackground = iwOuter.prev();
                    iwBackground.removeClass('gw-style-bg').addClass('gw-style-bg');
                    //iwBackground.children(':nth-child(2),:nth-child(4)').css('height','250px!important');
                } else {
                    //console.log('tip');
                    iwOuter.parent().addClass('gw-tip-parent');
                    var iwBackground = iwOuter.prev();
                    iwBackground.removeClass('gw-style-bg').addClass('gw-tip-bg')
                }
            })
        });

        this.initialize = function() {
            // set input value based on the window hash
            if (s.type) this.input.type.value = s.ptype;
            if (s.city) this.input.city.value = s.city;
            if (s.district) this.input.district.value = s.district;
            if (s.ward) this.input.ward.value = s.ward;
            if (s.street) this.input.street.value = s.street;
            if (s.direction) this.input.direction.value = s.direction;
            if (s.price) this.input.price.value = s.price;
            if (s.area) this.input.area.value = s.area;
            if (s.location) this.input.location.value = s.location;
            if (s.lat) this.input.lat.value = s.lat;
            if (s.lng) this.input.lng.value = s.lng;
            if (s.location_radius) this.input.location_radius.value = s.location_radius;
            if (s.details == 1) {
                this.input.details.value = 1;
                this.isDetails = true;
            }
            if (s.isShowUtil == 1) {
                this.input.isShowUtil.value = 1;
                this.isShowUtil = true;
            }
            this.input.zoom.value = s.zoom;
            this.input.center.value = s.center;
            this.input.points.value = s.lstPoint;
            this.input.product.value = s.currentPid;

            this.currentPid = s.currentPid;

            var cc = this.input.center.value.split(':');
            this.centerPos = new google.maps.LatLng(cc[0], cc[1]);

            var e = zoom_moderate;
            if (s.zoom != '') e = parseInt(s.zoom);
            var f = 10.843928;
            var g = 106.717672;
            if (s.center != '') {
                f = parseFloat(s.center.split(':')[0]);
                g = parseFloat(s.center.split(':')[1])
            }

            this.input.points.value = s.lstPoint;

            if (s.lstPoint != '') {
                $thismap.isDrawing = true;
                this.isMapidle = false;
                this.beginDrawButton.hide();
                this.deleteShapeButton.show();
                //this.btnUpdateMapidleResult.hide();
                var h = s.lstPoint.split(',');
                if (h.length >= 5) {
                    this.listLatlgn = new Array();
                    for (var i = 0; i < h.length; i++) {
                        var j = h[i].split(':');
                        this.listLatlgn.push(new google.maps.LatLng(parseFloat(j[0]), parseFloat(j[1])))
                    }
                }
            }
            var k = {
                center: new google.maps.LatLng(f, g),
                zoom: e,
                MapTypeId: google.maps.MapTypeId.ROADMAP,
                draggable: true,

                overviewMapControl: true,
                overviewMapControlOptions: {
                    opened: false
                },
                panControl: false,
                rotateControl: false,
                scaleControl: false,
                mapTypeControl: false,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                zoomControl: false,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                fullscreenControl: false,
                fullscreenControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                streetViewControl: false,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                }
            };
            this.map = new google.maps.Map(document.getElementById(v), k);

            this.oms = new OverlappingMarkerSpiderfier(this.map, {
                markersWontMove: true,
                markersWontHide: true,
                basicFormatEvents: true
            });
            this.oms.addListener('format', function(marker, status) {
                var micon = iconMarker.default;
                if (status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIED) iconURL = iconMarker.default;
                else if (status == OverlappingMarkerSpiderfier.markerStatus.SPIDERFIABLE) iconURL = iconMarker.group;
                //console.log(status);
                //console.log(OverlappingMarkerSpiderfier.markerStatus);
                marker.setIcon(micon);
            });

            var styles = [{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]}];
            var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
            this.map.mapTypes.set('styled_map', styledMap);
            this.map.setMapTypeId('styled_map');

            this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(document.getElementById('controlArea'));
            //this.map.controls[google.maps.ControlPosition.BOTTOM].push(document.getElementById('controlUtility'));
            $('#controlArea').show();

            var input = document.getElementById('location');
            var options = {
                //types: ['(cities)'],
                componentRestrictions: {country: 'vn'}
            };
            this.markerPoint.setMap($thismap.map);
            this.markerPoint.setVisible(false);

            this.autocomplete = new google.maps.places.Autocomplete(input, options);
            this.autocomplete.bindTo('bounds', this.map);

            this.autocomplete.addListener('place_changed', function() {
                var place = $thismap.autocomplete.getPlace();
                $thismap.searchByLocation(place);
            });
            if (s.location && (!s.lat || !s.lng)) {
                var place = this.geocodeaddress();
                $thismap.searchByLocation(place);
            }

            var locationData = null;
            if (this.listLatlgn != null) {
                this.polyline = new google.maps.Polygon({
                    path: this.listLatlgn,
                    strokeColor: '#585858',
                    strokeWeight: 3,
                    editable: true,
                    fillColor: "#ccc",
                    fillOpacity: 0.5
                });
                this.polyline.setMap(this.map);
                this.findPoint(this.polyline);
            }
        }

        this.searchByLocationId = function geocodePlaceid () {
            var placeid = this.input.location.value;
            this.geocoder.geocode({'placeid': placeid}, function (results, status) {
                if (status === 'OK') {
                    if (results[0]) {
                        /*$thismap.map.setZoom(zoom_moderate);
                        $thismap.map.setCenter(results[0].geometry.location);
                        $thismap.markerPoint.setPosition(results[0].geometry.location);
                        */
                        //infowindow.setContent(results[0].formatted_address);
                        //infowindow.open(map, marker);
                    } else {
                        console.log('No results found');
                        return false;
                    }
                } else {
                    console.log('Geocoder failed due to: ' + status);
                    return false;
                }
            });
        }

        this.geocodeaddress = function () {
            var address = this.input.location.value;
            $thismap.geocoder.geocode({'address': address}, function(results, status) {
                if (status === 'OK') {
                    //$thismap.map.setCenter(results[0].geometry.location);
                    return results[0]
                } else {
                    return false;
                }
            });
        }

        this.showSearchPoint = function () {
            $thismap.map.setCenter($thismap.pointPos);
            $thismap.map.setZoom(zoom_moderate);
            $thismap.markerPoint.setPosition($thismap.pointPos);
            $thismap.markerPoint.setVisible(true);

            if (this.circleAroundSearchPoint == null) {
                this.circleAroundSearchPoint = new google.maps.Circle({
                    center: $thismap.pointPos,
                    radius: parseInt($thismap.pointRadius),
                    strokeColor: '#00c2ff',
                    strokeOpacity: 0.2,
                    strokeWeight: 2,
                    fillColor: '#00c2ff',
                    fillOpacity: 0.1
                    //fillOpacity: 0.4
                });
            } else {
                this.circleAroundSearchPoint.setOptions({
                    center: $thismap.pointPos,
                    radius: parseInt($thismap.pointRadius)
                });
            }
            this.circleAroundSearchPoint.setMap(this.map);
        }

        this.searchByLocation = function (place) {
            if (place) {
                $thismap.markerPoint.setVisible(false);
                if (!place.geometry) {
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }
                if (place.geometry.viewport) {
                    $thismap.map.fitBounds(place.geometry.viewport);
                } else {
                    //$thismap.map.setCenter(place.geometry.location);
                    //$thismap.map.setZoom(zoom_moderate);
                }
                //$thismap.markerPoint.setPosition(place.geometry.location);
                //$thismap.markerPoint.setVisible(true);
                console.log(place);

                $thismap.pointPos = place.geometry.location;
                $thismap.input.lat.value = $thismap.pointPos.lat();
                $thismap.input.lng.value = $thismap.pointPos.lng();
                $thismap.pointRadius = $thismap.input.location_radius.value;

                if (place.geometry.location != this.input.location.value) productControlerObj.ChangeUrlForNewContext();

                this.showSearchPoint();
            }
        }

        this.resize = function () {
            google.maps.event.trigger($thismap.map, 'resize');
            this.isMapResize = true;
            this.boundsChangeCallBack();
        }

        this.boundsChangeCallBack = function () {
            google.maps.event.addListener($thismap.map, 'bounds_changed', function () {
                if ($thismap.isMapResize) {
                    if ($thismap.currentPid) {
                        var key = $thismap.findMarkerKey($thismap.currentPid);
                        if (key) {
                            $thismap.map.setCenter($thismap.markers[key].position);
                        }
                    } else {
                        $thismap.map.setCenter($thismap.centerPos);
                    }
                }
                $thismap.isMapResize = false;
            })
        }

        this.beginDrawButton.bind('click', this, function(b) {
            if (b.data.map.getZoom() < minZoomAllowSearch) {
                alert('Bạn cần phóng to bản đồ hơn nữa vào khu vực bạn cần vẽ');
                return
            }
            $thismap.isDrawing = true;
            //this.btnUpdateMapidleResult.hide();
            b.data.beginDrawButton.hide();
            b.data.deleteShapeButton.show();
            //b.data.ClearUtilitiesAroundPoint();
            b.data.clearPoint();
            b.data.callBackClearPointEvent();
            if (b.data.polyline != undefined) b.data.polyline.setMap(undefined);
            b.data.mapPoly = new google.maps.Polyline({
                strokeColor: '#585858',
                strokeOpacity: 1,
                map: b.data.map
            });
            b.data.map.setOptions({
                draggableCursor: "crosshair",
                draggable: false
            });
            var f = 10;
            var c = 0;

            function _beginDrawEvent(a) {
                return function() {
                    a.listLatlgn = new Array();

                    function _mouseMoveEvent(j) {
                        a.mapPoly.getPath().push(j.latLng);
                        var i = new Date().valueOf();
                        if (i - c >= f) {
                            c = i;
                            a.listLatlgn.push(j.latLng)
                        }
                    }
                    google.maps.event.addListener(b.data.map, "mousemove", function(j) {
                        _mouseMoveEvent(j)
                    })
                }
            };
            if (browser.isMobile) {
                $('body').bind('touchmove', function(e) {
                    e.preventDefault();
                    e.stopPropagation()
                })
            }
            google.maps.event.addListener(b.data.map, "mousedown", _beginDrawEvent(b.data));

            function _endDrawEvent(a) {
                return function() {
                    if (browser.isMobile == false) {
                        $('body').unbind('mouseup')
                    } else {
                        $('body').unbind('touchend')
                    }
                    if (a.mapPoly != undefined) {
                        if (browser.isMobile) {
                            $('body').unbind('touchmove')
                        }
                        a.map.setOptions({
                            draggableCursor: "openhand",
                            draggable: true
                        });
                        google.maps.event.clearListeners(a.map, 'mousedown');
                        google.maps.event.clearListeners(a.map, 'mousemove');
                        a.mapPoly.setMap(undefined);
                        a.endDraw();
                        a.callBackMapChange()
                    }
                }
            };
            if (browser.isMobile == false) {
                $('body').bind('mouseup', this, _endDrawEvent(b.data))
            } else {
                $('body').bind('touchend', this, _endDrawEvent(b.data))
            }
        });
        this.deleteShapeButton.bind('click', this, function(a) {
            a.data.DeleteShape()
        });
        this.DeleteShape = function(a) {
            this.beginDrawButton.show();
            this.deleteShapeButton.hide();
            if (this.polyline != undefined) {
                this.polyline.setMap(undefined);
                this.polyline = null
            }
            this.clearPoint();

            this.input.points.value = '';

            $thismap.isDrawing = false;
            this.isMapidle = false;
            this.callBackClearPointEvent(true);
        };
        this.endDraw = function(a) {
            $thismap.isDrawing = true;
            if (this.listLatlgn != null) {
                this.beginDrawButton.hide();
                this.deleteShapeButton.show();
                var b = new Array();
                var points = [];

                if (a == undefined) {
                    var c = 5;
                    var x;
                    x = Math.round(this.listLatlgn.length / 50);
                    if (this.listLatlgn.length < 30) {
                        c = 1;
                        x = 2
                    }
                    for (var i = 0; i < this.listLatlgn.length; i++) {
                        if (i % (c * x) == 0) {
                            b.push(this.listLatlgn[i])
                        }
                        points.push(this.listLatlgn[i].lat() + ':' + this.listLatlgn[i].lng());
                    }
                } else {
                    b = this.listLatlgn;
                    points = b.lat() + ':' + b.lng();
                }
                $thismap.input.points.value = points.join(',');

                $thismap.polyline = new google.maps.Polygon({
                    path: b,
                    strokeColor: '#585858',
                    strokeWeight: 3,
                    editable: true,
                    fillColor: "#ccc",
                    fillOpacity: 0.5
                });
                $thismap.polyline.setMap($thismap.map);
                $thismap.findPoint($thismap.polyline);

                //this.btnUpdateMapidleResult.hide();

                google.maps.event.addListener($thismap.polyline.getPath(), 'set_at', function() {
                    console.log('set_at polyline');
                    $thismap.findPoint($thismap.polyline)
                });
                google.maps.event.addListener($thismap.polyline.getPath(), 'insert_at', function() {
                    console.log('insert_at polyline');
                    $thismap.findPoint($thismap.polyline)
                })
            }
            this.listLatlgn = null
        };

        this.getZoom = function() {
            return this.map.getZoom()
        };
        this.getCenter = function() {
            return this.map.getCenter().lat() + ':' + this.map.getCenter().lng()
        };

        this.markers = new Array();
        this.callBackDrawEvent = function() {};
        this.findPoint = function(a, b) {
            this.clearPoint();
            var c = a.getPath().getArray();
            var d = 0,
                minLat = 100000,
                maxLng = 0,
                maxLat = 0,
                minLng = 100000;
            var e = '';
            for (var i = 0; i < c.length; i++) {
                var f = c[i].lat();
                var g = c[i].lng();
                if (e.length > 0) e += ',';
                e += f + ':' + g;
                if (d < f) d = f;
                if (minLat > f) minLat = f;
                if (maxLat < f) maxLat = f;
                if (minLng > g) minLng = g;
                if (maxLng < g) maxLng = g
            }
            if (this.callBackDrawEvent) {
                this.callBackDrawEvent(d, minLat, minLng, maxLat, maxLng, e, b)
            }
        };
        this.isInPolyline = function(a, b) {
            if (this.polyline != undefined && this.polyline != null) {
                return google.maps.geometry.poly.containsLocation(new google.maps.LatLng(a, b), this.polyline)
            }
            return true
        };
        this.clearPoint = function() {
            if (this.infoWindow) this.infoWindow.close();
            this.ClearUtilitiesAroundPoint();

            if (this.markers != undefined) {
                for (var t = 0; t < this.markers.length; t++) {
                    this.markers[t].setMap(null)
                }
                this.markers = []
            }
            if (this.markerCluster != null) {
                this.markerCluster.clearMarkers()
            }
        };
        this.callBackClearPointEvent = function() {};

        this.showMap = function(a, b) {
            //this.clearPoint();
            this.data = [];
            if (this.isDrawing) {
                for (var i = 0; i < a.length; i++) {
                    if (this.isInPolyline(a[i].latitude, a[i].longitude)) {
                        if (a[i].avatar == null || a[i].avatar == '') a[i].avatar = MAIN_URL+'/assets/img/noimage.png';
                        this.data.push(a[i])
                    }
                }
            } else if (this.pointPos && this.pointRadius) {
                //console.log(a);
                this.showSearchPoint();
                for (var i = 0; i < a.length; i++) {
                    var e = parseInt(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(a[i].latitude, a[i].longitude), $thismap.pointPos));
                    if (e <= $thismap.pointRadius) {
                        //a[i].distance = e;
                        this.data.push(a[i])
                    }
                }
            }
            // show list in the sidebar
            productControlerObj.showList(this.data);
            this.showPoint(this.data, b);
            return this.data
        };

        this.showPoint = function(a, b) {
            this.clearPoint();

            $thismap.markers = a.map(function(location, i) {
                return new google.maps.Marker({
                    position: new google.maps.LatLng(location.latitude, location.longitude),
                    //icon: iconMarker.default,
                    labelContent: location.type,
                    labelAnchor: new google.maps.Point(6,14),
                    labelClass: "marker-label", // your desired CSS class
                    labelInBackground: true
                });
            });

            $.each($thismap.markers, function (i, oneMarker) {
                //if ($thismap.map.getZoom() >= 12)
                //oneMarker.setMap($thismap.map);

                $thismap.oms.addMarker(oneMarker);

                oneMarker.id = a[i].id;

                google.maps.event.addListener(oneMarker, 'spider_click', function(e) {  // 'spider_click', not plain 'click'
                    $thismap.showInfoWindow(this.id);
                    if ($thismap.isShowUtil) {
                        productControlerObj.ShowMoreInfo($thismap.currentPid, oneMarker.position.lat(), oneMarker.position.lng())
                    }
                    $thismap.input.product.value = this.id;
                    productControlerObj.ChangeUrlForNewContext();
                });
                /*
                /*oneMarker.addListener('click', function() {
                    $thismap.showInfoWindow(this.id);
                    if ($thismap.isShowUtil) {
                        productControlerObj.ShowMoreInfo($thismap.currentPid, oneMarker.position.lat(), oneMarker.position.lng())
                    }
                    $thismap.input.product.value = this.id;
                    productControlerObj.ChangeUrlForNewContext();
                });
                /*oneMarker.addListener('mouseover', function() {
                    if (this.id != $thismap.currentPid) {
                        this.setIcon(iconMarker.hover)
                    }
                });
                oneMarker.addListener('mouseout', function() {
                    if (this.id != $thismap.currentPid) {
                        this.setIcon(iconMarker.default)
                    }
                })*/
            })

            $thismap.map.addListener('idle', function() {
                // change spiderable markers to plus sign markers
                // we are lucky here in that initial map is completely clustered
                // for there is no init listener in oms :(
                // so we swap on the first zoom/idle
                // and subsequently any other zoom/idle
                var spidered = $thismap.oms.markersNearAnyOtherMarker();
                for (var i = 0; i < spidered.length; i ++) {
                    // this was set when we created the markers
                    spidered[i].setIcon(iconMarker.group);
                    // code to manipulate your spidered icon url
                };

            });

            $thismap.oms.addListener('unspiderfy', function(markers) {
                var spidered = markers;
                for (var i = 0; i < spidered.length; i ++) {
                    url = spidered[i].icon.url;
                    // change it back
                    //spidered[i].setIcon(iconMarker.default)
                    spidered[i].setIcon(iconMarker.group)
                    //spidered[i].setZIndex(1)
                };
            });

            $thismap.oms.addListener('click', function(marker) {
                // put the clicked-on marker on top
                // when oms un-spiders
                $thismap.selectedMarker.setPosition(marker.position);
                $thismap.selectedMarker.setMap($thismap.map);
                //marker.setIcon(iconMarker.select);
            });

            if (b !== undefined && b) {
                if (this.polyline != undefined && this.polyline != null) {
                    var g = new google.maps.LatLngBounds();
                    this.polyline.getPath().forEach(function(e) {
                        g.extend(e)
                    });
                    this.map.fitBounds(g)
                }
            }

            if (this.currentPid) {
                this.showInfoWindow(this.currentPid, true);
            }

            /*$thismap.markerCluster = new MarkerClusterer($thismap.map, $thismap.markers, {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            });*/

            //if (!this.isShowUtil) this.ShowUtilitiesAll();
        };

        this.findDataInfo = function(i) {
            if (this.data != undefined && this.data.length > 0) {
                return this.data[i]
            }
        };
        this.findMarkerKey = function(a) {
            if (this.data != undefined && this.data.length > 0) {
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].id == a) {
                        return i
                    }
                }
            }
        };
        this.findMarker = function(a) {
            if (this.markers != undefined) {
                for (var i = 0; i < this.markers.length; i++) {
                    if (this.markers[i].id == a) {
                        return this.markers[i]
                    }
                }
            }
            return null
        };

        this.markerUtilities = new Array();
        this.dataUtilities = new Array();

        this.ShowUtilitiesAll = function () {
            $.ajax({
                url: API_URL+'/utilities',
                type: 'get',
                success: function(data) {
                    $thismap.dataUtilities = data
                    $thismap.displayUtilitiesMarkers();
                },
                error: function(a, b, c) {
                    console.log(a)
                }
            })
        }

        this.displayUtilitiesMarkers = function () {
            if (this.dataUtilities != null && this.dataUtilities) {
                this.markerUtilities = this.dataUtilities.map(function(utility, i) {
                    //console.log(utility);
                    if (parseFloat(utility.AvgRating) > 8) {
                        return new MarkerWithLabel({
                            position: new google.maps.LatLng(utility.latitude, utility.longitude),
                            icon: utilMarkers[utility.type].default,
                            labelContent: utility.AvgRating,
                            labelAnchor: new google.maps.Point(13,11),
                            labelClass: "marker-utility-label", // your desired CSS class
                            labelInBackground: true
                        });
                    }
                    else {
                        return new google.maps.Marker({
                            position: new google.maps.LatLng(utility.latitude, utility.longitude),
                            icon: utilMarkers[utility.type].sm
                        });
                    }
                });

                $.each(this.markerUtilities, function (i, oneMarkerUtility) {
                    //oneMarkerUtility.id = $thismap.dataUtilities[i].id;
                    oneMarkerUtility.setMap($thismap.map);
                    //this.markerUtilities.setTooltip(k);

                    var currentMark;
                    oneMarkerUtility.addListener('click', function() {
                        currentMark = this;
                        var j = $thismap.dataUtilities[i];
                        var k = '';
                        k += '<div class="infowindow-util-preview iw-content">';
                        k += '<div class="bold infowindow-util-preview-title">' + j.title + '</div>';
                        k += '<div class="infowindow-util-preview-adr"><i class="fa fa-map-marker"></i> <span>' + j.address + '</span></div>';
                        //k += '<div class="infowindow-util-preview-type">Loại tiện ích: ' + j.type + '</div>';
                        //k += '<div class="infowindow-util-preview-typeid">Typeid: ' + j.typeid + '</div>';
                        //k += '<div class="infowindow-util-preview-distance">Khoảng cách: ' + j.distance + 'm</div>';
                        k += '<div class="infowindow-util-preview-ratings"><i class="fa fa-star"></i> Điểm foody: <span>' + j.AvgRating + '</span></div>';
                        k += '</div>';

                        $thismap.infoWindow.setOptions({
                            position: oneMarkerUtility.position,
                            maxWidth: 250,
                            content: k
                        });
                        oneMarkerUtility.setIcon(utilMarkers[j.type].click);
                        $thismap.infoWindow.open($thismap.map, oneMarkerUtility);
                        //$thismap.ShowUtilityWindow(this.id)
                        google.maps.event.addListener($thismap.infoWindow, 'closeclick', function () {
                           currentMark.setIcon(utilMarkers[j.type].sm)
                        });
                    })
                })
            }
        }

        this.ShowUtilitiesAroundCallback = function() {};
        this.ShowUtilitiesAroundPoint = function(c, d, e, f, g) {
            //$thismap.btnUpdateMapidleResult.hide();
            $thismap.map.setZoom(zoom_utilityView);

            var h = this.findMarker(this.currentPid);

            if (h == undefined || h == null) return;
            //h.setIcon(iconMarker.select);
            h.setZIndex(300);
            e = parseInt(e);
            this.ClearUtilitiesAroundPoint();

            if (this.circle == null) this.circle = new google.maps.Circle({
                center: new google.maps.LatLng(c, d),
                radius: e,
                strokeColor: '#FF0000',
                strokeOpacity: 0.5,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.15
                //fillOpacity: 0.4
            });
            else this.circle.setOptions({
                center: new google.maps.LatLng(c, d),
                radius: e
            });
            this.circle.setMap(this.map);

            if (this.infoWindow != null) this.infoWindow.setMap(null);
            this.dataUtilities = $thismap.formatUtilities(f, h.position, e);

            $('label .uti-total', $(g)).remove();
            $.each($('input:checked', $(g)), function() {
                var a = parseInt($(this).val());
                var b = $thismap.getTotalUtility($thismap.dataUtilities, a);
                if ($(this).parent().find('.uti-total').length > 0) {
                    $(this).parent().find('.uti-total').html('(' + b + ')')
                } else {
                    $(this).parent().append(' <span class="uti-total">(' + b + ')</span>')
                }
            });

            //$thismap.input.isShowUtil.value = 1;
            $thismap.isShowUtil = true;
            productControlerObj.ChangeUrlForNewContext();

            this.displayUtilitiesMarkers();
            this.ShowUtilitiesAroundCallback();
        };
        this.ClearUtilitiesAroundCallback = function() {};
        this.ClearUtilitiesAroundPoint = function(a) {
            //this.input.isShowUtil.value = 0;
            this.isShowUtil = false;
            if (this.circle != null) this.circle.setMap(null);
            if (this.markerUtilities != null && this.markerUtilities.length > 0) {
                for (var i = 0; i < this.markerUtilities.length; i++) {
                    this.markerUtilities[i].setMap(null)
                }
            }
            if (this.infoWindow != null) this.infoWindow.setMap(null);

            if (a == undefined || a == true) {
                this.ClearUtilitiesAroundCallback()
            }
        };
        this.getTotalUtility = function(a, b) {
            var c = 0;
            for (var i = 0; i < a.length; i++) {
                if (a[i].typeid == b) {
                    c++
                }
            }
            return c
        };
        this.formatUtilities = function(a, b, c) {
            if (a == null || a.length == 0) return [];
            var d = [];
            for (var i = 0; i < a.length; i++) {
                var e = parseInt(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(a[i].latitude, a[i].longitude), b));
                if (e <= c) {
                    a[i].distance = e;
                    d.push(a[i])
                }
            }
            return d
        };

        this.closeInfoWindowCallBack = function (h) {
            //h.setIcon(iconMarker.default);
            $thismap.selectedMarker.setPosition(null);

            this.input.product.value = this.currentPid = '';
            this.map.setZoom(zoom_moderate);
            this.map.setCenter($thismap.pointPos);
            this.ClearUtilitiesAroundPoint();
            productControlerObj.ChangeUrlForNewContext();
            //this.ShowUtilitiesAll();
        };

        this.showInfoTipWindow = function (h, k) {
            $thismap.infoTipWindow.close();
            if (!k) k = 'Empty info';
            $thismap.infoTipWindow.setOptions({
                position: h.position,
                //center: h.position,
                maxWidth: 280,
                content: k
            });
            $thismap.infoTipWindow.open($thismap.map.map_, h);
        }

        this.mouseHover = function (k) {
            if (this.markers) {
                var currentMarkerKey = null;
                if ($thismap.currentPid) {
                    currentMarkerKey = this.findMarkerKey($thismap.currentPid);
                }
                $.each(this.markers, function (i, v) {
                    if (i == k) {
                        v.setIcon(iconMarker.hover);
                        $thismap.map.setCenter(v.position);
                        $thismap.showInfoTipWindow(v, $('.map-result-one[attr-marker-id="'+i+'"]').html());
                        /*
                        if ($thismap.currentPid == i) $thismap.infoWindow.close();
                        if ($thismap.currentPid == i) $thismap.infoWindow.open($thismap.map, v); */
                    } else if (i != currentMarkerKey) {
                        v.setIcon(iconMarker.default);
                    }
                })
            }
        }
        this.mouseOut = function (k) {
            this.infoTipWindow.close();
            if (this.markers) {
                var currentMarkerKey = null;
                this.markers[k].setIcon(iconMarker.default);
                if ($thismap.currentPid) {
                    currentMarkerKey = this.findMarkerKey($thismap.currentPid);
                    $thismap.map.setCenter(this.markers[currentMarkerKey].position);
                    if (currentMarkerKey == k) {
                        this.markers[currentMarkerKey].setIcon(iconMarker.select);
                        //this.infoWindow.close();
                        //this.infoWindow.open(this.map, this.markers[currentMarkerKey]);
                    }
                }
            }
        }

        this.showInfoWindow = function(d, isInit = false) {
            var data = null;
            var key = null;

            var runSet = false;
            if (!isInit && d != this.currentPid) runSet = true;

            if (d == undefined || d == null) {
                d = this.currentPid;
            } else if (d != this.currentPid && this.currentPid != null) {
                var t = this.findMarkerKey(this.currentPid);
                var u = this.markers[t];

                this.input.product.value = this.currentPid = d;
                key = this.findMarkerKey(this.currentPid);
                var e = this.markers[key];
                var f = this.findDataInfo(key);
                data = f;
                if (u != undefined && u != null) {
                    //u.setIcon(iconMarker.default);
                    if (f != undefined && f != null) {
                        u.setZIndex(6 - f.vip)
                    }
                }
            } else if (d == this.currentPid) {}
            this.input.product.value = d;

            if (this.markers != undefined) {
                if (!key) key = this.findMarkerKey(d);
                if (!data) data = this.findDataInfo(key);
            }

            if (this.infoTipWindow) this.infoTipWindow.close();
            if (this.infoWindow) this.infoWindow.close();

            if (key != null && data) {
                var h = this.markers[key];
                if (runSet) {
                    this.input.zoom.value = this.map.getZoom();
                    productControlerObj.ChangeUrlForNewContext();
                    this.map.setCenter(h.position);
                }
                //h.setIcon(iconMarker.select);

                $thismap.selectedMarker.setPosition(h.position);
                $thismap.selectedMarker.setZIndex(999);
                $thismap.selectedMarker.setMap($thismap.map);
                //console.log('selectedMarker');

                $thismap.map.setCenter(h.position);
                $thismap.map.setZoom(zoom_markerView);

                //h.setZIndex(300);
                this.currentPid = data.id;

                if (isInit && this.input.isShowUtil.value == 1) this.isShowUtil = true;

                if (this.isShowUtil) {
                    //this.ClearUtilitiesAroundPoint();
                    productControlerObj.ShowMoreInfo(data.id, h.position.lat(), h.position.lng(), isInit);
                }
                //if (isInit) {
                    if (this.isDetails) {
                        productControlerObj.ShowDetails(this.currentPid);
                    }
                //}

                data.room_left = parseInt(data.room) - parseInt(data.room_taken);
                $('.map-item-info-title').html(data.title);
                $('.map-item-info-price span').html(data.price);
                $('.map-item-info-type').html(data.type);
                $('.type-help').attr('title', 'Loại '+data.type+' là gì?');
                $('.map-item-info-room').html(data.room_left+'/'+data.room);
                //$('.map-item-info-contact_phone').html(data.dienthoai);
                $('.map-item-info-contact_phone').html('<a href="#" id="contact_'+data.id+'">Liên hệ</a>');
                $('.map-item-info-address').html(data.address);
                $('.map-item-info-des').html(data.details);
                $('.map-item-info-thumb').attr('src', data.avatar);
                $('.map-item-view-utilities').attr('href', 'javascript:productControlerObj.ShowMoreInfo(\''+data.id+'\', ' + data.latitude + ',' + data.longitude + ',false)');
                //$('.map-item-gotoview').attr('href', MAIN_URL+'/map/'+data.id);
                $('.map-item-gotoview').attr('href', 'javascript:productControlerObj.ShowDetails("' + data.id + '")');

                /*this.infoWindow.setOptions({
                    position: h.position,
                    maxWidth: 470,
                    content: $('.map-item-info-board').html()
                });

                this.infoWindow.open(this.map, h);*/
                $('.map-item-info-board').animate({top:$('#map-search-form').height()}, 400);

                this.ShowRatings(data);

                this.gotoReviews('.map-item-ratings', data.id);

                $('.map-item-info-board-close').click(function () {
                    $('.map-item-info-board').animate({top:'100%'}, 400);
                    $thismap.closeInfoWindowCallBack(h);
                })

                /*
                google.maps.event.addListener(this.infoWindow, 'closeclick', function () {
                    $thismap.closeInfoWindowCallBack(h);
                }); */
            }
        };

        this.gotoReviews = function (h, id) {
            $(h+' .seeAllReviews').click(function () {
                if (!this.isDetails) {
                    productControlerObj.ShowDetails(id)
                }
                // scroll to reviews
                $('.popup-inner>div').animate({
                    scrollTop: $("#reviews").offset().top
                }, 1000);
                return false
            })
        }

        this.ShowRatings = function (data) {
            if (!data.rating) {
                $('.ui_reviews').html('<div class="no-reviews-found">Chưa có đánh giá nào. <a href="javascript:productControlerObj.ShowDetails(\''+data.id+'\')" class="more">Thêm đánh giá</a></div>');
            } else {
                $('#overallRating').html(data.rating);
                $('.overallBubbleRating .ui_star_rating').addClass('star_'+data.rating.toString().replace('.', ''));
                $('#totalReviews').html(data.totalReviews);
                if (data.totalReviews) {
                    var reviewsSta = data.reviews_details.split('|');
                    for (i = 1; i <= 5; i++) {
                        var votes = reviewsSta[i-1].split(':')[1];
                        var per = (votes/data.totalReviews*100).toFixed(2);
                        $chartRow = $('.chart_row[data-idx="'+i+'"]');
                        $chartRow.attr('title', votes+' đánh giá - '+per+'%');
                        $chartRow.find('.fill').css('width', per+'%');
                        $chartRow.find('.row_count').html(per+'%');
                    }
                }

                // get reviews
                if (!$('.map-item-reviews-list').find('.map-item-review').length) {
                    $.get(MAIN_URL+'/api/node_one_reviews_map.php', function (reviews) {
                        $.each(reviews, function (ri, rv) {
                            var rvRates = '<div class="overallBubbleRating"><span class="ui_star_rating star_'+rv.rating+'"></span></div>';
                            $('.v-place-reviews-list').append('<div class="one-review"><img class="one-review-avatar" src="'+rv.avatar+'"/> <h5><a class="one-review-username" href="#">'+rv.name+'</a> '+rvRates+'</h5><div class="one-review-title">'+rv.title+'</div><div class="one-review-details">'+rv.details+'</div></div>');

                            var rvRates_sm = '<div class="overallBubbleRating left"><span class="ui_bubble_rating bubble_'+rv.rating+'"></span></div>';
                            $('.map-item-reviews-list').append('<div class="map-item-review"><img title="'+rv.name+'" class="map-item-review-avatar" src="'+rv.avatar+'"/> <div class="map-item-review-details">'+rvRates_sm+' '+rv.details.substring(0,100)+'</div></div>');
                        })
                    });
                }
            }
        }

        return this
    }
    $.fn.ProductMap = ProductMap
}(jQuery));


(function($) {
    UtilityAroundControler = function(l) {
        this.Map = l.map;
        this.Lat = 0;
        this.Lon = 0;
        $utilthis = this;
        $(this).find('.utility-close').bind('click', this, function(a) {
            //a.data.hide();
            a.data.Map.isShowUtil = false;
            if (!a.data.Map.isDrawing) {
                //a.data.Map.btnUpdateMapidleResult.show()
            }
            a.data.Map.map.setZoom(zoom_markerView);

            a.data.Map.input.isShowUtil.value = 0;
            a.data.Map.isShowUtil = false;
            productControlerObj.ChangeUrlForNewContext();

            a.data.Map.ClearUtilitiesAroundPoint(false);
            //a.data.Map.ShowUtilitiesAll();
            $utilthis.animate({width:0}, 200, function () {
                $utilthis.hide();
            });
            a.data.Map.showInfoWindow()
        });
        $(this).find('select, input').bind('change', this, function(a) {
            if ($(this).val().length > 0) {
                if ($(this).attr('checked') == undefined) {
                    $(this).parent().find('.uti-total').remove()
                }
                a.data.SearchAction()
            } else {
                $(this).parent().find('.uti-total').remove();
                var b = $(this).attr('checked');
                $(a.data).find('select, input').each(function() {
                    if ($(this).val().length > 0) {
                        $(this).attr('checked', b != undefined)
                    }
                });
                a.data.SearchAction()
            }
        });
        this.ResetRadius = function() {
            $('#cbbRadius').val(500)
        };
        this.SearchAction = function(d, e) {
            if (d != undefined) this.Lat = d;
            if (e != undefined) this.Lon = e;
            var f = $(this).find('select').val();
            var l = [];
            $(this).find('input:checked').each(function() {
                if ($(this).val().length > 0) {
                    l.push($(this).val());
                }
            });
            l = l.map(Number);
            var g = l.join(',');
            var h = $(this);
            var i = parseFloat(this.Lat);
            var j = parseFloat(this.Lon);
            this.Map.map.setCenter(new google.maps.LatLng(i, j));

                var k = {};
                k.radius = f;
                k.types = g;
                k.lat = this.Lat;
                k.lon = this.Lon;
                k.m = 'pddetail';
                k.v = new Date().getTime();

                $.ajax({
                    url: API_URL+'/utilities',
                    data: k,
                    type: 'get',
                    success: function(a, b, c) {
                        // when get all data, then filter here (not recommended)
                        var data = [];
                        for (key = 0; key < a.length; key++) {
                            var vl = a[key];
                            if (l.indexOf(vl.typeid) !== -1) {
                                data.push(vl);
                            }
                        }
                        $utilthis.Map.ShowUtilitiesAroundPoint($utilthis.Lat, $utilthis.Lon, f, data, h);
                    },
                    error: function(a, b, c) {
                        console.log(a)
                    },
                    complete: function() {}
                })

        };
        this.Map.ClearUtilitiesAroundCallback = function() {
            if ($utilthis.width() > 0 && !this.isShowUtil) {
                $utilthis.animate({width:0}, 200, function () {
                    $utilthis.hide();
                });
            }
        };
        this.Map.ShowUtilitiesAroundCallback = function() {
            //console.log($utilthis.width());
            if (this.isShowUtil) {
                //console.log(this.isShowUtil);
                setTimeout(function () {
                    $utilthis.show().animate({width:'100%'}, 200);
                }, 200)
            }
        };
        return this
    };
    $.fn.UtilityAroundToolbox = UtilityAroundControler
})(jQuery);


ProductSearchControler = function(h) {
    var i = this;
    var j = {
        zoom: mapContext.zoom,
        center: mapContext.center,
        lstPoint: mapContext.lstPoint
    };
    this.searchVar = {
        page: 0
    };
    this.formSearch = $('#map-search-form');
    this.postData = null;
    this.mapResults = $('#map_results');

    this.ProductMap = $('#map').ProductMap('begindraw', 'delshape', 'fullscreen', 'exitfullscreen', mapContext);

    // Init utility for product detail in project map type
    this.utilityTool = $('.controls-utility').UtilityAroundToolbox({ map: this.ProductMap });

    this.ProductMap.callBackMapChange = function(a) {
        i.ChangeUrlForNewContext();
        //i._SearchAction();
    };
    this.ProductMap.callBackClearPointEvent = function(a) {
        i.ChangeUrlForNewContext();
        if (!i.ProductMap.isDrawing) {
            i._SearchAction();
        }
    };
    this.ProductMap.callBackDrawEvent = function(a, b, c, d, e, f, g) {
        i.callBackDrawEvent(a, b, c, d, e, f, g);
    };

    this.ProductMap.initialize();

    if (!this.ProductMap.isDrawing && this.formSearch.find('#location').value && this.formSearch.find('#lat').value && this.formSearch.find('#lng').value) {
        this._SearchAction();
    }
    this.formSearch.submit(function () {
        i.ProductMap.currentPid = i.ProductMap.input.product.value = "";
        i.ChangeUrlForNewContext();
        i.ProductMap.pointRadius = i.formSearch.find('#location_radius').val();
        i._SearchAction();
        return false
    });
    this.catchInputChange();

    var context = h.context;
    if (!context.city && !context.currentPid) {
        this.beginScreen();
        //this.showCitySearch();
    } else {
        this.loadMapScreen();

        if (!context.district) {
            c_city = context.city;
            i.changeCityCallback();
        }
    }
};

ProductSearchControler.prototype.loadMapScreen = function () {
    $('main').removeClass('beginScreen');
    //console.log(mapContext);

    this.ProductMap.input.lat.value = mapContext.lat;
    this.ProductMap.input.lng.value = mapContext.lng
    this.ProductMap.input.location_radius.value = mapContext.location_radius;

    this.ProductMap.pointPos = new google.maps.LatLng(mapContext.lat, mapContext.lng);
    this.ProductMap.pointRadius = mapContext.location_radius;

    this._SearchAction();
}

ProductSearchControler.prototype.beginScreen = function () {
    $('main').addClass('beginScreen');
}

ProductSearchControler.prototype.showCitySearch = function () {
    var i = this;
    cityOptions = $('select#city').html();
    html = '<div class="popup-select-city popup-section section-light"><div class="callout callout-info">Blah blah~~~ Some messages here~</div><div class="select-city-board"><div class="col-lg-3 no-padding"><h4>Chọn thành phố</h4></div><div class="col-lg-9 no-padding-right"><select id="city_first">'+cityOptions+'</select></div><div class="clearfix"></div></div>  <div class="center"><a href="#" class="btn btn-danger select-city-done">Tìm kiếm</a></div> </div>';
    $('.popup-content').css({
        left: '25%',
        right: '25%',
        height: 200
    });
    popup(html);
    $('.popup-content [role="close"]').hide();
    $('.select-city-done').click(function () {
        c_city = $('select#city_first').val();
        if (c_city == 'HN') i.ProductMap.input.center.value = '21.0277644:105.83415979999995';
        $('select#city').val(c_city);
        i.changeCityCallback();
        remove_popup();
        i.ChangeUrlForNewContext();
        i._SearchAction();
        return false
    })
}

ProductSearchControler.prototype.changeCityCallback = function () {
    var f = this.formSearch;
    for (var i = 0; i < cityList.length; i++) {
        if (cityList[i].code == c_city) {
            district = cityList[i].district;
            for (var u = 0; u < district.length; u++) {
                district[u].order = district[u].id;
                if (city == 'HN') {
                    if (district[u].id == 718)
                        district[u].order = 15;
                    else if(district[u].id > 15)
                        district[u].order = district[u].id + 1;
                }
            }
            //district = district.sort(SortByOrder);
            break;
        }
    }
    options.district = '';
    if (district != null && district) {
        for (var i = 0; i < district.length; i++) {
            options.district += "<option value='" + district[i].id + "'>" + district[i].name + "</option>";
            street = district[i].street;
        }
    }
    f.find('#district').html('<option value="CN">--Chọn Quận/Huyện--</option>'+options.district);
    f.find('#ward').html('<option value="CN">--Chọn Phường/Xã--</option>');
    f.find('#street').html('<option value="CN">--Chọn Đường/Phố--</option>');
}

ProductSearchControler.prototype.changeDistrictCallback = function () {
    var f = this.formSearch;
    ward = {};
    street = {};
    for (var i = 0; i < cityList.length; i++) {
        if (cityList[i].code == c_city) {
            for (var j = 0; j < cityList[i].district.length; j++) {
                if (cityList[i].district[j].id == c_district) {
                    project = cityList[i].district[j].project;
                    ward = cityList[i].district[j].ward;
                    street = cityList[i].district[j].street;
                    break;
                }

            }
        }
    }

    options.ward = '';
    if (ward != null && ward) {
        for (var j = 0; j < ward.length; j++) {
            options.ward += "<option value='" + ward[j].id + "'>" + ward[j].name + "</option>";
        }
    }
    f.find('#ward').html('<option value="CN">--Chọn Phường/Xã--</option>'+options.ward);
    f.find('#street').html('<option value="CN">--Chọn Đường/Phố--</option>');
}

ProductSearchControler.prototype.changeWardCallback = function () {
    var f = this.formSearch;
    options.street = '';
    if (street != null && street) {
        for (var j = 0; j < street.length; j++) {
            options.street += "<option value='" + street[j].id + "'>" + street[j].name + "</option>";
        }
    }
    f.find('#street').html('<option value="CN">--Chọn Đường/Phố--</option>'+options.street);
}

ProductSearchControler.prototype.catchInputChange = function () {
    var i = this;
    var f = i.formSearch;
    f.find('#city').on('change', function () {
        c_city = $(this).val();
        i.changeCityCallback();
    });
    f.find('#district').on('change', function () {
        c_district = $(this).val();
        i.changeDistrictCallback();
    });
    f.find('#ward').on('change', function () {
        c_ward = $(this).val();
        i.changeWardCallback();
    })
}

ProductSearchControler.prototype.closePopup = function () {
    this.ProductMap.input.details.value = 0;
    this.ProductMap.isDetails = false;
    this.ChangeUrlForNewContext();
}

ProductSearchControler.prototype.ShowMoreInfoAndHidePopup = function (id, lat, lon) {
    remove_popup();
    this.closePopup();
    this.ProductMap.showInfoWindow(id);
    this.ShowMoreInfo(id,lat,lon);
}

ProductSearchControler.prototype.ShowMoreInfo = function (id, lat, lon, isInit = true) {
    if (this.ProductMap.map.getZoom() < zoom_utilityView)
        this.ProductMap.map.setZoom(zoom_utilityView);
    console.log(this.ProductMap.isShowUtil);
    if (!this.ProductMap.isShowUtil || isInit) {
        this.utilityTool.ResetRadius();
        //console.log(lat+' ~ '+lon);
        this.utilityTool.SearchAction(lat, lon);
    }
};

ProductSearchControler.prototype.ShowDetails = function (id) {
    var i = this;
    if (!i.ProductMap.isDetails) {
        i.ProductMap.input.details.value = 1;
        i.ProductMap.isDetails = true;
        i.ChangeUrlForNewContext();
    }
    $.get(MAIN_URL+'/api/node_one.php', function (place) {
        //console.log(place);
        place.room_left = parseInt(place.room) - parseInt(place.room_taken);
        $('.v-place-room_left_num').html(place.room_left+'/'+place.room);
        $('.v-place-pricenum').html(place.price);
        $('.place-contact-info').html('<h3>'+place.tenlienhe+'</h3><a href="tel:'+place.dienthoai+'" class="place-contact-info-phone btn btn-danger">'+place.dienthoai+'</a>');
        $('.v-place-details').html(place.details);
        $('.v-place-type_txt').html(place.type);
        $('.v-place-title').html(place.title);
        $('.v-place-adr').html(place.address);
        $('.v-place-avt').attr('src', place.avatar);
        $('.v-place-bg').css('background-image', 'url('+place.thumbs[0]+')');
        $('.v-place-thumbs').html('');
        $.each(place.thumbs, function (ti, tv) {
            cls = '';
            if (ti == 0) cls = ' active';
            $('.v-place-thumbs').append('<img class="v-place-thumb'+cls+'" src="'+tv+'"/>')
        });
        if (place.totalReviews > 0)
            $('.v-place-ratings').html($('.ui_reviews').html());
        else
            $('.v-place-view-more .v-place-ratings').html('<div class="no-reviews-found">Chưa có đánh giá nào. <a href="javascript:gotoDiv(\'.v-place-write-review\')">Thêm đánh giá</a></div>');

        popup($('#v-place-view').html(), true);

        i.writeReview(place.id);

        $('.popup-content [role="close"]').show();
        $('.v-place-mode').click(function () {
            vid = $(this).attr('id');
            $('.v-place-board').hide();
            $('.v-place-'+vid).show();
            $('.v-place-mode').removeClass('active');
            $(this).addClass('active');
        });
        $('.v-place-thumb').click(function () {
            img = $(this).attr('src');
            $('.v-place-bg').css('background-image', 'url('+img+')');
            $('.v-place-thumb').removeClass('active');
            $(this).addClass('active');
        });
        $('.popup-content [role="close"]').click(function () {
            i.closePopup();
        })
    });
};

ProductSearchControler.prototype.writeReview = function (id) {
    $('.star-info').attr('data-id', id);
    $('#writeReview [name="node"]').val(id);
    rate('#writeReview');
}

ProductSearchControler.prototype._SearchAction = function(d) {
    if (!d) {
        d = JSON.parse(JSON.stringify(this.formSearch.serializeArray()));
        d.filter = 0;
        d.sort = 0;
        d.v = new Date().getTime();
        this.searchVar = d;
        var f = this;
        //console.log(d);
        $.ajax({
            url: API_URL+'/nodes',
            type: 'get',
            success: function(data) {
                // show on map
                if ($('main').is('.beginScreen')) $('main').removeClass('beginScreen');
                f.tempProductData = f.productData = f.ProductMap.showMap(data, d.isSearchForm);
            },
            error: function(a, b, c) {
                console.log(a+' ~ '+b+' ~ '+c)
            }
        });
    }
};

ProductSearchControler.prototype.showList = function (d) {
    var f = this;
    f.mapResults.html('');
    //$.each(d, function (i, v) {
    for (i = 0; i < 10; i++) {
        if (d[i]) {
            var v = d[i];
            if (!v.rating) v.ratingTxt = '0';
            else {
                v.ratingTxt = v.rating.toString();
                if (v.rating != round(v.rating)) v.ratingTxt = v.ratingTxt.replace('.', '');
            }
            if (!v.totalReviews) v.totalReviews = 0;
            k = '<div attr-id="'+v.id+'" attr-marker-id="'+i+'" class="map-result-one">';
            k += '<div class="map-result-one-left no-padding">'
            k += '<img class="map-result-one-thumb" src="'+v.avatar+'">';
            k += '<div class="map-result-one-price"><i class="fa fa-dollar"></i><span>'+v.price.replace('/tháng','')+'</span></div>';
            k += '</div>';
            k += '<div class="map-result-one-info">'
            k += '<h3 class="map-result-one-title">'+v.title+'</h3>';
            //k += '<div class="map-result-one-des">'+v.details+'</div>';
            k += '<div class="map-result-one-adr"><i class="fa fa-map-marker"></i> '+v.address+'</div>';
            //k += '<div class="map-result-one-type">'+v.type+'</div>';
            //k += '<div class="map-result-one-phone">'+v.phone+'</div>';
            k += '<div class="map-result-one-ratings">';
            k += '<span class="ui_bubble_rating bubble_'+v.ratingTxt+'"></span><a href="javascript:productControlerObj.showInfoWindow(\''+v.id+'\','+v.latitude+','+v.longitude+',false)" target="_blank" class="more">'+v.totalReviews+' Reviews</a>';
            k += '</div>';
            k += '</div>';
            k += '<div class="clearfix"></div>';
            k += '</div>';
            f.mapResults.append(k);
        }
    }
    //});
    $('.map-result-one').each(function () {
        /*$(this).mouseenter(function () {
            f.ProductMap.mouseHover($(this).attr('attr-marker-id'));
        });
        $(this).mouseleave(function () {
            f.ProductMap.mouseOut($(this).attr('attr-marker-id'));
        });*/
        $(this).click(function () {
            f.ProductMap.showInfoWindow($(this).attr('attr-id'));
            f.ChangeUrlForNewContext();
        })
    })
};

ProductSearchControler.prototype.callBackDrawEvent = function(a, b, c, d, e, f) {
    this.lstPoint = this.ProductMap.input.points.value;
    if (this.lstPoint != null && this.lstPoint.length > 0) {
        var g = JSON.parse(JSON.stringify(this.formSearch.serializeArray()));
        /*
        g.ptype = $('.product-form > .tab > .active').attr('cateid');
        g.cate = this.hdbProductType.getValue();ow
        g.area = this.hdbAreaLevel.getValue();
        g.price = this.hdbPriceLevel.getValue();
        g.room = this.hdbRoomLevel.getValue();
        g.direct = this.hdbDirection.getValue();
        g.startdate = '';
        g.enddate = '';
        */
        g.lstPoint = this.lstPoint;
        g.isSearchForm = false;
        g.isPageLoad = false;
        g.minlat = b;
        g.minlong = c;
        g.maxlat = d;
        g.maxlong = e;
        g.m = "shape";
        if (f != undefined) {
            g.cpid = f.cpid;
            g.zoom = f.zoom;
            g.center = f.center
        } else {
            g.zoom = this.getZoom();
            g.center = this.getCenter()
        }
        this._SearchAction(g)
    }
};
ProductSearchControler.prototype.ChangeUrlForNewContext = function(e) {
    $input = this.ProductMap.input;
    var a = "ptype=" + ($input.type.value != undefined ? $input.type.value : '');
    a += "&city=" + ($input.city.value != undefined ? $input.city.value : '');
    a += "&district=" + ($input.district.value != undefined ? $input.district.value : '');
    a += "&area=" + ($input.area.value != undefined ? $input.area.value : '');
    a += "&price=" + ($input.price.value != undefined ? $input.price.value : '');
    a += "&ward=" + ($input.ward.value != undefined ? $input.ward.value : '');
    a += "&street=" + ($input.street.value != undefined ? $input.street.value : '');
    a += "&direction=" + ($input.direction.value != undefined ? $input.direction.value : '');
    a += "&location=" + ($input.location.value != undefined ? $input.location.value : '');
    a += "&location_radius=" + ($input.location_radius.value != undefined ? $input.location_radius.value : '');
    a += "&lat=" + ($input.lat.value != undefined ? $input.lat.value : '');
    a += "&lng=" + ($input.lng.value != undefined ? $input.lng.value : '');
    a += "&points=" + (this.ProductMap.isDrawing ? ($input.points.value != undefined ? $input.points.value : '') : '');
    a += "&zoom=" + this.ProductMap.getZoom();
    a += "&center=" + this.ProductMap.getCenter();
    a += "&product=" + (this.ProductMap.currentPid != undefined && this.ProductMap.currentPid != null ? this.ProductMap.currentPid : '');
    a += "&isShowUtil=" + (this.ProductMap.isShowUtil && this.ProductMap.currentPid != undefined && this.ProductMap.currentPid != null ? 1 : 0);
    a += "&details=" + (this.ProductMap.isDetails ? 1 : 0);
    window.location.href = window.location.pathname + '#' + a;
    //console.log('ChangeUrlForNewContext: '+window.location.pathname + '#' + a);
};


var oldWidth = $(window).width();
var oldHeight = $(window).height();
ResponsiveSidebar = function () {
    var res = this;
    this.initialize();
    $(window).on('resize', function () {
        var b = false;
        if (oldWidth > $(window).width() || oldHeight > $(window).height()) b = true;
        var currentlyHide = true;
        if ($('.map-side').css('left') == '0px') { // is currently show
            if ($(window).width() < 1200) currentlyHide = false;
        }
        res.render(b, !currentlyHide);
        productControlerObj.ProductMap.resize();
    });
    $('.map-side-toggle').click(function () {
        var currentlyHide = true;
        if ($('.map-side').css('left') == '0px') currentlyHide = false; // is show
        res.render(false, !currentlyHide);
        productControlerObj.ProductMap.resize();
    });
}
ResponsiveSidebar.prototype.initialize = function () {
    var cHide = false;
    if ($(window).width() < 1200) cHide = true;
    this.render(false, cHide);
}
ResponsiveSidebar.prototype.render = function (isResizeSmaller = false, hideMapSide = false) {
    var w = $(window).width();
    var h = $(window).height();

    var mapSideWidth = '40%';

    if (w <= 900) mapSideWidth = 500;
    if (w <= 360) mapSideWidth = w;

    $('.map-side .tab-content').height($('.map-side').height() - $('.map-side>ul.nav').height());

    oldWidth = w;
    oldHeight = h;

    if (isResizeSmaller) {
        w = w + 12;
        h = h + 12;
    }

    $('#map_results').css('top',$('#map-search-form').height());
    $('.map-side').css({width: mapSideWidth});

    if (hideMapSide) { // hide sidebar
        $('.map-side-toggle').html('<i class="fa fa-angle-double-right"></i>');
        $('.map-side').animate({left: -mapSideWidth }, 100);
        $('#map').css({
            height: h - $('nav.navbar').height(),
            left: 0
        }, 100);
    } else {
        $('.map-side-toggle').html('<i class="fa fa-angle-double-left"></i>');
        $('.map-side').animate({left: 0 }, 100);
        $('#map').css({
            height: h - $('nav.navbar').height(),
            left: $('.map-side').width()
        }, 100);
    }

    $('.map-filters').width($('.map-search-form>div:eq(0)').width()-22);

    if (w <= 900) {
        $('.map-item-col>div').css({
            width: '100%',
            float: 'none'
        })
    }

    if (w <= 360) {
        if ($('.map-side').css('left') == '0px') {
            $('.map-side-toggle').css({
                top: 10,
                right: -30
            })
        } else {
            $('.map-side-toggle').css({
                top: 4,
                right: 0
            })
        }
    }
    else $('.map-side-toggle').css({
        top: 10,
        right: -30
    })
}


function gotoDiv (div) {
    $('.popup-inner>div').animate({
        scrollTop: $(div).offset().top
    }, 800);
}


var markContext = "";
var mapContext = {};
var productControlerObj = null;

$(window).ready(function() {
    $('.container').height($(window).height());

    if (typeof cityListOther1 != 'undefined') cityList = $.merge(cityList, cityListOther1);
    if (typeof cityListOTher2 != 'undefined') cityList = $.merge(cityList, cityListOther2);
    if (typeof cityListOTher3 != 'undefined') cityList = $.merge(cityList, cityListOther3);
    if (typeof cityListOTher4 != 'undefined') cityList = $.merge(cityList, cityListOther4);

    if (window.location.hash != '') {
        markContext = window.location.hash;
        mapContext = {
            ptype: parseInt(markContext.getQueryHash('ptype', '38')),
            catid: markContext.getQueryHash('cat'),
            city: markContext.getQueryHash('city'),
            district: markContext.getQueryHash('district'),
            area: markContext.getQueryHash('area'),
            price: markContext.getQueryHash('price'),
            ward: markContext.getQueryHash('ward'),
            street: markContext.getQueryHash('street'),
            room: markContext.getQueryHash('room'),
            direction: markContext.getQueryHash('direction'),
            lstPoint: markContext.getQueryHash('points'),
            zoom: markContext.getQueryHash('zoom', zoom_moderate),
            center: markContext.getQueryHash('center'),
            currentPid: markContext.getQueryHash('product'),
            isShowUtil: markContext.getQueryHash('isShowUtil'),
            details: markContext.getQueryHash('details'),
            location: markContext.getQueryHash('location'),
            lat: markContext.getQueryHash('lat'),
            lng: markContext.getQueryHash('lng'),
            location_radius: markContext.getQueryHash('location_radius')
        };
    }
    // Fix content from product list linking
    if (mapContext.area == "-1") mapContext.area = "";
    if (mapContext.pricelevel == "-1") mapContext.pricelevel = "";
    if (mapContext.direction == "-1") mapContext.direction = "";
    if (!mapContext.center) mapContext.center = defaultCenter;
    if (!mapContext.zoom) mapContext.zoom = zoom_moderate;
    if (!mapContext.lstPoint) mapContext.lstPoint = "";

    $('nav.navbar').removeClass('navbar-static-top').addClass('navbar-fixed-top');
    //$("#price").ionRangeSlider();

    productControlerObj = new ProductSearchControler({
        context: mapContext
    });
    responsiveDesign = new ResponsiveSidebar();

    $('.map-filters').width($('.map-search-form>div:eq(0)').width()-22);

    $(document).mouseup(function (e) {
        var container = $(".map-filters,#location,#map-search-form");
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('#map-search-form').removeClass('active');
            $('.map-item-info-board,#map_results').removeClass('disabled');
            $('.map-filters').hide();
        } else {
            $('#map-search-form').addClass('active');
            $('.map-item-info-board,#map_results').addClass('disabled');
            $('.map-filters').show()
        }
    });
})
