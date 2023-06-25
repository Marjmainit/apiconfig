<?php
include "config.php";

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}


// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $currentPassword = $_POST['current_password'];
    $newPassword = $_POST['new_password'];
    $confirmPassword = $_POST['confirm_password'];


    if (empty($currentPassword) || empty($newPassword) || empty($confirmPassword)) {
        $error = "Please fill in all fields.";
    } elseif ($newPassword !== $confirmPassword) {
        $error = "New password and confirm password do not match.";
    } else {
       
        $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

        if ($updateSuccess) {
            header("Location: changepassword.php");
            exit;
        } else {
            $error = "Failed to update password. Please try again.";
        }
    }
}

?>