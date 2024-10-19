<?php
header('Access-Control-Allow-Origin: *');  // O usa el dominio específico si lo prefieres
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH', 'OPTIONS');  // Métodos permitidos
header('Content-Type: application/json; charset=UTF-8');

require("../conexion.php");

// Verificar si se pasó un ID en la solicitud
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $query = "SELECT * FROM roles WHERE id = $id";
    $result = mysqli_query($conexion, $query);

    if ($row = mysqli_fetch_assoc($result)) {
        echo json_encode($row);
    } else {
        echo json_encode(array("message" => "Rol no encontrado"));
    }
} else {
    // Consultar todos los roles y ordenarlos por ID de menor a mayor
    $query = "SELECT * FROM roles ORDER BY id ASC"; // Ordena por ID ascendente
    $result = mysqli_query($conexion, $query);
    $roles = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $roles[] = $row;
    }
    
    echo json_encode($roles);
}

mysqli_close($conexion);
?>

