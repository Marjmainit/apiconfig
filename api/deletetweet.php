<?php

include "config.php";

if(isset($_GET['id'])){

    $id = $_GET['id'];

    $sql = "DELETE FROM tweets WHERE id = '$id'";

    if($conn->query($sql)){
        $response = array(
            'success' => true,
            'message' => 'delete successful'
        );
        echo json_encode($response);
    }else{
        echo "Error deleting tweets.";
    }
   
}else{
    echo "No Tweets.";
}



?>