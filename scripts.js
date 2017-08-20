// (function ($, root, undefined) {
	
// 	$(function () {
		
// 		'use strict';
		
// 		// DOM ready, take it away
		
// 	});
	
// })(jQuery, this);

// [JJ - 07/22/14] Stupid WordPress takes away the jQuery shortcut variable "$" so we're taking it back!!!
var $ = jQuery.noConflict();

//RL - 2/4/2016, call ajax online renew form
jQuery(document).ready(function() {
$('div.PersonsWithHealthInsurance-wrap').hide();
$('input.SignatureDate').attr("disabled", "disabled");
$('input.ObtainedHealthInsurance').click(function(){
	if($(this).val()=="true"){
	$('div.PersonsWithHealthInsurance-wrap').show();
	$('div.ninja-forms-field-description').hide();
	}
	else{
	$('div.PersonsWithHealthInsurance-wrap').hide();
	$('div.ninja-forms-field-description').hide();
	}
});

if((location.pathname)=="/atencion-medica/sitios-pharmacy/"){
	//alert("test");
	$("select#addressInput2 option:first").replaceWith('<option value="">-–Búsqueda por ciudad–-</option>');
	$("input#addressSubmit").replaceWith('<input type="image" src="/wp-content/uploads/sl-uploads/images/search_button_es.png" onmousedown="this.src=\'/wp-content/uploads/sl-uploads/images/search_button_down_es.png\'" onmouseup="this.src=\'/wp-content/uploads/sl-uploads/images/search_button_es.png\'" onmouseover="this.src=\'/wp-content/uploads/sl-uploads/images/search_button_over_es.png\'" onmouseout="this.src=\'/wp-content/uploads/sl-uploads/images/search_button_es.png\'" onclick="showLoadImg(\'show\', \'loadImg\');" value="Search Locations" id="addressSubmit">')
	$(".text_below_map").replaceWith("<div class='text_below_map'>Ingrese su Dirección o Código Postal Anterior.</div>");
	}
	var FirstName=$('input.firstName').val();
	var LastName=$('input.lastname').val();
	var MiddleName=$('input.middlename').val();
	var MRN=$('input.MRN').val();
	var recordFlag=false;
	var counter=0;

//jQuery(document).on('submitResponse.example', function( e, response ){
$( '.ninja-forms-form' ).on( 'submitResponse', function( e, response ) {	
	//$('form#ninja_forms_form_6 .ninja-forms-field-error .requiredField').replaceWith('<font color="red" class="requiredField" style="float:left">Este es un campo obligatorio</font>');
	
	FirstName=$('input.firstName').val();
	LastName=$('input.lastname').val();
	var lastnameLen=LastName.length;
	MiddleName=$('input.middlename').val();
	MRN=$('input.MRN').val();
	if(FirstName.length==0||LastName.length==0||MRN.length==0){
		counter++;
		if(counter==1){
		if(response['form_id']==3){
		
		//$('#ninja_forms_form_3_cont').append("<p>The information you entered does not match our records. You must enter your name and <strong>MR#</strong> exactly as it appears on your MAP card. </p>");
		if(recordFlag==false){
		//$( "<p style='color:red'>The information you entered does not match our records. You must enter your name and <strong>MR#</strong> exactly as it appears on your MAP card. </p>" ).insertBefore( $( "" ) );
		$( ".ninja-forms-form-wrap" ).prepend( "<p style='color:red' class='MR_error'>The information you entered does not match our records. You must enter your name and <strong>MR#</strong> exactly as it appears on your MAP card. </p>" );
		recordFlag=true;		
		}
		}
		if(response['form_id']==6){
		if(recordFlag==false){
		//$( "<p style='color:red'>La información que ha introducido no coincide con nuestros registros. Debe introducir su nombre y número de record (<strong>MR</strong>#) exactamente como aparece en su tarjeta de MAP.</p>" ).insertBefore( $( ".ninja-forms-form-wrap" ) );
		$( ".ninja-forms-form-wrap" ).prepend( "<p style='color:red' class='MR_error'>La información que ha introducido no coincide con nuestros registros. Debe introducir su nombre y número de record (<strong>MR</strong>#) exactamente como aparece en su tarjeta de MAP.</p>" );
		recordFlag=true;		
		}
		}
		}
		else{
		counter--;
		}
	}
	
	//$('input.submit_renew_form').click(function(e){	
	FirstName=$('input.firstName').val();
	LastName=$('input.lastname').val();
	var lastnameLen=LastName.length;
	MiddleName=$('input.middlename').val();
	MRN=$('input.MRN').val();
	//console.log("here");
	//console.log(FirstName);
	//console.log(LastName);
	//console.log(MRN);
	if(FirstName.length==0||LastName.length==0||MRN.length==0){
	//console.log(counter);
	counter++;
	if(response['form_id']==3){
		
		//$('#ninja_forms_form_3_cont').append("<p>The information you entered does not match our records. You must enter your name and <strong>MR#</strong> exactly as it appears on your MAP card. </p>");
		if(recordFlag==false){
		$( "<p style='color:red' class='MR_error'>The information you entered does not match our records. You must enter your name and <strong>MR#</strong> exactly as it appears on your MAP card. </p>" ).insertBefore( $( ".online_map_renewal" ) );
		recordFlag=true;		
		}
		}
	if(response['form_id']==6){
		if(recordFlag==false){
		$( "<p style='color:red' class='MR_error'>La información que ha introducido no coincide con nuestros registros. Debe introducir su nombre y número de record (<strong>MR</strong>#) exactamente como aparece en su tarjeta de MAP.</p>" ).insertBefore( $( ".online_map_renewal" ) );
		recordFlag=true;		
		}
		}
		//console.log(counter);
		if(counter>3){
		 counter=0;
		 $('.ninja-forms-form-wrap').remove();
		 if(response['form_id']==3){
			$('#ninja_forms_form_3_cont').append("<p>You have exceeded the number of log in attempts allowed.  Please call 512-978-8130 to talk to one of our team members and to make an in person appointment.</p>");	
		 }
		 if(response['form_id']==6){
			$('#ninja_forms_form_6_cont').append("<p>Ha excedido el número de intentos de inicio de sesión permitidos. Por favor llame al 512-978-8130 para hablar con uno de nuestros representantes y programar una cita de elegibilidad en persona.</p>");	

		 }
		}
		

	e.preventDefault();
	}
	else{
		$('p.MR_error').remove();
	}
	if(($('input[name=ninja_forms_field_50]:checked').val())=="true"){
		if($('input.PersonsWithHealthInsurance').val()==""){
			$('div.ninja-forms-field-description').show();
			e.preventDefault();
		}
	}
	
	if ( response.errors == false ) {
		//console.log("test");
		if(response['form_id']==3||response['form_id']==6){
			if(response['form_id']==3){
			var version="English";
			}
			if(response['form_id']==6){
			var version="Spanish";
			}
			var TravisCountyResident=$('input.TravisCountyResident:checked').val();
			var FamilySizeChange=$('input.FamilySizeChange:checked').val();
			var ObtainedHealthInsurance=$('input.ObtainedHealthInsurance:checked').val();
			var SameIncome=$('input.SameIncome:checked').val();
			var data = {
			FirstName:$('input.firstName').val(),
			LastName:$('input.lastname').val(),
			MiddleName:$('input.middlename').val(),
			MRN:$('input.MRN').val(),
			HomePhone:$('input.HomePhone').val(),
			EmailAddress:$('input.EmailAddress').val(),
			TravisCountyResident:TravisCountyResident,
			FamilySizeChange:FamilySizeChange,
			ObtainedHealthInsurance:ObtainedHealthInsurance,
			PersonsWithHealthInsurance:$('input.PersonsWithHealthInsurance').val(),
			SameIncome:SameIncome,
			ElectronicSignature:$('input.ElectronicSignature').val(),
			SignatureDate:$('input.SignatureDate').val(),
			version:version
		};
	//console.log(FirstName);
		$.ajax({
			type:		'POST',
			url:		'/wp-content/themes/ch_map_2015/ch-map-api-ajax.php',
			data:		data,
			success:	function( code ) {
				//console.log(data);
				//console.log(code);
				var renewMessage=jQuery.parseJSON(code);
				//console.log("test");
				//console.log(renewMessage);
				//var message=renewMessage.Message;
				$('.ninja-forms-form-wrap').remove();
				//$('#ninja_forms_form_3_cont').append("<p>"+message+"</p>");
				//console.log(renewMessage.Message);
				//console.log(code);
				//var renewMessage=jQuery.parseJSON(code);
				var Renewed=renewMessage.Renewed;
				//console.log(Renewed);
				/*if(TravisCountyResident=="false"||FamilySizeChange=="true"||ObtainedHealthInsurance=="true"||SameIncome=="false"){
				$('.ninja-forms-form-wrap').remove();
				if(response['form_id']==3){
					$('#ninja_forms_form_3_cont').append("<p>Based on your answers, you are not eligible to renew online, please call 512-978-8130 to talk to one of our team members and to make an in person appointment.</p>");
					}
				if(response['form_id']==6){
					$('#ninja_forms_form_6_cont').append("<p>Basado en sus respuestas, usted no es elegible para renovar en línea. Por favor llame al 512-978-8130 para hablar con uno de nuestros representantes y programar una cita en persona.</p>");
					}
				return false;
				}*/
				if(Renewed==true){
				//console.log(Renewed);
				if(response['form_id']==3){
				$('#ninja_forms_form_3_cont').append("<p>Thank you for submitting your attestation, your household’s MAP coverage has been renewed. The new MAP card (s) will be mailed to your address in 3-5 business days, if you have any questions please call 512-978-8130.</p>");
				}
				if(response['form_id']==6){
				$('#ninja_forms_form_6_cont').append("<p>Gracias por enviar su atestación, la cobertura de MAP de su hogar ha sido renovada. La tarjeta(s) nueva de MAP será enviada por correo a su dirección dentro de 3 a 5 días laborales. Si tiene alguna pregunta por favor llame al 512-978-8130.</p>");
				}
				}
				if(Renewed==false){
				//console.log(Renewed);
				if(response['form_id']==3){
				//console.log("here");
				//console.log(SameIncome);
				//console.log(TravisCountyResident);
				
				 if(TravisCountyResident=="false"||FamilySizeChange=="true"||ObtainedHealthInsurance=="true"||SameIncome=="false")
					{
					$('#ninja_forms_form_3_cont').append("<p>Based on your answers, you are not eligible to renew online, please call 512-978-8130 to talk to one of our team members and to make an in person appointment.</p>");
					}
				 else{
					$('#ninja_forms_form_3_cont').append("<p>You do not meet the criteria to renew your MAP coverage online, please call 512-978-8130 to talk to one of our team members and to make an in person appointment.</p>");
					}
				}
				if(response['form_id']==6){
					if(TravisCountyResident=="false"||FamilySizeChange=="true"||ObtainedHealthInsurance=="true"||SameIncome=="false")
					{
					$('#ninja_forms_form_6_cont').append("<p>Basado en sus respuestas, usted no es elegible para renovar en línea. Por favor llame al 512-978-8130 para hablar con uno de nuestros representantes y programar una cita en persona.</p>");
					}
					else{
					$('#ninja_forms_form_6_cont').append("<p>Usted no cumple con los requisitos para renovar su cobertura de MAP en línea, por favor llame al 512-978-8130 para hablar con uno de nuestros representantes y programar una cita de elegibilidad en persona.</p>");
					}
				}
				}
				
				
				
			}
		
		});
			
			
			
		}		
		}
	//});
		return true;
});
});



