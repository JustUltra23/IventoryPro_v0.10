<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include '../conexion.php';

// Función para responder en formato JSON
function responder($mensaje, $exito = true) {
    echo json_encode(array("success" => $exito, "message" => $mensaje));
    exit;
}

// Obtener los datos de la solicitud
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->tienda_id, $data->producto_id, $data->cantidad, $data->fecha_recepcion, $data->estado)) {
    responder("Datos incompletos.", false);
}

$tienda_id = $data->tienda_id;
$producto_id = $data->producto_id;
$cantidad = $data->cantidad;
$fecha_recepcion = $data->fecha_recepcion;
$estado = $data->estado;

try {
    // Iniciar una transacción para asegurar consistencia entre recepcion_mercancia y inventarios_tiendas
    mysqli_begin_transaction($conexion);

    // Consulta preparada para insertar la recepción
    $stmt = $conexion->prepare("INSERT INTO recepcion_mercancia (tienda_id, producto_id, cantidad, fecha_recepcion, estado) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("iiiss", $tienda_id, $producto_id, $cantidad, $fecha_recepcion, $estado);

    if ($stmt->execute()) {
        // Verificar si ya existe un registro en inventarios_tiendas para la tienda y producto
        $stmt_check = $conexion->prepare("SELECT stock FROM inventarios_tiendas WHERE tienda_id = ? AND producto_id = ?");
        $stmt_check->bind_param("ii", $tienda_id, $producto_id);
        $stmt_check->execute();
        $resultado = $stmt_check->get_result();

        if ($resultado->num_rows > 0) {
            // Si existe, actualizar el stock sumando la cantidad recibida
            $stmt_update = $conexion->prepare("UPDATE inventarios_tiendas SET stock = stock + ? WHERE tienda_id = ? AND producto_id = ?");
            $stmt_update->bind_param("iii", $cantidad, $tienda_id, $producto_id);
            if (!$stmt_update->execute()) {
                throw new Exception("Error al actualizar el inventario.");
            }
        } else {
            // Si no existe, insertar un nuevo registro con la cantidad recibida
            $stmt_insert = $conexion->prepare("INSERT INTO inventarios_tiendas (tienda_id, producto_id, stock) VALUES (?, ?, ?)");
            $stmt_insert->bind_param("iii", $tienda_id, $producto_id, $cantidad);
            if (!$stmt_insert->execute()) {
                throw new Exception("Error al insertar el inventario.");
            }
        }

        // Confirmar la transacción
        mysqli_commit($conexion);
        responder("Recepción registrada y inventario actualizado correctamente.");
    } else {
        throw new Exception("Error al registrar la recepción.");
    }

} catch (Exception $e) {
    // En caso de error, revertir la transacción
    mysqli_rollback($conexion);
    responder($e->getMessage(), false);
} finally {
    // Cerrar la conexión y los recursos
    $stmt->close();
    $conexion->close();
}
?>






