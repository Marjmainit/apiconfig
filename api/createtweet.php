<?php

include "config.php";

// Check if the request is a POST request
if($_SERVER['REQUEST_METHOD'] === 'POST'){

    $data = json_decode(file_get_contents('php://input'), true);

    $content = $data['content'];
    $user_id = 1; 
    // Get the current date and time
    $date_tweeted = date('Y-m-d H:i:s'); 

    $sql = "INSERT INTO tweets (content, user_id, date_tweeted) VALUES ('$content', '$user_id','$date_tweeted')";
    if($conn->query($sql)){
        $response = array(
            'success' => true,
            'message' => 'Tweet successful.'
        );
        echo json_encode($response);
    } else {
        $response = array(
            'success' => false,
            'message' => 'Error creating tweet' 
        );
        echo json_encode($response);
    }

} else {
    echo "Invalid request! Only POST requests are allowed.";
}

?>
