<?php include '../include/functions.php';
header('content-type: application/json');

$data = array();
for ($i = 0; $i < 100; $i++) {
    $data[] = array(
        'avatar_img' => '<img class="one-review-avatar" src="'.MAIN_URL.'/data/images/h1.jpg"/>',
        'content' => '
        <h5>
            <a class="one-review-username" href="#">Miamor W.</a>
            <div class="overallBubbleRating"><span class="ui_star_rating star_4"></span></div>
        </h5>
        <div class="one-review-title">Ratings title~~~</div>
        <div class="one-review-details">Founded in 1824, the Porcelain Factory of Vista Alegre was the first industrial unit dedicated to porcelain production in Portugal. For the foundation and success of this risky industrial development was crucial the spirit of persistence of its founder, José Ferreira Pinto Basto. Leading figure in Portuguese society of the nineteenth century farm owner, daring dealer, wisely incorporated the liberal ideas of the century, having become "the first example of free enterprise" in Portugal.</div>
        <ul class="one-review-ratings-more">
            <li>
                <div class="col-md-3">Cơ sở vật chất</div>
                <div class="col-md-9"><span class="ui_star_rating star_3"></span></div>
                <div class="clearfix"></div>
            </li>
            <li>
                <div class="col-md-3">Tiện ích xung quanh</div>
                <div class="col-md-9"><span class="ui_star_rating star_2"></span></div>
                <div class="clearfix"></div>
            </li>
            <li>
                <div class="col-md-3">An ninh</div>
                <div class="col-md-9"><span class="ui_star_rating star_4"></span></div>
                <div class="clearfix"></div>
            </li>
            <li>
                <div class="col-md-3">Hàng xóm</div>
                <div class="col-md-9"><span class="ui_star_rating star_4"></span></div>
                <div class="clearfix"></div>
            </li>
        </ul>',

        'node_id' => 'node_'.$i,
        "title" => "uytr yntrv nuytbrv",
        "avatar" => MAIN_URL ."/data/images/h1.jpg",
        "rating" => 4,
        "reviews_details" => "cleanliness:3|security:5|utility:3|location:4",
        "details" => "<p>Founded in 1824, the Porcelain Factory of Vista Alegre was the first industrial unit dedicated to porcelain production in Portugal. For the foundation and success of this risky industrial development was crucial the spirit of persistence of its founder, José Ferreira Pinto Basto. Leading figure in Portuguese society of the nineteenth century farm owner, daring dealer, wisely incorporated the liberal ideas of the century, having become \"the first example of free enterprise\" in Portugal.</p><p class='bold'>Contacts</p><p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br><br>Phone. +351 234 320 600<br>e-mail: geral@vaa.pt<br>www: www.myvistaalegre.com</p>",
        "name" => "Miamor W"
    );
}

$ar['data'] = $data;

echo json_encode($ar, JSON_UNESCAPED_UNICODE);

 ?>
