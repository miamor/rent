function initMap () {

}

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}

$(document).ready(function () {
    var phongtro = [];
    $.get(MAIN_URL+'/utility_api/phongtro.json', function (data) {
        data = decode_utf8(data);
        data = JSON.parse(data);
        $.each(data, function (i, v) {
        //for (i = 0; i < 2; i++) {
        //    v = data[i];
            $.each(v.thumbs, function (j, t) {
                var result = t.match(/url\=(.*?)\?/g);
                if (result) {
                    v.thumbs[j] = result[0].replace(/url\=|\?/g,'');
                }
            });
            v.avatar = v.thumbs[0];
            // get latitude, longitude
            if (v.address) {
                $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address='+v.address+'&key=AIzaSyACkc-PYhlnPUWJaV2GlcCiEcuJujZsMdc').done(function (response) {
                    if (response.results[0]) {
                        console.log(response);
                        v.latitude = response.results[0].geometry.location.lat;
                        v.longitude = response.results[0].geometry.location.lng;
                        phongtro.push(v);
                    }
                });
            }
            //data[i] = v;
            //console.log(v)
        //}
        })
        //console.log(data);
        setTimeout(function () {
            console.log(phongtro);
            $('body').html(JSON.stringify(phongtro))
        }, 50000);
    })
})
