<?php include '../include/functions.php';
header('content-type: application/json');

$data = array();
for ($i = 0; $i < 5; $i++) {
    $data[] = array(
        'avatar' => 'node_'.$i,
        'content' => 'node_'.$i,
        'node_id' => 'node_'.$i,
        "title" => "uytr yntrv nuytbrv",
        "avatar" => MAIN_URL."/data/images/h1.jpg",
        "rating" => 4,
        "reviews_details" => "cleanliness:3|security:5|utility:3|location:4",
        "details" => "<p>Founded in 1824, the Porcelain Factory of Vista Alegre was the first industrial unit dedicated to porcelain production in Portugal. For the foundation and success of this risky industrial development was crucial the spirit of persistence of its founder, José Ferreira Pinto Basto. Leading figure in Portuguese society of the nineteenth century farm owner, daring dealer, wisely incorporated the liberal ideas of the century, having become \"the first example of free enterprise\" in Portugal.</p><p class='bold'>Contacts</p><p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br><br>Phone. +351 234 320 600<br>e-mail: geral@vaa.pt<br>www: www.myvistaalegre.com</p>",
        "name" => "Miamor W"
    );
}

echo json_encode($data, JSON_UNESCAPED_UNICODE);

 ?>
