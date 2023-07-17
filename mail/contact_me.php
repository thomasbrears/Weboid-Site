<?php
// Check for empty fields
if(empty($_POST['name'])      ||
   empty($_POST['email'])     ||
   empty($_POST['phone'])     ||
   empty($_POST['message'])   ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
   echo "No arguments Provided!";
   return false;
   }
   
$name = strip_tags(htmlspecialchars($_POST['name']));
$email_address = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));
$from_ip = $_SERVER['REMOTE_ADDR'];
   
// Create the email and send the message
$to = 'support@weboid.dev';
$email_subject = "New contact submission from $name";
$email_body = "New contact form message from $name \n\n\n Message:\n ------------ \n Name: $name \n Email: $email_address \n Phone: $phone \n Message: $message \n\n\n\n $name sent this on " . date('d-m-Y') .", from the IP " . $from_ip . " n\n\n\n Weboid Contact Form - weboid.dev - support@weboid.dev - +6427 269 0900";
$headers = "From: $email_address\n"; 
$headers .= "Reply-To: $email_address";   
mail($to,$email_subject,$email_body,$headers);
return true;         
?>