<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->identificacion)) {
    $identificacion = $data->identificacion;

    // Verificar si el cliente ya existe en la base de datos
    $query_cliente = "SELECT id_cliente, nombre, celular, email FROM clientes WHERE num_identificacion = '$identificacion'";
    $resultado_cliente = mysqli_query($conexion, $query_cliente);

    if (mysqli_num_rows($resultado_cliente) > 0) {
        // Si el cliente existe, devolver los datos
        $cliente = mysqli_fetch_assoc($resultado_cliente);
        echo json_encode(array(
            "existe" => true,
            "cliente" => $cliente
        ));
    } else {
        // Si no existe, simplemente indicamos que no existe
        echo json_encode(array(
            "existe" => false,
            "message" => "Cliente no encontrado. Complete los datos para crear uno nuevo."
        ));
    }
} else {
    echo json_encode(array("message" => "Identificación no proporcionada."));
}

mysqli_close($conexion);
?>








