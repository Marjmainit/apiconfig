<?php

include "config.php";


if (isset($_SESSION['user.firstname'])) {
    $currentUser = $_SESSION['user.firstname'];
    
   
    $sql = "SELECT * FROM user WHERE user.firstname = ?";
    $stmt = mysqli_prepare($config, $sql);
    
 
    mysqli_stmt_bind_param($stmt, "s", $currentUser);
    
    mysqli_stmt_execute($stmt);
    
    $result = mysqli_stmt_get_result($stmt);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo $row['firstname'];
            }
        }
    }
} else {
    echo "User firstname not found in session.";
}

mysqli_close($config);
?>
