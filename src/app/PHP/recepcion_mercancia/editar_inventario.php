<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"));

if(isset($data->producto_id) && isset($data->tienda_id) && isset($data->nueva_cantidad) && isset($data->cantidad_anterior)) {
    $producto_id = $data->producto_id;
    $tienda_id = $data->tienda_id;
    $nueva_cantidad = $data->nueva_cantidad;
    $cantidad_anterior = $data->cantidad_anterior;

    // Calcular la diferencia en cantidad
    $diferencia = $nueva_cantidad - $cantidad_anterior;

    // Verificar si ya existe un registro en inventarios_tiendas para la tienda y producto
    $query = "SELECT stock FROM inventarios_tiendas WHERE tienda_id = '$tienda_id' AND producto_id = '$producto_id'";
    $resultado = mysqli_query($conexion, $query);

    if (mysqli_num_rows($resultado) > 0) {
        // Actualizar el stock sumando la diferencia
        $query_update = "UPDATE inventarios_tiendas SET stock = stock + '$diferencia' WHERE tienda_id = '$tienda_id' AND producto_id = '$producto_id'";
        if(mysqli_query($conexion, $query_update)) {
            echo json_encode(array("message" => "Inventario actualizado correctamente."));
        } else {
            echo json_encode(array("message" => "No se pudo actualizar el inventario."));
        }
    } else {
        echo json_encode(array("message" => "No existe registro de inventario para este producto en esta tienda."));
    }
} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);
?>
