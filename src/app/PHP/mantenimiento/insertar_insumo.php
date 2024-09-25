<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Recibir los datos JSON
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['nombre_insumo'], $data['descripcion'], $data['cantidad'], $data['precio_unitario'], $data['tienda_id'], $data['proveedor'])) {

    $nombreInsumo = $data['nombre_insumo'];
    $descripcion = $data['descripcion'];
    $cantidad = $data['cantidad'];
    $precioUnitario = $data['precio_unitario'];
    $tiendaId = $data['tienda_id'];
    $proveedor = $data['proveedor'];

    // Insertar el nuevo insumo en la base de datos
    $query = "INSERT INTO inventario_insumos (nombre_insumo, descripcion, cantidad, precio_unitario, tienda_id, proveedor, fecha_ingreso) 
              VALUES ('$nombreInsumo', '$descripcion', $cantidad, $precioUnitario, $tiendaId, '$proveedor', NOW())";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Insumo insertado correctamente."));
    } else {
        echo json_encode(array("message" => "Error al insertar el insumo.", "error" => mysqli_error($conexion)));
    }

} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);

?>
