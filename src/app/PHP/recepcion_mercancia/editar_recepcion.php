<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include '../conexion.php';

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id) && isset($data->tienda_id) && isset($data->producto_id) && isset($data->cantidad) && isset($data->fecha_recepcion) && isset($data->estado)) {
    $id = $data->id;
    $tienda_id = $data->tienda_id;
    $producto_id = $data->producto_id;
    $nueva_cantidad = $data->cantidad;
    $fecha_recepcion = $data->fecha_recepcion;
    $estado = $data->estado;

    // Obtener la cantidad anterior de la recepción
    $query_anterior = "SELECT cantidad FROM recepcion_mercancia WHERE id = '$id'";
    $resultado_anterior = mysqli_query($conexion, $query_anterior);

    if ($resultado_anterior) {
        $row_anterior = mysqli_fetch_assoc($resultado_anterior);
        $cantidad_anterior = $row_anterior['cantidad'];

        // Actualizar la recepción
        $query_actualizar = "UPDATE recepcion_mercancia SET tienda_id = '$tienda_id', producto_id = '$producto_id', cantidad = '$nueva_cantidad', fecha_recepcion = '$fecha_recepcion', estado = '$estado' WHERE id = '$id'";
        if (mysqli_query($conexion, $query_actualizar)) {
            // Ajustar el stock en inventarios_tiendas
            $diferencia = $nueva_cantidad - $cantidad_anterior;
            $query_stock = "UPDATE inventarios_tiendas SET stock = stock + $diferencia WHERE tienda_id = '$tienda_id' AND producto_id = '$producto_id'";
            if (mysqli_query($conexion, $query_stock)) {
                echo json_encode(array("message" => "Recepción actualizada correctamente."));
            } else {
                echo json_encode(array("message" => "No se pudo actualizar el inventario."));
            }
        } else {
            echo json_encode(array("message" => "No se pudo actualizar la recepción."));
        }
    } else {
        echo json_encode(array("message" => "No se pudo obtener la cantidad anterior."));
    }
} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);
?>






