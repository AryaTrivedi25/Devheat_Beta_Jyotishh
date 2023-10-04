async function getToken() {

    

    let username = document.querySelector(".username");
    let password = document.querySelector(".password");

    let user = {
        username: username.innerText,
        password: password.innerText
    }

    let response = await fetch("/user/signin", {
        method: 'POST',
        headers: {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        }
    });

    if (response.ok) {
        let json = await response.json();

        sessionStorage.setItem("key", json.token);

    } else {
        alert("HTTP-Error: " + response.status);
    }
}

async function sendToken(url) {
    
    let token = sessionStorage.getItem("token");

    let response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }); 

    if (response.ok) {
        console.log(response.status);

    } else {
        alert("HTTP-Error: " + response.status);
    }
}