<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->identificacion) && isset($data->nombre) && isset($data->celular) && isset($data->email)) {
    $identificacion = $data->identificacion;
    $nombre = $data->nombre;
    $celular = $data->celular;
    $email = $data->email;

    // Crear cliente con datos completos
    $query_insert = "INSERT INTO clientes (num_identificacion, nombre, celular, email, ciudad_id) VALUES ('$identificacion', '$nombre', '$celular', '$email', 107)";
    if (mysqli_query($conexion, $query_insert)) {
        echo json_encode(array(
            "exito" => true,
            "message" => "Cliente creado exitosamente."
        ));
    } else {
        echo json_encode(array(
            "exito" => false,
            "message" => "Error al crear el cliente."
        ));
    }
} else {
    echo json_encode(array("message" => "Datos incompletos."));
}

mysqli_close($conexion);
?>
