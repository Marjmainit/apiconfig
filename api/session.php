<?php

include "connect.php";

$valid = false;
$user_id = null;

if (isset($_SESSION['users_id'])){
    $valid = true;
    $user_id = $_SESSION['users_id'];
}

$response = array(
    'success' => true,
    'valid' => $valid,
    'user_id' => $user_id
);

echo json_encode($response);

?>