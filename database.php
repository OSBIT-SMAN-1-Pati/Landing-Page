<?php
header("refresh:0;url=/index.html", true, 301);

$servername = "";
$username = "admin";
$password = "admin";
$dbname = "database";

$conn = new mysqli($servername, $username, $password, $dbname);
?>