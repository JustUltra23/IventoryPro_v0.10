<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$query = "SELECT e.*, u.nombre_usuario, u.nombre_completo, u.correo_electronico 
          FROM empleados e
          JOIN usuarios u ON e.usuario_id = u.id";

$result = mysqli_query($conexion, $query);

$empleados = [];

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $empleados[] = $row;
    }
}

echo json_encode($empleados);

mysqli_close($conexion);
?>
