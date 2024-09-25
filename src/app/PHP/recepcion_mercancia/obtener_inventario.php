<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include '../conexion.php';

// Consulta para obtener el inventario
$sql = "SELECT * FROM inventarios_tiendas";
$result = mysqli_query($conexion, $sql);

if ($result) {
    $inventario = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $inventario[] = $row;
    }
    echo json_encode($inventario);
} else {
    echo json_encode(array("message" => "Error al obtener inventario."));
}

mysqli_close($conexion);
?>
