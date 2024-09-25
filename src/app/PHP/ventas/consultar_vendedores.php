<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$tienda_id = $_GET['tienda_id'];

$query = "SELECT id, nombre_completo, identificacion FROM usuarios WHERE rol_id = 2 AND tienda_id = '$tienda_id'";
$result = mysqli_query($conexion, $query);

$vendedores = [];

while ($row = mysqli_fetch_assoc($result)) {
    $vendedores[] = $row;
}

var_dump($vendedores); // Para depuración

echo json_encode($vendedores);

mysqli_close($conexion);
?>

