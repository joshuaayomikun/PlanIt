$(document).ready(function () {
    const username = document.querySelector("#username"),
        email = document.querySelector("#email"),
        name = document.querySelector("#name"),
        address = document.querySelector("#address"),
        gender = document.querySelectorAll("input[name='gender']"),
        phonenumber = document.querySelector("#phonenumber"),
        password = document.querySelector("#password"),
        getFormData = async () =>{
        try{
            return {
                email: await email.value, 
                username: await username.value, 
                name:await name.value,
                address: await address.value,
                password:await password.value,
                phonenumber:await phonenumber.value,
                gender: await Array.from(gender)
                .filter((check)=> check.checked)
                .map(async(check)=> await check.value)
                .reduce(async (previousValue, currentValue) => {
                    return `${await currentValue}`;
                })
            };
        } catch(ex) {
            console.error(ex);
        }
    },
    usersignup = async () => {
        const response = await fetch(`${apiBaseUrl}api/Signup`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(await getFormData()) // body data type must match "Content-Type" header
        });
    
        return response.json();
    },
    selectgender = async (e) => {
        e.preventDefault();
        try {
            const button = e.target;
            // debugger
            Array.from(button.parentElement.children).forEach(async (but) => await but.classList.toggle("active"));
            button.querySelector("input[type='radio']").checked = !button.querySelector("input[type='radio']")
            .checked;
        } catch(ex) {
                toastnotification("Error", "An error occurred");
            console.error(ex);
        }
    }
    $("#regform").validate({
        submitHandler: async (form, event) => {
            // await vendorsignup()
            // debugger;
            event.preventDefault();
            try{
            let re = await usersignup();
            if(await re.token)
                toastnotification("Success!!", "user registered successfully click <a href='login.html'>here</a> to login");
            else
                toastnotification("Error", "user not registered");
            } catch(ex) {

                toastnotification("Error", "Error in signing up");
            }
            return false;
        }
    });
    $(".gender").on('click', async (e) => await selectgender(e));
});