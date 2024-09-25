<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');
header("Content-Type: application/json; charset=UTF-8");

require("../conexion.php");

$tienda_id = isset($_GET['tienda_id']) ? $_GET['tienda_id'] : '';
$codigo_ean = isset($_GET['codigo_ean']) ? $_GET['codigo_ean'] : '';

$query = "SELECT it.inventario_id, t.nombre as tienda_nombre, p.nombre as producto_nombre, p.codigo_ean, it.stock, p.precio 
          FROM inventarios_tiendas it 
          JOIN tiendas t ON it.tienda_id = t.id 
          JOIN productos p ON it.producto_id = p.id 
          WHERE 1=1";

if ($tienda_id) {
    $query .= " AND it.tienda_id = '$tienda_id'";
}

if ($codigo_ean) {
    $query .= " AND p.codigo_ean = '$codigo_ean'";
}

$resultado = mysqli_query($conexion, $query);

if ($resultado) {
    $rows = array();
    while ($row = mysqli_fetch_assoc($resultado)) {
        $rows[] = $row;
    }

    if (empty($rows)) {
        echo json_encode(["message" => "No hay registros para esta tienda."]);
    } else {
        echo json_encode($rows);
    }
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo "Error: " . mysqli_error($conexion);
}

mysqli_close($conexion);



