<?php
header('Access-Control-Allow-Origin: *');  // O usa el dominio específico si lo prefieres
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH', 'OPTIONS');  // Métodos permitidos
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$query = "SELECT * FROM tiendas";
$result = mysqli_query($conexion, $query);

$tiendas = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $tiendas[] = $row;
    }
    echo json_encode($tiendas);
} else {
    echo json_encode(array("message" => "No se encontraron tiendas."));
}

mysqli_close($conexion);

?>
