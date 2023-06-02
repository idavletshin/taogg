<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);

$mail->setFrom('taogg135cargo@gmail.com', 'TaoGG.RU');
$mail->addAddress('ll_vip@qq.ru');
$mail->Subject = 'Запрос на расчет стоимости перевозки груза';

$body = '';

if (!empty($_POST['info'])) {
    $body .= '<p><strong>Информация о грузе / вес:</strong> ' . $_POST['info'] . '</p>';
}
if (!empty($_POST['departure-address'])) {
    $body .= '<p><strong>Адрес отправления:</strong> ' . $_POST['departure-address'] . '</p>';
}
if (!empty($_POST['arrival-address'])) {
    $body .= '<p><strong>Адрес прибытия:</strong> ' . $_POST['arrival-address'] . '</p>';
}
if (!empty($_POST['email'])) {
    $body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
}
if (!empty($_POST['phone'])) {
    $body .= '<p><strong>WhatsApp или Telegram:</strong> ' . $_POST['phone'] . '</p>';
}
if (!empty($_POST['name'])) {
    $body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
}

$mail->Body = $body;

$response = [];

try {
    $mail->send();
    $response['message'] = 'Данные отправлены!';
} catch (Exception $e) {
    $response['message'] = 'Ошибка при отправлении формы: ' . $mail->ErrorInfo;
}

header('Content-type: application/json');
echo json_encode($response);
?>
