<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Recibir los datos JSON
$data = json_decode(file_get_contents("php://input"), true);

// Comprobar que todos los datos necesarios estén presentes
if (isset($data['usuario_id'], $data['fecha_nacimiento'])) {
    $usuario_id = $data['usuario_id'];
    $fecha_nacimiento = $data['fecha_nacimiento'];
    $direccion = $data['direccion'];
    $estado_civil = $data['estado_civil'];
    $fecha_ingreso = $data['fecha_ingreso'];
    $familiar_emergencia = $data['familiar_emergencia'];
    $relacion_familiar = $data['relacion_familiar'];
    $telefono_emergencia = $data['telefono_emergencia'];

    // Insertar el empleado en la base de datos
    $query = "INSERT INTO empleados (usuario_id, fecha_nacimiento, direccion, estado_civil, fecha_ingreso, familiar_emergencia, relacion_familiar, telefono_emergencia) 
              VALUES ('$usuario_id', '$fecha_nacimiento', '$direccion', '$estado_civil', '$fecha_ingreso', '$familiar_emergencia', '$relacion_familiar', '$telefono_emergencia')";

    if (mysqli_query($conexion, $query)) {
        echo json_encode(array("message" => "Empleado creado con éxito."));
    } else {
        echo json_encode(array("message" => "Error al crear el empleado.", "error" => mysqli_error($conexion)));
    }
} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);
?>
