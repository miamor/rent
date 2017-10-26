function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
    console.log('download~');
}

$(document).ready(function () {
    var district = 'dongda';
    var toSave = [];
    $.getJSON(MAIN_URL+'/utility_api/'+district+'.json', function (data) {
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
            //toSave.push(f);
            toSave.push(JSON.stringify(f));
        });
        console.log(toSave);
        $('body').append(toSave.join(','));
        download(toSave, district+'.json', 'application/json');
    })
})
