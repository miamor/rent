var placeLatLng = {lat: 41.878, lng: -87.629};

function initMap() {
    var map = new google.maps.Map(document.getElementById('place_map'), {
        zoom: 14,
        center: placeLatLng,
        mapTypeId: 'terrain'
    });

    var marker = new google.maps.Marker({
        position: placeLatLng
    });
    marker.setMap(map);

    var placeCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.15,
        map: map,
        center: placeLatLng,
        radius: 1000
    });

    $('.place-service').submit(function () {
        placeCircle.setMap(null);
        return false
    })
}

function getRatings () {
    $('#place_reviews').DataTable({
        "ajax": MAIN_URL+'/api/node_one_reviews.php',
        "columns": [
            { "data": "avatar_img" },
            { "data": "content" }
        ],
        "lengthMenu": [ 5, 15, 25, 50, 75, 100 ]
    });
}

$(function () {
    // get ratings
    getRatings();
    rate('#writeReview');

    $('.place-nav>li>a').click(function () {
        $('.place-nav>li>a').removeClass('active');
        $(this).addClass('active');
        scrolltoDiv($(this).attr('href'));
        return false
    })

    var $ad = $('.place-advertise');
    var ad_pos = $ad.offset();
    window.onscroll = function() {
        if (window.pageYOffset >= ad_pos.top){
            $ad.addClass('fixed').css({left: ad_pos.left});
        } else {
            $ad.removeClass('fixed').css('left','');
        }
        if (window.pageYOffset >= $('#place_map').offset().top - 20) {
            $('.place-nav li').removeClass('active');
            $('.place-nav li.place-nav-place_map').addClass('active');
        }
        if (window.pageYOffset >= $('#info').offset().top - 20) {
            $('.place-nav li').removeClass('active');
            $('.place-nav li.place-nav-info').addClass('active');
        }
        if (window.pageYOffset >= $('#reviews').offset().top - 20) {
            $('.place-nav li').removeClass('active');
            $('.place-nav li.place-nav-reviews').addClass('active');
        }
        if (window.pageYOffset >= $('#writeReview').offset().top - 20) {
            $('.place-nav li').removeClass('active');
            $('.place-nav li.place-nav-writeReview').addClass('active');
        }
    }
})
