<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

// Obtener detalles de la recepción
$query_recepcion = "SELECT tienda_id, producto_id, cantidad FROM recepcion_mercancia WHERE id = $id";
$result_recepcion = mysqli_query($conexion, $query_recepcion);
$row_recepcion = mysqli_fetch_assoc($result_recepcion);
$tienda_id = $row_recepcion['tienda_id'];
$producto_id = $row_recepcion['producto_id'];
$cantidad = $row_recepcion['cantidad'];

// Eliminar la recepción
$query = "DELETE FROM recepcion_mercancia WHERE id = $id";
$result = mysqli_query($conexion, $query);

if ($result) {
    // Actualizar el stock en la tabla inventarios_tiendas
    $query_inventario = "UPDATE inventarios_tiendas SET stock = stock - $cantidad WHERE tienda_id = $tienda_id AND producto_id = $producto_id";
    mysqli_query($conexion, $query_inventario);
    
    echo json_encode(["success" => true]);
} else {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(["success" => false, "message" => "Error al eliminar la recepción: " . mysqli_error($conexion)]);
}

mysqli_close($conexion);
?>
