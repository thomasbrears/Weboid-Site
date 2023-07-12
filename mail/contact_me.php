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
$from_browser = $_SERVER['HTTP_USER_AGENT'];
   
// Create the email and send the message
$to = 'hello@weboid.dev'; // Add your email address inbetween the '' replacing yourname@yourdomain.com - This is where the form will send a message to.
$email_subject = "New email from $name || Weboid Contact From";
$email_body = "New contact form message from $name \n\n Receved on " . date('d-m-Y') . "\n\n\n\n Message:\n ------------ \n Name: $name \n Email: $email_address \n Phone: $phone \n Message: $message \n\n\n\n $name sent this from the IP, " . $from_ip . " with the browser, " . $from_browser . " n\n\n\n Weboid Contact Form - www.weboid.dev - support@weboid.dev - 027 269 0900";
$headers = "From: system@weboid.dev\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";   
mail($to,$email_subject,$email_body,$headers);
return true;         
?>