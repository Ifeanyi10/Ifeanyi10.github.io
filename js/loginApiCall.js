$(document).ready(function () {

    //Login Provider
    $('#btnSignin').on('click', function(event){
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('pass').value;
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/authentication/login';


        // const data = JSON.stringify({
        //     "password": password.val(), 
        //     "username": username.val()
        //   })
          
        //   const xhr = new XMLHttpRequest()
        //   xhr.withCredentials = true
          
        //   xhr.addEventListener('readystatechange', function() {
        //     if (this.readyState === this.DONE) {
        //       console.log(this.responseText);
        //       //$.session.set('loginToken', result);
        //       //window.location.href = "index.html";
        //     }else{
        //         sweetAlert("Oops...","Invalid username or password!!","error");
        //     }
        //   })
          
        //   xhr.open('POST', url)
        //   xhr.setRequestHeader('content-type', 'application/json')
        //   xhr.setRequestHeader('accept', '*/*')
          
        //   xhr.send(data)

        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*'            
              },
            data: JSON.stringify({"password": password, "username": username}),
            success: function(result){
                //alert(result);
                //console.log(result);
                //set timeer (30 minutes) to disable the token 
                window.localStorage.setItem("token", result);
                //alert(window.localStorage.getItem("token"));
                window.location.href = "provider-dashboard.html";
            }, 
            error: function(msg){
                //$("#errorContainer").html("Incorrect Username or Password");
                sweetAlert("Oops...","Invalid username or password!!","error");
            }
        });
    });


 });