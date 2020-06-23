$(document).ready(function () {
    const username = document.querySelector("#username"),
        email = document.querySelector("#email"),
        name = document.querySelector("#name"),
        companyName = document.querySelector("#companyName"),
        address = document.querySelector("#address"),
        services = document.querySelectorAll("input[name='services']"),
        gender = document.querySelectorAll("input[name='gender']"),
        phonenumber = document.querySelector("#phonenumber"),
        password = document.querySelector("#password"),
        getFormData = async () =>{
            try{
                return {
                    email: await email.value, 
                    username: await username.value, 
                    name:await name.value,
                    companyName: await companyName.value,
                    address: await address.textContent,
                    services: await Array.from(services)
                    .filter((check)=> check.checked)
                    .map(async(check)=> await check.value)
                    .reduce(async (previousValue, currentValue) => {
                        return `${await previousValue},${await currentValue}`;
                    }),
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
        vendorsignup = async () => {
            try{
                
                makeSpinner()
            const response = await fetch(`${apiBaseUrl}api/vendorSignup`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(await getFormData()) // body data type must match "Content-Type" header
            });
            if(response.status === 201 || response.status === 200){
                
                removeSpinner()
                return response.json();
            }
            throw "An error Occurred"
            } catch(ex) {
                toastnotification("error", ex.message)
                
                removeSpinner()
            }
        },
        selectservice = (e) => {
            e.preventDefault();
            try {
                const button = e.target;
                // debugger
                button.querySelector("input[type='checkbox']").checked = !button.querySelector("input[type='checkbox']")
                .checked;
                button.classList.toggle("active");
            } catch(ex) {
                    toastnotification("Error", ex.message);
                console.error(ex);
            }
        },
        selectgender = (e) => {
            e.preventDefault();
            try {
                const button = e.target;
                // debugger
                Array.from(button.parentElement.children).forEach( (but) => but.classList.toggle("active"));
                button.querySelector("input[type='radio']").checked = !button.querySelector("input[type='radio']")
                .checked;
            } catch(ex) {
                toastnotification("Error", ex.message);
                console.error(ex);
            }
        };
    $("#regform").validate({
        submitHandler: async (form, event) => {
            // await vendorsignup()
            // debugger;
            event.preventDefault();
            try{
                let re = await vendorsignup();
                if(await re.token) {
                    await toastnotification("Success", "Vendor registered successfully click <a href='login.html'>here</a> to login");
                }
                else{
                    await toastnotification("Error", "Vendor not registered");
                }
            } catch(ex) {

                toastnotification("Error", ex.message);
            }
            return false;
        }
    });

    $(".service").on('click',selectservice);
    $(".gender").on('click', selectgender);
});