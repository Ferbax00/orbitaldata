<?php

/**

 * Envío de contacto por correo (requiere hosting con PHP y función mail() o SMTP configurado).

 * Si no usas PHP, el sitio usará FormSubmit desde form.js automáticamente.

 */

header('Content-Type: text/plain; charset=UTF-8');

header('X-Content-Type-Options: nosniff');



if ($_SERVER['REQUEST_METHOD'] !== 'POST') {

    http_response_code(405);

    echo 'Método no permitido.';

    exit;

}



$destinatario = 'josfer38@gmail.com';

$asunto = 'ORBITALDATA — Enviado desde la web';



if (!empty($_POST['_gotcha'])) {

    http_response_code(400);

    echo 'Solicitud no válida.';

    exit;

}



$nombre = isset($_POST['nombre']) ? strip_tags(trim((string) $_POST['nombre'])) : '';

$email  = isset($_POST['email']) ? trim((string) $_POST['email']) : '';

$mensaje = isset($_POST['mensaje']) ? trim((string) $_POST['mensaje']) : '';



if ($nombre === '' || $mensaje === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {

    http_response_code(400);

    echo 'Datos incompletos o correo no válido.';

    exit;

}



$host = $_SERVER['HTTP_HOST'] ?? 'localhost';

$host = preg_replace('/^www\./i', '', $host);

$fromLocal = 'noreply@' . $host;



$contenido = "Nueva solicitud desde la web ORBITALDATA\r\n\r\n";

$contenido .= "Nombre / Razón social: {$nombre}\r\n";

$contenido .= "Email: {$email}\r\n\r\n";

$contenido .= "Requerimiento:\r\n{$mensaje}\r\n";



$headers = "MIME-Version: 1.0\r\n";

$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$headers .= 'From: ORBITALDATA Web <' . $fromLocal . ">\r\n";

$headers .= 'Reply-To: ' . $email . "\r\n";

$headers .= 'X-Mailer: PHP/' . phpversion() . "\r\n";



if (@mail($destinatario, $asunto, $contenido, $headers)) {

    http_response_code(200);

    echo 'Enviado.';

} else {

    http_response_code(500);

    echo 'No se pudo enviar el correo desde el servidor. Prueba más tarde o usa el envío alternativo del sitio.';

}

