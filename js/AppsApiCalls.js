 //insomnia trial 1 gender
 function getTrial1Gender(elementName) {
    var genderInfo = document.forms['formInsomnia'].elements[elementName];
    var gender = ""; 

    for (i = 0; i < genderInfo.length; i++) {    
        if(genderInfo[i].checked == true){        
            gender =  genderInfo[i].value;               
        } 
    }
    return gender;
}

function fillAllFields(){
    var bt = document.getElementById('btnTrial1');
    var fName = $("#patFName").val();
    var lName = $("#patLName").val();
    var ag = $("#patAge").val();
    var em = $("#patEmail").val();
    if (fName != '' && lName != '' && ag != '' && em != '')  {
        bt.disabled = false;
    } else {
        bt.disabled = true;
    }
}

function fillAllFields2(){
    var bt = document.getElementById('btnTrial2');
    var fName = $("#pat2FName").val();
    var lName = $("#pat2LName").val();
    var ag = $("#pat2Age").val();
    var em = $("#pat2Email").val();
    if (fName != '' && lName != '' && ag != '' && em != '')  {
        bt.disabled = false;
    } else {
        bt.disabled = true;
    }
}

function fillBasicMedicationFields(){
    var bt = document.getElementById('btnMedication');
    var ds2 = document.getElementById('dosage2');
    var med2 = document.getElementById("idMedications2").value;
    var meds = $("#idMedications1").val();
    var dose = $("#dosage").val();
    var duration = $("#inputDuration").val();
    
    if (meds != '' && dose != '' && duration != '')  {
        ds2.disabled = false;
        if(med2 == ''){bt.disabled = false;
        }else{$('#idMedications2, #dosage2').keyup(fillBasicMedicationFields2);}
        
    } else {
        ds2.disabled = true;
        bt.disabled = true;
    }
}

function fillBasicMedicationFields2(){
    var bt = document.getElementById('btnMedication');
    bt.disabled = true;
    var meds = $("#idMedications2").val();
    var dose = $("#dosage2").val();
    var duration = $("#inputDuration2").val();
    
    if (meds != '' && dose != '' && duration != '')  {
        bt.disabled = false;
    } else {
        //alert(duration);
        bt.disabled = true;
    }
}


function getConceptID(selecteValue){

    let drugs = ['Alprazolam', 'Bromazepam', 'Buspirone', 'Chlordiazepoxide',
    'Clonazepam', 'Clorazepate', 'Diazepam', 'Eszopiclone',
    'Flurazepam', 'Lorazepam', 'Nitrazepam', 'Oxazepam',
    'Temazepam', 'Triazolam', 'Zopiclone', 'Zolpidem'];

    let conceptId = 0;

    for (i = 0; i < drugs.length; i++) { 
        if(drugs[i] == selecteValue){
            conceptId = i + 1;
            return conceptId;
        }       
    }
    return conceptId;
}



