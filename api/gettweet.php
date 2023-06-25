<?php
include "config.php";

// Fetch tweets from the database
$sql = "SELECT id, content, date_tweeted, user_id FROM tweets ORDER BY date_tweeted DESC";
$result = mysqli_query($conn, $sql);

if (!$result) {
    echo "Error fetching tweets: " . mysqli_error($conn);
    exit;
}

$tweets = [];
while ($row = mysqli_fetch_assoc($result)) {
    $tweet = [
        'id' => $row['id'],
        'content' => $row['content'],
        'date_tweeted' => $row['date_tweeted'],
        'user_id' => $row['user_id']
    ];
    $tweets[] = $tweet;
}

// Output the tweets as JSON response
header('Content-Type: application/json');
echo json_encode($tweets);
?>
