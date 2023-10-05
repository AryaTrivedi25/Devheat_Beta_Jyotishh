//code to prevent submit button to refresh the page
if (document.querySelector('.sign')) {
    document.querySelector('.sign').addEventListener('click',
        function (event) {
            event.preventDefault();
        });
}

//function to make post request with signup data
async function onPost(){

    let email = document.querySelector("#email").value;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    user = {
        email : email,
        username: username,
        password: password
    }

    //post request
    let response = await fetch("http://localhost:3000/user/signup",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    let result = await response.json();

    //redirecting user on successfull user creation
    if (result.redirectTo) {
        window.location.href = result.redirectTo;
    }

    //alerting user as a user already exists
    if (result.alert) {
        window.alert(message);
    }

}