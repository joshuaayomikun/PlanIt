$(document).ready(function () {
    const description = document.querySelector('#description'),
        pictureupload = document.querySelector('.custom-file-input'),
        title = document.querySelector('#title'),
        price = document.querySelector('#price'),
        servicecanvas = document.querySelector('.service-canvas'),
        createserviceform = document.querySelector('#createserviceform'),
        servicetype = document.querySelector("#servicetype"),
        address = document.querySelector("#address"),
        state = document.querySelector("#servicetype"),
        discount = document.querySelector("#discount"),
        userId = getUrlVars()['userid'],
        serviceid = getUrlVars()['serviceid'],
        loadFile = (event, url = "../assets/img/undraw_online_calendar_kvu2.svg") => {
            
            context = servicecanvas.getContext('2d');
            context.clearRect(0, 0, servicecanvas.width, servicecanvas.height);
            const base_image = new Image();

            if(event !== null)
            base_image.src = typeof event.target.files[0] !== "undefined"? URL.createObjectURL(event.target.files[0]):url;
            else
            base_image.src = url;
            base_image.onload = function(){
                var wrh = base_image.width / base_image.height;
                var newWidth = servicecanvas.width;
                var newHeight = newWidth / wrh;
                if (newHeight > servicecanvas.height) {
                    newHeight = servicecanvas.height;
                    newWidth = newHeight * wrh;
                }

                // context.clearRect(0, 0, servicecanvas.width, servicecanvas.height);
                context.drawImage(base_image, 0, 0, newWidth, newHeight);
            }
        },
        formatter = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'NGN',
        }),
        getFormData = () => {
            try {
                return {
                    description: encodeURIComponent(description.value),
                    price: price.value,
                    title: title.value,
                    imageUrl: servicecanvas.toDataURL(),
                    serviceType:servicetype.options[servicetype.selectedIndex].value,
                    discount:discount.options[discount.selectedIndex].value,
                    userId:user.userId,
                    state: state.value,
                    address: address.value
                };
            } catch (ex) {
                console.error(ex);
            }
        },
        createservice = async () => {
            console.log(getFormData());
            try{
                const response = await fetch(`${apiBaseUrl}api/vendors/createService`, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: { 'Content-Type': 'application/json',  'x-access-token' : await user.token },
                    body: JSON.stringify(getFormData()), // body data type must match "Content-Type" header
                    user: JSON.stringify({id: user.id})
                });
                if(response.ok || response.status === 201) {
                    return response.json()
                }
                throw "Error in fetching"
            } catch(ex) {
                toastnotification("Error", "An error occurred");
                console.error(ex);
            }
        },
        editservice = async () => {
            console.log(getFormData());
            try{
                const response = await fetch(`${apiBaseUrl}api/vendors/editService/${serviceid}`, {
                    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
                    headers: { 'Content-Type': 'application/json',  'x-access-token' : await user.token },
                    body: JSON.stringify(getFormData()), // body data type must match "Content-Type" header
                    user: JSON.stringify({id: user.id})
                });
                if(response.ok || response.status === 201) {
                    return response.json()
                }
                throw "Error in fetching"
            } catch(ex) {
                toastnotification("Error", "An error occurred");
                console.error(ex);
            }
        },
        populateForm = async() =>{
            const {service} = await getServiceById();
            price.value = service.price;
            title.value = service.title;
            address.value = service.address;
            state.value = service.state;
            $(description).summernote('destroy');
            description.value = decodeURIComponent(service.description)
            $(description).summernote();
            loadFile(null, service.imageUrl)
            Array.from(servicetype.options).forEach(option => 
                option.selected = option.value === service.serviceType?true:false
            );
            Array.from(discount.options).forEach(option => 
                option.selected = option.value === service.discount?true:false
            );
            createserviceform.id="editserviceform"
            console.log({service})
        },
        getServiceById = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}api/vendors/getSingleService/${serviceid}`);
                if(response.ok) {
                    return response.json();
                }
            } catch (ex) {
                toastnotification("Error", "Error in fetching data");
                console.error(ex);
            }
        };
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
            try {
                let re = createserviceform.id === "editserviceform"? await editservice() : await createservice();
                if (re) {
                     toastnotification("Success!!", "Service Created successfully");
                } 
                else
                throw "An error occurred"
            } catch (ex) {

                toastnotification("Error", "Error in creating service");
            }
            return false;
        }
    });

    loadFile(null, "../assets/img/undraw_online_calendar_kvu2.svg");

    if(typeof userId !== "undefined" && typeof serviceid !== "undefined") {
        if(userId !== user.userId){
            alert("you don't have permission to view this page");
            window.location.href = "myservices.html"
        } else {
            populateForm();
        }
    }
    // price.addEventListener("onkeyup", () => {
    //     setTimeout(()=>{
    //         if(isNaN(price.value))
    //         price.value = formatter.format(price.value);
    //         // else {
    //         //     const trimprice = price.value.trim();
    //         //     const arr = trimprice.split(" ");
    //         //     [arr1, ...arr2] = arr;
    //         //     arr
    //         // }
    //     }, 1000);
    // });
});