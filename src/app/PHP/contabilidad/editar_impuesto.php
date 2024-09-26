<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: PUT');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['tipo_impuesto'], $data['periodo_fiscal'], $data['monto_calculado'], $data['fecha_vencimiento'], $data['estado'], $data['usuario_id'])) {
        $tipo_impuesto = $data['tipo_impuesto'];
        $periodo_fiscal = $data['periodo_fiscal'];
        $monto_calculado = $data['monto_calculado'];
        $fecha_vencimiento = $data['fecha_vencimiento'];
        $estado = $data['estado'];
        $usuario_id = $data['usuario_id'];

        $query = "UPDATE impuestos 
                  SET tipo_impuesto = '$tipo_impuesto', periodo_fiscal = '$periodo_fiscal', monto_calculado = $monto_calculado, 
                      fecha_vencimiento = '$fecha_vencimiento', estado = '$estado', usuario_id = $usuario_id 
                  WHERE id = $id";

        if (mysqli_query($conexion, $query)) {
            echo json_encode(array("message" => "Impuesto actualizado correctamente."));
        } else {
            echo json_encode(array("message" => "Error al actualizar el impuesto.", "error" => mysqli_error($conexion)));
        }
    } else {
        echo json_encode(array("message" => "Datos incompletos."));
    }
} else {
    echo json_encode(array("message" => "ID no proporcionado."));
}

mysqli_close($conexion);
?>
