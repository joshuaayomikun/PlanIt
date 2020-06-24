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
        },
        saveuserInfo = (user) => window.localStorage.setItem("user", JSON.stringify(user));

$(loginform).validate({
    submitHandler: async (form, event) => {
        try {
            event.preventDefault();
            const userl = await userLogin();
            if (typeof userl !== "undefined") {
                saveuserInfo(userl);
                if (typeof redirecturl !== "undefined") {
                    if (redirecturl !== "") {
                        window.location.href = redirecturl;
                    }
                }
                switch (userl.role.toLowerCase()) {
                    case "vendor":
                        window.location.href = "vendor/index.html";
                        break;
                    case "admin":
                        window.location.href = "admin/index.html"
                        break;
                    default:
                        window.location.href = "index.html"
                }
                return;
            }
            throw Error;
        } catch (ex) {
            toastnotification("Error", ex);
        }
    }
});
