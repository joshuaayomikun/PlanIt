
const userstring = window.localStorage.getItem("user"),
user = typeof userstring !== 'undefined' ? JSON.parse(userstring): "",
username = document.querySelector("#username"),
passcode = document.querySelector("#passcode"),
email = document.querySelector("#email"),
name = document.querySelector("#name"),
gender = document.querySelectorAll("input[name='gender']"),
password = document.querySelector("#password"),
getFormData = () =>{
    try{
        return {
            passcode: passcode.value,
            email:  email.value, 
            username:  username.value, 
            name: name.value,
            password: password.value,
            gender:  Array.from(gender)
            .filter((check)=> check.checked)
            .map((check)=> check.value)
            .reduce((previousValue, currentValue) => {
                return `${currentValue}`;
            })
        };
    } catch(ex) {
        console.error(ex);
    }
},
adminsignup = async () => {
    const response = await fetch(`${apiBaseUrl}api/AdminSignup`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getFormData()) // body data type must match "Content-Type" header
    });

    return response.json();
},
selectgender = (e) => {
    e.preventDefault();
    try {
        const button = e.target;
        // debugger
        Array.from(button.parentElement.children).forEach((but) => but.classList.toggle("active"));
        button.querySelector("input[type='radio']").checked = !button.querySelector("input[type='radio']")
        .checked;
    } catch(ex) {
            toastnotification("Error", "An error occurred");
        console.error(ex);
    }
};
if(user) {
    user.role.toLowerCase() === "user" || user.role.toLowerCase() === "vendor"? 
        (function(){
        alert("You don't have access to this page!!");
        signout()}()):""
}
$("#regform").validate({
submitHandler: async (form, event) => {
    // await vendorsignup()
    // debugger;
    event.preventDefault();
    try{
        let re = await adminsignup();
        if(await re.token) {
            await toastnotification("Success!!", "Admin registered successfully click <a href='../login.html'>here</a> to login");
        }
        else{
            await toastnotification("Error", "Vendor not registered");
        }
    } catch(ex) {

        toastnotification("Error", "Error in signing up");
    }
    return false;
}
});
$(".gender").on('click', async (e) => await selectgender(e));