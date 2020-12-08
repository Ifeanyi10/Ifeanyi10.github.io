function validatePassword(){
    var bt = document.getElementById('btnSubmit');
    var password = $("#pass").val();
    var confirm_password = $("#confirmPass").val();
    if(password != confirm_password) {
        $("#divCheckPasswordMatch").html("Passwords do not match!");
    } else {
        $("#divCheckPasswordMatch").html(" ");
        bt.disabled = false;
    }
  }

  function fillAllFields(){
    var bt = document.getElementById('btnSubmit');
    var conPass = document.getElementById('confirmPass');
    var fName = $("#firstN").val();
    var lName = $("#lastN").val();
    var prov = $("#inputProvince").val();
    var em = $("#email").val();
    var ph = $("#phone").val();
    var usN = $("#usName").val();
    var ps = $("#pass").val();
    if (fName != '' && lName != '' && prov != '' && em != '' && ph != '' && usN != '' && ps != '')  {
        conPass.disabled = false;
        $("#confirmPass").keyup(validatePassword);
    } else {
        conPass.disabled = true;
        bt.disabled = true;
    }
}

  $(document).ready(function () {
    var bt = document.getElementById('btnSubmit');
    bt.disabled = true;
    $('#firstN, #lastN, #inputProvince, #email, #phone, #usName, #pass').keyup(fillAllFields);
    
 });

 

function getHowYouHearAboutUs() {
    var abouts = document.forms['regForm'].elements['abt'];
    var aboutInfos = ""; 

    for (i = 0; i < abouts.length; i++) {    
        if(abouts[i].checked == true){        
            aboutInfos +=  abouts[i].value + ",";               
        } 
    }
    return aboutInfos;
}



//  document.addEventListener("DOMContentLoaded", function(event) {
//     document.getElementById("btnSignin").disabled = true;
    
//   });


// let fetchBtn = document.getElementById("btnSignin"); 
  
  
//     fetchBtn.addEventListener("click", buttonclickhandler); 
  
//     function buttonclickhandler(event) { 
//         event.preventDefault();
//         // Instantiate an new XHR Object 
//         const xhr = new XMLHttpRequest(); 
  
//         // Open an obejct (GET/POST, PATH, 
//         // ASYN-TRUE/FALSE) 
//         xhr.open("GET",  "http://dummy.restapiexample.com/api/v1/employees", true); 
  
//         // When response is ready 
//         xhr.onload = function () { 
//             if (this.status === 200) { 
  
//                 // Changing string data into JSON Object 
//                 obj = JSON.parse(this.responseText); 
  
//                 // Getting the ul element 
//                 let list = document.getElementById("list"); 
//                 str = ""
//                 for (key in obj.data) { 
//                     str += `<li>${obj.data[key].employee_name}</li>`; 
//                 } 
//                 list.innerHTML = str; 
//             } 
//             else { 
//                 console.log("File not found"); 
//             } 
//         } 
  
//         // At last send the request 
//         xhr.send(); 
//     } 


    $(document).ready(function () {


    //Register Provider
    $('#btnSubmit').on('click', function(event){
        event.preventDefault();
        
        var firstName = document.getElementById("firstN").value;
        var lastName = document.getElementById("lastN").value;
        var provName = firstName + " " + lastName;
        var province = document.getElementById("inputProvince").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var mailAddress = document.getElementById("mailAdd").value;
        var username = document.getElementById("usName").value;
        var password = document.getElementById("pass").value;
        var aboutUs= getHowYouHearAboutUs();
        var otherMeans = document.getElementById("otherField");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/provider/create';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*'
              },
            data: JSON.stringify({"email": email, "howyouheardaboutUse": aboutUs,
                "mailingAddress": mailAddress, "name": provName, "password": password, "phonenumber": phone, 
                "province": province, "username": username}),
            success: function(result){
                console.log(result);
                swal({title: "Health ensuite welcomes you!!", text: "Your account has been created successfully. An activation link has been sent to your email address!!", type: "success"},
                function(){ 
                    window.location.href = "index.html";
                }
                );
            }, 
            error: function(msg){
                $("#errorContainer").html("Unable to register");
                sweetAlert("Oops...","Account creation failed!!","error");
            }
        });
    });


 });



