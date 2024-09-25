<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

$fecha = $data['fecha'];
$cantidad = $data['cantidad'];
$articulo = $data['articulo'];

// Verificar que el artículo existe en la tabla productos
$verificar_articulo = "SELECT * FROM productos WHERE codigo_ean = '$articulo'";
$resultado = mysqli_query($conexion, $verificar_articulo);

if (mysqli_num_rows($resultado) > 0) {
    // El artículo existe, proceder con la inserción
    $query = "INSERT INTO ordenes_compra (fecha, cantidad, articulo) VALUES ('$fecha', '$cantidad', '$articulo')";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => mysqli_error($conexion)]);
    }
} else {
    // El artículo no existe, devolver un error
    echo json_encode(["success" => false, "error" => "El artículo no existe en la base de datos."]);
}

mysqli_close($conexion);
?>


