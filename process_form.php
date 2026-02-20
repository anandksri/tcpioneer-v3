<?php
// Show errors (for debugging; disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
set_time_limit(300);

// DB credentials
$servername = "mysql.hostinger.com";
$username = "u186727847_tcpioneer";
$password = "HOSTINger@%^asdf12";
$dbname = "u186727847_tcpioneer";

// Connect
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Only process if POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    // Honeypot check (bot trap)
    if (!empty($_POST['bot_check'])) {
        die("Bot detected.");
    }

    // Collect and sanitize input
    $fullName = trim(strip_tags($_POST['fullName'] ?? ''));
    $email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
    $phone = preg_replace('/[^0-9+]/', '', $_POST['phone'] ?? '');
    $message = trim(strip_tags($_POST['message'] ?? ''));
    $countryCode = $_POST['countryCode'] ?? '';
    $fullPhone = $countryCode . $phone;

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>
                alert('Invalid email address. Please enter a valid one.');
                window.history.back();
              </script>";
        exit;
    }

    // Optional: Check required fields
    if (empty($fullName) || empty($email) || empty($phone) || empty($message)) {
        echo "<script>
                alert('Please fill out all required fields.');
                window.history.back();
              </script>";
        exit;
    }

    // Insert using prepared statement
    $stmt = $conn->prepare("INSERT INTO join_requests (full_name, email, phone, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $fullName, $email, $fullPhone, $message);

    if ($stmt->execute()) {
        echo "<script>
                alert('Thank you for sending the request! We will contact you soon.');
                window.location.href = 'joinus.html';
              </script>";
    } else {
        echo "<script>
                alert('Server error. Please try again later.');
                window.location.href = 'joinus.html';
              </script>";
    }

    $stmt->close();
    $conn->close();
} else {
    // If someone tries to access this without a POST request
    echo "Invalid request.";
}
?>
