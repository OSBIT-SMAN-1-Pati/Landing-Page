<?php

$nama = $_POST['nama'];
$kelas = $_POST['kelas'];
$whatsapp = $_POST['whatsapp'];
$jurusan = $_POST['jurusan'];

if (empty($nama) || empty($kelas) || empty($whatsapp) || empty($jurusan)) {
  $data["success"] = false;
  $data["type"] = "user-error";
  echo json_encode($data);
  exit;
}

include '../database.php';
header('Content-type: application/json', true, 200);

if ($conn->connect_error) {
  $data["success"] = false;
  $data["type"] = "connection-error";
  echo json_encode($data);
  exit;
}

$sql_check_duplicate = $conn->prepare("SELECT * FROM pendaftaran WHERE nama=? AND kelas=? AND whatsapp=? AND jurusan=?");
$sql_check_duplicate->bind_param("ssss", $nama, $kelas, $whatsapp, $jurusan);

if (!$sql_check_duplicate->execute()) {
  $data["success"] = false;
  $data["type"] = "query-error";
  $data["message"] = $conn->error;
  echo json_encode($data);
}

$is_duplicate = false;
while ($sql_check_duplicate->fetch()) {
  $is_duplicate = true;
  break;
}

if ($is_duplicate) {
  $data["success"] = false;
  $data["type"] = "duplicate-error";
  $data["message"] = "Data sudah terdaftar.";
  echo json_encode($data);
} else {

  $sql_insert = $conn->prepare("INSERT INTO pendaftaran (nama, kelas, whatsapp, jurusan) VALUES (?, ?, ?, ?)");
  $sql_insert->bind_param("ssss", $nama, $kelas, $whatsapp, $jurusan);
  
  if ($sql_insert->execute()) {
    $data["success"] = true;
    echo json_encode($data);
  } else {
    $data["success"] = false;
    $data["type"] = "query-error";
    $data["message"] = $conn->error;
    echo json_encode($data);
  }
}

$conn->close();
?>
