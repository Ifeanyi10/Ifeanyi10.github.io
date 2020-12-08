$(function () {
    $("#otherBox").click(function () {
        if ($(this).is(":checked")) {
            $("#otherDiv").show();
        } else {
            $("#otherDiv").hide();
        }
    });
});

function logout(){
    window.localStorage.removeItem("token");
}

function notEligibleAlert(){
    swal({title: "Oops...", text: "This patient is not ELIGIBLE!! This tool is only designed to help patients reduce and stop up to two BZRAs for insomnia.", type: "error"},
                function(){ 
                    window.location.href = "provider-dashboard.html";
                }
                );
}


function hideDispaly1() {
    var x = document.getElementById('firstQ');
    var y = document.getElementById('secondQ1');
    //var z = document.getElementById('trial1Demo');

    if (document.getElementById('prescYes').checked) {
        x.style.display = 'none';
        y.style.display = 'block';            
    } else if (document.getElementById('prescNo').checked){
        x.style.display = 'none';
        y.style.display = 'none';
        notEligibleAlert();
    }
}

function hideDispaly2() {
    var x = document.getElementById('secondQ1');
    var y = document.getElementById('thirdQ1');
    var z = document.getElementById('thirdQ2');

    if (document.getElementById('forSleepYes').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
        z.style.display = 'none';            
    } else if (document.getElementById('forSleepNo').checked){
        x.style.display = 'none';
        y.style.display = 'none';
        z.style.display = 'block'; 
    }
}

function hideDispaly3() {
    //Trial 1 Demography
    var x = document.getElementById('thirdQ2');
    var y = document.getElementById('trial1Demo');
    var t1M = document.getElementById('t1Male');
    var t1F = document.getElementById('t1Female');
    var t1O = document.getElementById('t1Other');

    if (document.getElementById('notForSleepNo').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
           
    } else if (document.getElementById('notForSleepYes').checked){
        x.style.display = 'none';
        notEligibleAlert();
    }
}

function hideDispaly4() {
    var x = document.getElementById('thirdQ1');
    var y = document.getElementById('fourthQ1');

    if (document.getElementById('good').checked || document.getElementById('good2').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
                   
    } else if (document.getElementById('bad').checked){
        x.style.display = 'none';
        notEligibleAlert();
    }
}

function hideDispaly5() {
    var x = document.getElementById('fourthQ1');
    var y = document.getElementById('fifthQ1');

    if (document.getElementById('willingYes').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
                   
    } else if (document.getElementById('willingNo').checked){
        x.style.display = 'none';
        notEligibleAlert();
    }
}


function hideDispaly6() {
    //Trial 2 Demography
    var x = document.getElementById('fifthQ1');
    var y = document.getElementById('trial2Demo');
    var t1M = document.getElementById('t2Male');
    var t1F = document.getElementById('t2Female');
    var t1O = document.getElementById('t2Other');

    if (document.getElementById('t2NotForSleepNo').checked) {
        x.style.display = 'none';
        y.style.display = 'block'; 
           
    } else if (document.getElementById('t2NotForSleepYes').checked){
        x.style.display = 'none';
        notEligibleAlert();
    }
}


function displaySreeen2() {
    var x = document.getElementById('screen1');
    var y = document.getElementById('screen2');

        y.style.display = 'block';         
        x.style.display = 'none';
}

function prpareScreen3(dispalyValue, otherDisplayValeu, medOptions){

    let drugs = ['Alprazolam', 'Bromazepam', 'Buspirone', 'Chlordiazepoxide',
    'Clonazepam', 'Clorazepate', 'Diazepam', 'Eszopiclone',
    'Flurazepam', 'Lorazepam', 'Nitrazepam', 'Oxazepam',
    'Temazepam', 'Triazolam', 'Zopiclone', 'Zolpidem'];

    var drugOptions = "<option value ="+dispalyValue+">"+dispalyValue+"</option>";

    for (i = 0; i < drugs.length; i++) { 
        if(drugs[i] != dispalyValue){
            if(drugs[i] != otherDisplayValeu){
                drugOptions += "<option value ="+drugs[i]+">"+drugs[i]+"</option>";
            }
        }       
    }
    document.getElementById(medOptions).innerHTML = drugOptions;

}

function validateStartDate(){
    var bt = document.getElementById('btnStartDate');
    var stDate = $("#mdate").val();
    if(stDate != '') {
        bt.disabled = false;
    } else {
        bt.disabled = true;
    }
  }

function validateMedCheck(){
    var btnMed = document.getElementById('btnMedSelect');
    var meds = document.forms['medForm'].elements['medCAT'];
    for (i = 0; i < meds.length; i++) {    
        if(meds[i].checked == true){
            btnMed.disabled = false;
            return
        }else{
            btnMed.disabled = true;
        }
    }
}

function validateLastSubmit(){
    var btnCog = document.getElementById('btnSubmitTrial2');
    var cognitive = document.getElementById('chkLast');
      
        if(cognitive.checked == true){
            btnCog.disabled = false;
            return
        }else{
            btnCog.disabled = true;
        }
}

function displaySreeen3() {
    var x = document.getElementById('screen2');
    var y = document.getElementById('screen3');
    var z = document.getElementById('med2');
    var meds = document.forms['medForm'].elements['medCAT'];
    var firstSelectedValue = ""; 
    var secondSelectedValue = "";
    var initialCount = 0;
    let drugOptions1 = "idMedications1";
    let drugOptions2 = "idMedications2";

    for (i = 0; i < meds.length; i++) {    
        if(meds[i].checked == true){
            if(initialCount < 2){
                if(initialCount == 0){
                    firstSelectedValue =  meds[i].value;
                } 
                if(initialCount == 1){
                    secondSelectedValue =  meds[i].value;
                }    
                initialCount += 1;                            
            }
        } 
    }

    if(firstSelectedValue != ""){
        prpareScreen3(firstSelectedValue, secondSelectedValue, drugOptions1)
    }
    if(secondSelectedValue != ""){
        prpareScreen3(secondSelectedValue, firstSelectedValue, drugOptions2)
        z.style.display = 'block';
    }

    y.style.display = 'block';  
    x.style.display = 'none';
}

function displaySreeen4() {
    var x = document.getElementById('screen3');
    var y = document.getElementById('screen4');

        y.style.display = 'block';         
        x.style.display = 'none';
}

function displaySreeen5() {
    var x = document.getElementById('screen4');
    var y = document.getElementById('screen5');

    document.getElementById('pName').innerHTML =  window.localStorage.getItem("patientName");

        y.style.display = 'block';         
        x.style.display = 'none';
}


$(document).ready(function () {

    //Reset 1
    $('#btnReset').on('click', function(event){
        event.preventDefault();
        var y = document.getElementById('screen4');
        y.style.display = 'none';
        displaySreeen3();
    });


 });


 function PrintDiv() {  
    var divContents = document.getElementById("printdivcontent").innerHTML;  
    var printWindow = window.open('', '', 'height=800,width=800');  
    printWindow.document.write('<html><head><title>Print Referral Code</title>');  
    printWindow.document.write('</head><body >');  
    printWindow.document.write(divContents);  
    printWindow.document.write('</body></html>');  
    printWindow.document.close();  
    printWindow.print();  
} 


