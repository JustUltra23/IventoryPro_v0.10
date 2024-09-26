<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['tipo_impuesto'], $data['periodo_fiscal'], $data['monto_calculado'], $data['fecha_vencimiento'], $data['estado'], $data['usuario_id'])) {
    $tipo_impuesto = $data['tipo_impuesto'];
    $periodo_fiscal = $data['periodo_fiscal'];
    $monto_calculado = $data['monto_calculado'];
    $fecha_vencimiento = $data['fecha_vencimiento'];
    $estado = $data['estado'];
    $usuario_id = $data['usuario_id'];

    $query = "INSERT INTO impuestos (tipo_impuesto, periodo_fiscal, monto_calculado, fecha_vencimiento, estado, usuario_id)
              VALUES ('$tipo_impuesto', '$periodo_fiscal', $monto_calculado, '$fecha_vencimiento', '$estado', $usuario_id)";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Impuesto creado correctamente"));
    } else {
        echo json_encode(array("message" => "Error al crear impuesto", "error" => mysqli_error($conexion)));
    }
} else {
    echo json_encode(array("message" => "Datos incompletos"));
}

mysqli_close($conexion);
?>
