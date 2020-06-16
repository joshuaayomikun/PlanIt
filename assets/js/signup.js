   $(document).ready(function () {
        const username = document.querySelector("#username");
        const email = document.querySelector("#email")
        const password = document.querySelector("#password");
        const getFormData = async () =>{
            $(signupform).validate({
                // submitHandler: async (form, event) => {
                //     try {
                        submitHandler: async (form, event) => {
                            // await vendorsignup()
                            // debugger;
                            event.preventDefault();
                            try{
                            let re = await customersignup();
                            if(await re.token)
                                toastnotification("Success!!", "Login successfully click <a href='payment.html'>here</a> to Claim Deal");
                            else
                                toastnotification("Error", "Unable to Login");
                            } catch(ex) {
                
                                toastnotification("Error", "Unable to Login");
                            }
                            return false;
                        }
                    });
                    const customersignup = async () => {
                        const response = await fetch(`${apiBaseUrl}api/customerSignup`, {
                            method: 'POST', // *GET, POST, PUT, DELETE, etc.
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(await getFormData()) // body data type must match "Content-Type" header
                        });
                    
                        return response.json();
                    };