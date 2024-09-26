<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: PUT');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"), true);

if (isset($_GET['id']) && !empty($data)) {
    $id = $_GET['id'];

    // Verificar si todos los campos necesarios están presentes
    if (isset($data['usuario_id'])) {
        $usuario_id = $data['usuario_id'];
        $fecha_nacimiento = $data['fecha_nacimiento'];
        $direccion = $data['direccion'];
        $estado_civil = $data['estado_civil'];
        $fecha_ingreso = $data['fecha_ingreso'];
        $familiar_emergencia = $data['familiar_emergencia'];
        $relacion_familiar = $data['relacion_familiar'];
        $telefono_emergencia = $data['telefono_emergencia'];

        // Depuración para ver los datos antes de la consulta
        error_log("Actualizando empleado con ID: $id");
        error_log("Datos: " . print_r($data, true));

        $query = "UPDATE empleados SET 
                  usuario_id='$usuario_id', fecha_nacimiento='$fecha_nacimiento', direccion='$direccion', 
                  estado_civil='$estado_civil', fecha_ingreso='$fecha_ingreso', familiar_emergencia='$familiar_emergencia', 
                  relacion_familiar='$relacion_familiar', telefono_emergencia='$telefono_emergencia' 
                  WHERE id='$id'";

        if (mysqli_query($conexion, $query)) {
            echo json_encode(array("message" => "Empleado actualizado con éxito."));
        } else {
            echo json_encode(array("message" => "Error al actualizar el empleado.", "error" => mysqli_error($conexion)));
            error_log("Error en la consulta SQL: " . mysqli_error($conexion));
        }
    } else {
        echo json_encode(array("message" => "Datos incompletos."));
        error_log("Datos incompletos recibidos: " . print_r($data, true));
    }
} else {
    echo json_encode(array("message" => "ID no proporcionado o datos vacíos."));
    error_log("Error: ID no proporcionado o datos vacíos");
}

mysqli_close($conexion);

?>
