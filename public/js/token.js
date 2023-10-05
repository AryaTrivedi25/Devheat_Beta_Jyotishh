
if (document.querySelector('.sign')) {
    document.querySelector('.sign').addEventListener('click',
        function (event) {
            event.preventDefault();
        });

}


async function getToken() {

    let username = document.querySelector("#username");
    let password = document.querySelector("#password");

    let user = {
        username: username.value,
        password: password.value
    }

    console.log(JSON.stringify(user));

    let response = await fetch("http://localhost:3000/user/signin", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    let result = await response.json();

    let token = result.token;
    sessionStorage.setItem("token", token);

    if (result.redirectTo) {
        window.location.href = result.redirectTo;
    }
}

async function sendToken(url) {

    token = sessionStorage.getItem("token");
    console.log(token);

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    let result = await response.json();

    if (result.redirectTo) {
        window.location.href = result.redirectTo;
    }

    if (result.status) {
        window.alert("added to favourites succesfully!!")
    }

    if (result.profile) {
        document.querySelector("#username").value = result.username;
        document.querySelector("#form").submit();
    }
}
