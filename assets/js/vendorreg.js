$(document).ready(function () {
    const username = document.querySelector("#username");
    const email = document.querySelector("#email");
    const name = document.querySelector("#name");
    const companyName = document.querySelector("#companyName");
    const address = document.querySelector("#address");
    const services = document.querySelectorAll("input[name='services']");
    const phonenumber = document.querySelector("#phonenumber");
    const password = document.querySelector("#password");
    const getFormData = async () =>{
        try{
            let finalValue ="";
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
                phonenumber:await phonenumber.value
            };
        } catch(ex) {
            console.error(ex);
        }
    }
    const vendorsignup = async () => {
        const response = await fetch(`${apiBaseUrl}api/vendorSignup`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(await getFormData()) // body data type must match "Content-Type" header
        });

        return response.json();
    };
    $("#regform").validate({
        submitHandler: async (form, event) => {
            // await vendorsignup()
            // debugger;
            event.preventDefault();
            let re = await vendorsignup();
            if(await re.token)
                toastnotification("Success!!", "Vendor registered successfully click <a href='login.html'>here</a> to login");
            else
                toastnotification("Error", "Vendor not registered");
            return false;
        }
    });

    const selectservice = async (e) => {
        e.preventDefault();
        try {
            const button = e.currentTarget;
            // debugger
            button.querySelector("input[type='checkbox']").checked = !button.querySelector("input[type='checkbox']")
            .checked;
            button.classList.toggle("active");
        } catch(ex) {
            console.error(ex);
        }
    }
    $(".service").on('click', async (e) => await selectservice(e));
});