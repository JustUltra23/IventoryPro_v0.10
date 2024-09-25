<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"));

if(isset($data->producto_id) && isset($data->tienda_id) && isset($data->cantidad)) {
    $producto_id = $data->producto_id;
    $tienda_id = $data->tienda_id;
    $cantidad = $data->cantidad;

    // Verificar si ya existe un registro en inventarios_tiendas para la tienda y producto
    $query = "SELECT stock FROM inventarios_tiendas WHERE tienda_id = '$tienda_id' AND producto_id = '$producto_id'";
    $resultado = mysqli_query($conexion, $query);

    if (mysqli_num_rows($resultado) > 0) {
        // Si existe, actualizar el stock sumando la cantidad recibida
        $query_update = "UPDATE inventarios_tiendas SET stock = stock + '$cantidad' WHERE tienda_id = '$tienda_id' AND producto_id = '$producto_id'";
        if(mysqli_query($conexion, $query_update)) {
            echo json_encode(array("message" => "Inventario actualizado correctamente."));
        } else {
            echo json_encode(array("message" => "No se pudo actualizar el inventario."));
        }
    } else {
        // Si no existe, insertar un nuevo registro con la cantidad recibida
        $query_insert = "INSERT INTO inventarios_tiendas (tienda_id, producto_id, stock) VALUES ('$tienda_id', '$producto_id', '$cantidad')";
        if(mysqli_query($conexion, $query_insert)) {
            echo json_encode(array("message" => "Inventario insertado correctamente."));
        } else {
            echo json_encode(array("message" => "No se pudo insertar el inventario."));
        }
    }
} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);
?>