$(document).ready(function () {

    var btT1 = document.getElementById('btnTrial1');
    btT1.disabled = true;
    $('#patFName, #patLName, #patAge, #patEmail').keyup(fillAllFields);

    var btT2 = document.getElementById('btnTrial2');
    btT2.disabled = true;
    $('#pat2FName, #pat2LName, #pat2Age, #pat2Email').keyup(fillAllFields2);

    var btMed = document.getElementById('btnMedication');
    btMed.disabled = true;
    $('#idMedications1, #dosage').keyup(fillBasicMedicationFields);

    //Trial 1
    $('#btnTrial1').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("patFName").value;
        var lastName = document.getElementById("patLName").value;
        var age = document.getElementById("patAge").value;
        var email = document.getElementById("patEmail").value;
        var gender= getTrial1Gender("optradio5");

        var x = document.getElementById("trial1Demo");
        var y = document.getElementById("printSample");
        var z = document.getElementById("elligHead");
        //alert(gender);
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/create';  
        //window.localStorage.setItem("token", "7BCcz0Duefx7ioF/20us6aKso5voeaPBgn0L+siY+lM=");
        let authToken = window.localStorage.getItem("token");
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
              },
            data: JSON.stringify({"firstName": firstName, "lastName": lastName, "age": age, "gender": gender, "emailAddress" : email, 
            "trialType" : 1 }),
            success: function(result){

                console.log(result);
                // $(result).each(function(i, ref){
                //     refCode.value = ref.referalCode;
                //     usName.value = ref.userName;
                //     ps.value = ref.password;
                // });
                document.getElementById('refCode').innerHTML = result.referalCode;
                document.getElementById('usName').innerHTML = result.userName;
                document.getElementById('ps').innerHTML= result.password;
                swal({title: "Patient Recommended Successfully!!", text: "Referral code sent via email. App Type: Trial 1", type: "success"},
                function(){ 
                    //window.location.href = "provider-dashboard.html";
                    y.style.display = 'block';         
                    x.style.display = 'none';
                    z.style.display = 'none';
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to submit patient's record");;
                document.getElementById('refCode').innerHTML = "1-3-2-2020-21-06";
                document.getElementById('usName').innerHTML = "paul1843";
                document.getElementById('ps').innerHTML = "steve12";
                    y.style.display = 'block';         
                    x.style.display = 'none';
                    z.style.display = 'none';
            }
        });
    });


    //Trial 2
    $('#btnTrial2').on('click', function(event){
        event.preventDefault();
        var firstName = document.getElementById("pat2FName").value;
        var lastName = document.getElementById("pat2LName").value;
        var age = document.getElementById("pat2Age").value;
        var email = document.getElementById("pat2Email").value;
        var gender= getTrial1Gender("optradio21");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/create';
        let authToken = window.localStorage.getItem("token");
        var x = document.getElementById('screen1');
        var y = document.getElementById('screen2');
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*',
                'Authorization': 'Bearer '+ authToken
              },
            data: JSON.stringify({"age": age, "emailAddress": email, "firstName": firstName, "gender": gender, "lastName": lastName,
            "trialType" : 2 }),
            success: function(result){
                console.log(result);
                window.localStorage.setItem("patientName", firstName+" "+lastName);
                y.style.display = 'block';         
                x.style.display = 'none';
            }, 
            error: function(msg){
                $("#errorContainer2").html("Unable to submit patient's record");
                window.localStorage.setItem("patientName", "Ifeanyi Paul");
                
                y.style.display = 'block';         
                x.style.display = 'none';
            }
        });
    });


    //Tapering Generation
    $('#btnMedication').on('click', function(event){
        event.preventDefault();
        var med1 = document.getElementById("idMedications1").value;
        var dosage = document.getElementById("dosage").value;
        var duration = document.getElementById("inputDuration").value;
        var med2 = document.getElementById("idMedications2").value;
        var dosage2 = document.getElementById("dosage2").value;
        var duration2 = document.getElementById("inputDuration2").value;
        let conceptId1 = getConceptID(med1);
        
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/taper/create';
        let authToken = window.localStorage.getItem("token");
        var x = document.getElementById('screen3');
        var y = document.getElementById('screen4');
        var tableBody = '#taperTBody';
        var secondTB = document.getElementById('secondTB');

        if(med2 != ''){
            let conceptId2 = getConceptID(med2);
            //var secondTB = document.getElementById('secondTB');
            //var tableBody = '#taperTBody';
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*'
                    //'Authorization': 'Bearer '+ authToken
                  },
                data: JSON.stringify({"regimenDTOList":
                [{
                "sleepMedication" : med1,
                "currentDose" : dosage,
                "medicationDuration" : duration,
                "conceptID" : conceptId1
                },
                {
                "sleepMedication" : med2,
                "currentDose" : dosage2,
                "medicationDuration" : duration2,
                "conceptID" : conceptId2
                }]
            }),
                success: function(result){
                    console.log(result);
                    var drugName = '';
                    
                    $(result).each(function(i, taper){
                        drugName = taper.drugName;
                        $(taper.weeklyDose).each(function(i, def){
                            $(tableBody).append($("<tr>")
                            .append($("<td>").append(i + 1))
                            .append($("<td>").append("Week "+ def.week))
                            .append($("<td>").append(drugName))
                            .append($("<td>").append(def.unrounded))
                            .append($("<td>").append(def.newDose))
                            .append($("<td>").append(def.dose_Combination)));
                        });
                        tableBody = '#taperTBody2';
                    });

                    y.style.display = 'block';         
                    x.style.display = 'none';
                }, 
                error: function(msg){
                    $("#errorContainer3").html("Unable to generate Taper Schedule for the two medications");
                    $(tableBody).append($("<tr>")
                    .append($("<td>").append(1))
                    .append($("<td>").append("Week 1"))
                    .append($("<td>").append("DrugName"))
                    .append($("<td>").append("8.5"))
                    .append($("<td>").append("5"))
                    .append($("<td>").append("5 X 1")));

                    tableBody = '#taperTBody2';
                    $(tableBody).append($("<tr>")
                    .append($("<td>").append(1))
                    .append($("<td>").append("Week 1"))
                    .append($("<td>").append("DrugName"))
                    .append($("<td>").append("8.5"))
                    .append($("<td>").append("5"))
                    .append($("<td>").append("5 X 1")));
                    y.style.display = 'block';         
                    x.style.display = 'none';
                    secondTB.style.display = 'block';
                }
            });
        }else{
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*'
                    //'Authorization': 'Bearer '+ authToken
                  },
                data: JSON.stringify({"regimenDTOList":
                [{
                    "sleepMedication" : med1,
                    "currentDose" : dosage,
                    "medicationDuration" : duration,
                    "conceptID" : conceptId1
                }]
            }),
                success: function(result){
                    console.log(result);
                    y.style.display = 'block';         
                    x.style.display = 'none';
                }, 
                error: function(msg){
                    $("#errorContainer3").html("Unable to generate Taper Schedule for the medication");
                    $(tableBody).append($("<tr>")
                    .append($("<td>").append(1))
                    .append($("<td>").append("Week 1"))
                    .append($("<td>").append("DrugName"))
                    .append($("<td>").append("8.5"))
                    .append($("<td>").append("5"))
                    .append($("<td>").append("5 X 1")));
                    y.style.display = 'block';  
                    secondTB.style.display = 'none';       
                    x.style.display = 'none';
                }
            });
        }

        
    });



 });