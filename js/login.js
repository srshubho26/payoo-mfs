window.onload = ()=>{
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if(isLoggedIn){
        window.location.href = "index.html";
    }
}

document.getElementById("login-form").addEventListener("submit", function(event){
    event.preventDefault();

    const phoneNumber = parseInt(document.getElementById("phone-number").value);
    const pinNumber = parseInt(document.getElementById("pin-number").value);

    if(phoneNumber===1234567890 && pinNumber===1234){
        localStorage.setItem("isLoggedIn", true);
        window.location.href = "index.html";
    }else{
        alert("Wrong phone number or pin!")
    }
})