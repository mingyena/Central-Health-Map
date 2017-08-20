 <?php

	// Handle Form Input
	$FirstName=$_POST['FirstName'];
	$LastName=$_POST['LastName'];
	$MiddleName=$_POST['MiddleName'];
	$MRN=$_POST['MRN'];
	$HomePhone=$_POST['HomePhone'];
	$EmailAddress=$_POST['EmailAddress'];
	$TravisCountyResident=$_POST['TravisCountyResident'];
	$FamilySizeChange=$_POST['FamilySizeChange'];
	$ObtainedHealthInsurance=$_POST['ObtainedHealthInsurance'];
	$PersonsWithHealthInsurance=$_POST['PersonsWithHealthInsurance'];
	$SameIncome=$_POST['SameIncome'];
	$ElectronicSignature=$_POST['ElectronicSignature'];
	$SignatureDate=$_POST['SignatureDate'];
	$version=$_POST['version'];
	$form_ver="";
	if($ObtainedHealthInsurance=="false"){
		$PersonsWithHealthInsurance="";
	}
	if($version=="English"){
	$form_ver="EL44-01 12/23/2014";
	}
	if($version=="Spanish"){
	$form_ver="EL44-02 12/23/2014";
	}
	
   /* if($FirstName==""||$LastName==""||$MRN==""||$TravisCountyResident=="false"||$FamilySizeChange=="true"||$ObtainedHealthInsurance=="true"||$SameIncome=="false"){
		if($FirstName==""||$LastName==""||$MRN==""){
		echo 2;
		}
		else{
		echo 3;
		}
	}*/
	//else{
	// Download the following rest library for PHP from here:
	// http://phphttpclient.com/#install

	// Place the file in the same location as your code
	// Point to where you downloaded the phar
	try{
	   include('httpful.phar');
	}
		catch (Exception $e) 
	{
		echo 'Error 1:';
		echo $e->getMessage();
	}
	
	// Set the base URL for Network Sciences MAP Renewal
	$baseuri = 'https://www.medicaider.com/CentralHealthMAP';
	// Append the relative URL for the operation we will be performing
	$uri = $baseuri.'/Api/V1/MAP/Renewal'; 

	//Create the JSON Object
	$arr = array(
		'FormVersion' =>$form_ver, 
		'MRN' => $MRN, 
		'FirstName' => $FirstName, 
		'MiddleName' => $MiddleName, 
		'LastName' => $LastName, 
		'HomePhone' => $HomePhone, 
		'EmailAddress' => $EmailAddress, 
		'TravisCountyResident' => $TravisCountyResident, 
		'FamilySizeChange' => $FamilySizeChange, 
		'ObtainedHealthInsurance' => $ObtainedHealthInsurance, 
		'PersonsWithHealthInsurance' => $PersonsWithHealthInsurance, 
		'SameIncome' => $SameIncome, 
		'ElectronicSignature' => $ElectronicSignature, 
		'SignatureDate' => $SignatureDate);

	$sampleJSON = json_encode($arr);


	//print $sampleJSON;

	// Set the username and password
	$username = 'chmaprenewalservice';
	$password = '%m%]!RybJBLu6^A';

	// Send the HTTP POST request
	
	set_error_handler(function($errno, $errstr, $errfile, $errline, array $errcontext) {
		// error was suppressed with the @-operator
			
		throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
	});

	try 
	{	
		//$ch = curl_init(); 
		//curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	
	    //echo "debug info:";
	    $response = \Httpful\Request::post($uri)                  // Build a PUT request...
						->sendsJson()                               // tell it we're sending (Content-Type) JSON...
						->strictSSL(false)
						->authenticateWith($username, $password)    // authenticate with basic auth...
						->body($sampleJSON)                         // attach a body/payload...
						->send();  

	$allResults = json_decode($response,true);
	print ($response);
	if( isset( $allResults['Renewed'] ) ){
	//cp
	$myfile = fopen("map_log.txt", "a") or die("Unable to open file!");
	$dt = new DateTime();
	fwrite($myfile, "\nNew Request: ".$dt->format('Y-m-d H:i:s')."\n");
	$txt = $sampleJSON;
	fwrite($myfile, "Raw Data:".$txt."\n");
	fwrite($myfile,"Version:".$version."\n");
	$txt = "response:\n".$response;
	fwrite($myfile, $txt);	
	}
	else{
	
	$to      = 'mapapp@vertex.com';
	$subject = 'Error from Central Health map Form';
	$message = "Error from http://www.medicalaccessprogram.net/renew/online-attestation-map-renewal/";
	$message .="\n".$response."\n";
	$message .="The error log location: \themes\map_error_log";
	$headers = 'From: webmaster@vertex.com' . "\r\n" .
       'Reply-To: webmaster@vertex.com';

	mail($to, $subject, $message, $headers);
	
	$myfile_error =fopen("map_error_log.txt", "a") or die("Unable to open file!");
	
	$dt = new DateTime();
	fwrite($myfile_error, "\nNew Request: ".$dt->format('Y-m-d H:i:s')."\n");
	$txt = $sampleJSON;
	fwrite($myfile_error, "Raw Data:".$txt."\n");
	fwrite($myfile_error,"Version:".$version."\n");
	$txt = "response:\n".$response;
	fwrite($myfile_error, $txt);
		
}	
	/*$myfile = fopen("map_log.txt", "a") or die("Unable to open file!");
	$dt = new DateTime();
	fwrite($myfile, "\nNew Request: ".$dt->format('Y-m-d H:i:s')."\n");
	$txt = $sampleJSON;
	fwrite($myfile, "Raw Data:".$txt."\n");
	fwrite($myfile,"Version:".$version."\n");

	$txt = "response:\n".$response;
	fwrite($myfile, $txt);*/

				
	} 
	catch (Exception $e) 
	{
		echo 'Error:';
		echo $e->getMessage();
		
	$txt = "exception:\n".$e->getMessage();
	fwrite($myfile_error, $txt);		
		
	}
	
		fclose($myfile);	

	//}
		
?>