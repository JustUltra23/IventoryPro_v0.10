<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: PUT');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'], $data['nombre_insumo'], $data['descripcion'], $data['cantidad'], $data['precio_unitario'], $data['proveedor'])) {

    $id = $data['id'];
    $nombreInsumo = $data['nombre_insumo'];
    $descripcion = $data['descripcion'];
    $cantidad = $data['cantidad'];
    $precioUnitario = $data['precio_unitario'];
    $proveedor = $data['proveedor'];

    $query = "UPDATE inventario_insumos 
              SET nombre_insumo = '$nombreInsumo', descripcion = '$descripcion', cantidad = $cantidad, 
                  precio_unitario = $precioUnitario, proveedor = '$proveedor' 
              WHERE id = $id";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Insumo actualizado correctamente."));
    } else {
        echo json_encode(array("message" => "Error al actualizar el insumo.", "error" => mysqli_error($conexion)));
    }

} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);

?>
