const loginform = document.querySelector(".login"),
    email = document.querySelector("#email"),
    password = document.querySelector("#password"),
    getFormData = () => {
        return {
            email: email.value,
            password: password.value
        };
    },
    userLogin = async () => {
            try {
                makeSpinner()
                const response = await fetch(`${apiBaseUrl}api/login`, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(getFormData()) // body data type must match "Content-Type" header
                });
                if (response.status === 201 || response.status === 200) {

                    removeSpinner()
                    return response.json();
                }
                throw "An error occurred"
            } catch (ex) {
                removeSpinner()
                toastnotification("error", ex.message)
            }
        };

$(loginform).validate({
    submitHandler: async (form, event) => {
        try {
            event.preventDefault();
            const userl = await userLogin();
            if (typeof userl !== "undefined") {
                // debugger
                saveuserInfo(userl);
                if (typeof redirecturl !== "undefined") {
                    if (redirecturl !== "") {
                        window.location.href = redirecturl;
                    }
                }
               window.location.href = switchDashboard(userl.role)
                return;
            }
            throw Error;
        } catch (ex) {
            toastnotification("Error", ex);
        }
    }
});
