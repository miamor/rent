function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
    console.log('download~');
}

var districts = ['thanhxuan','dongda','badinh','caugiay','haibatrung','hoankiem'];
var toSave = [];

function append (data) {
    toSave.push(data);
    $('body').append(data+',');
}

$(document).ready(function () {
    for (l = 0; l < districts.length; l++) {
        district = districts[l];
        $.get(MAIN_URL+'/utility_api/'+district+'.json', function (data) {
            data = JSON.parse(data);
            toSave[district] = {};
            var string = '';
            $.each(data, function (i, v) {
                var f = {};
                f.address = v.Address;
                f.AvgRating = v.AvgRating;
                f.AvgRatingText = v.AvgRatingText;
                f.foody_id = v.Id;
                f.latitude = v.Latitude;
                f.longitude = v.Longitude;
                f.title = v.Name;
                f.phone = v.Phone;
                f.TotalReview = v.TotalReview;
                f.avatar = v.PicturePath;
                f.district = v.District;
                f.districtId = v.DistrictId;
                f.city = v.Location;
                f.type = 'restaurant';
                f.typeid = 1;
                //toSave.push(JSON.stringify(f));
                append(JSON.stringify(f));
            });
            //console.log(data);
            //download(toSave, district+'.json', 'application/json');
        })
    }
    console.log(toSave);
    //$('body').append(toSave.join(','));
})
