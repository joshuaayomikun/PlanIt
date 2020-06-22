const loginform = document.querySelector(".login");
const email = document.querySelector("#email")
const password = document.querySelector("#password")
$(loginform).validate({
    submitHandler: async (form, event) => {
        try {
            event.preventDefault();
            const user = await UserLogin();
            await saveuserinfo(await user);
            switch(await user.role.toLowerCase()) {
                case "vendor":
                    window.location.href = "vendor/";
                    break;
                case "admin":
                    window.location.href = "admin/"
                    break;
                default:
                    window.location.href = "customer/index.html"
            }
            
            console.log({user});
        } catch(ex) {
            toastnotification("Error", ex);
        }
    }
});

const getFormData = async () => {
    return {
        email:email.value,
        password:password.value
    }
};

const UserLogin = async () => {
    const response = await fetch(`${apiBaseUrl}api/login`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(await getFormData()) // body data type must match "Content-Type" header
    });
    return response.json();
};
const saveuserinfo = async (user) =>  window.localStorage.setItem("user", JSON.stringify(user));

