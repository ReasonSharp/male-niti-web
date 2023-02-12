<?php
$conf = include('/smtp-cli/smtp.php');

$type = $_POST['queryType'];
$sndr = $_POST['email'];
$text = $_POST['message'];

$wsrv = $conf['websrv'];
$srvr = $conf['server'];
$from = $conf['user'];
$pass = $conf['pass'];
$to   = $conf['recv'];
$sig  = "-------------------\r\n$wsrv";

$body = "Hi!\r\n\r\nA visitor filled out a contact form on $wsrv. Here are the details they entered:\r\n\r\nType: $type\r\nSender: $sndr\r\nMessage text:\r\n$text\r\n\r\n$sig\r\n";

$mail_orig = "MIME_Version: 1.0\r\nContent-type: text/plain\r\nFrom: $from\r\nTo: $to\r\nSubject: ($wsrv) Contact form was filled out\r\nReturn-Path: $from\r\n\r\n$body\r\n";

$file = fopen('/smtp-cli/message.txt', 'w') or die(file_get_contents("fail.html"));
fwrite($file, $mail_orig);
fclose($file);

$response = shell_exec("/smtp-cli/smtp-cli --server=$srvr --user $from --password $pass --from $from --to $to --data /smtp-cli/message.txt");

unlink('/smtp-cli/message.txt');

echo file_get_contents("hvala.html");
?>