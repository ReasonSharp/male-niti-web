<?php
$conf = include('/smtp-cli/smtp.php');

if (!array_key_exists('queryType', $_POST)
 || !array_key_exists('email', $_POST)
 || !array_key_exists('message', $_POST))
 header("Location: /kontakt.html");

$type = $_POST['queryType'];
$sndr = $_POST['email'];
$text = $_POST['message'];

if (string_isnullorwhitespace($type)
 || string_isnullorwhitespace($sndr)
 || string_isnullorwhitespace($text))
 header("Location: /kontakt.html");

$wsrv = $conf['websrv'];
$srvr = $conf['server'];
$from = $conf['user'];
$pass = $conf['pass'];
$to   = $conf['recv'];
$sig  = "-------------------\r\n$wsrv";

$body = "Hi!\r\n\r\nA visitor filled out a contact form on $wsrv. Here are the details they entered:\r\n\r\nType: $type\r\nSender: $sndr\r\nMessage text:\r\n$text\r\n\r\n$sig\r\n";

$mail_orig = "MIME_Version: 1.0\r\nContent-type: text/plain; charset=UTF-8\r\nFrom: $from\r\nTo: $to\r\nSubject: ($wsrv) Contact form was filled out\r\Reply-To: $sndr\r\n\r\n$body\r\n";

$file = fopen('/smtp-cli/message.txt', 'w') or header("Location: /fail.html");
fwrite($file, $mail_orig);
fclose($file);

$response = shell_exec("/smtp-cli/smtp-cli --server=$srvr --user $from --password $pass --from $from --to $to --data /smtp-cli/message.txt");

unlink('/smtp-cli/message.txt');

header("Location: /hvala.html");

function string_isnullorwhitespace($str){
 return ($str === null || trim($str) === '');
}
?>