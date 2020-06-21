$(document).ready(function () {
    const description = document.querySelector('#description'),
        pictureupload = document.querySelector('.custom-file-input'),
        price = document.querySelector('#price'),
        serviceimage = document.querySelector('.service-image'),
        createserviceform = document.querySelector('#createserviceform'),
        loadFile = (event) => {
            serviceimage.src = URL.createObjectURL(event.target.files[0]);
        },
        getFormData = () => {
            try{
                return {
                    description: description.value,
                    price:  price.parentElement.value, 
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
        createservice = () =>{

        } ;
    $(description).summernote();

    // Add the following code if you want the name of the file appear on select
    $(pictureupload).on("change", function (event) {
        const fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        loadFile(event);
    });

    
$(createserviceform).validate({
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

});