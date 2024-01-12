<?php
	$username = $_POST['username'];
	$emailid = $_POST['emailid'];
	$password = $_POST['password'];
	$number = $_POST['number'];

	// Database connection
	$conn = new mysqli('salt-serpent-3676.7s5.cockroachlabs.cloud','Registration_user','26257','defaultdb');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into registration(username, emailid, password, number) values(?, ?, ?, ?)");
		$stmt->bind_param("sssi", $username, $emailid, $password, $number);
		$execval = $stmt->execute();    
		echo $execval;
		echo "Registration successfully...";
		$stmt->close();
		$conn->close();
	}
?>