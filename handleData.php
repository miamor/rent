<?php
//header('content-type: application/json')
include 'include/functions.php';
// phongtro123
$filename = 'phongtro_hanoi_L1';
$str = file_get_contents(MAIN_URL.'/api/'.$filename.'.json');
//$str = utf8_encode($str);
$data = json_decode($str, true); // decode the JSON into an associative array
// get geocode
$saveData = array();
foreach ($data as $i => $v) {
//for ($i = 2; $i < 3; $i++) {
    $v = $data[$i];

    //print_r($v);

    if (!in_array($v, $saveData)) {
        $saveData[] = $v;
    }

    /*
    $data[$i]['date'] = $v['date'][0];

    foreach ($v['thumbs'] as $ti => $tv) {
        preg_match_all('/url=(.*?)\?/', $tv, $matches);
        if ($matches[0]) {
            //print_r($matches);
            //echo '<br/>';
            $data[$i]['thumbs'][$ti] = $matches[1];
        }
    }
    /*
    $url = 'https://maps.googleapis.com/maps/api/geocode/json?address='.urlencode($v['address']).'&key='.GG_API_KEY;
    $gg_response = file_get_contents($url);
    //echo $gg_response.'~~'.$url.'<br/>';
    $gg_response = json_decode($gg_response, true);
    //print_r($gg_response);
    if (count($gg_response['results'][0]) > 0) {
        $data[$i]['latitude'] = $gg_response['results'][0]['geometry']['location']['lat'];
        $data[$i]['longitude'] = $gg_response['results'][0]['geometry']['location']['lng'];
    } else unset($data[$i]);
    */
}

$saveData = array_values($saveData);
//print_r($data);

$json = str_replace('\/', '/', json_encode($saveData, JSON_UNESCAPED_UNICODE));

echo $json;

/*$fp = fopen('api/'.$filename.'.json', 'w');
fwrite($fp, $json);
fclose($fp);
*/
