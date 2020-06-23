$(document).ready(function () {
    const description = document.querySelector('#description'),
        pictureupload = document.querySelector('.custom-file-input'),
        title = document.querySelector('#title'),
        price = document.querySelector('#price'),
        canvas = document.querySelector('.service-canvas'),
        createserviceform = document.querySelector('#createserviceform'),
        servicetype = document.querySelector("#servicetype"),
        address = document.querySelector("#address"),
        state = document.querySelector("#servicetype"),
        discount = document.querySelector("#discount"),
        userId = getUrlVars()['userid'],
        serviceid = getUrlVars()['serviceid'],
        loadFile = (event, url = "../assets/img/undraw_online_calendar_kvu2.svg") => {
            var myImage = new Image();
            myImage.crossOrigin = "Anonymous";
            myImage.onload = function(){
                var imageData = removeImageBlanks(myImage); //Will return cropped image data
            }
            if(event === null)
            myImage.src = url;
            else
            myImage.src = typeof event.target.files[0] !== "undefined"?URL.createObjectURL(event.target.files[0]):url;

            
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
                    imageUrl: canvas.toDataURL(),
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
                
                makeSpinner()
                const response = await fetch(`${apiBaseUrl}api/vendors/createService`, {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    headers: { 'Content-Type': 'application/json',  'x-access-token' : await user.token },
                    body: JSON.stringify(getFormData()), // body data type must match "Content-Type" header
                    user: JSON.stringify({id: user.id})
                });
                if(response.status === 201 || response.status === 200){
                    
                    removeSpinner()
                    return response.json()
                }
                throw "Error in fetching"
            } catch(ex) {
                toastnotification("Error", ex.message);
                
                removeSpinner()
                // console.error(ex);
            }
        },
        editservice = async () => {
            // console.log(getFormData());
            
            makeSpinner()
            try{
                const response = await fetch(`${apiBaseUrl}api/vendors/editService/${serviceid}`, {
                    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
                    headers: { 'Content-Type': 'application/json',  'x-access-token' : await user.token },
                    body: JSON.stringify(getFormData()), // body data type must match "Content-Type" header
                    user: JSON.stringify({id: user.id})
                });
                if(response.status === 201 || response.status === 200){
                    
                
                    removeSpinner()
                    return response.json()
                }
                throw "Error in fetching"
            } catch(ex) {
                toastnotification("Error", ex.message);
                
                removeSpinner()
                // console.error(ex);
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
                
                makeSpinner()
                const response = await fetch(`${apiBaseUrl}api/vendors/getSingleService/${serviceid}`);
                if(response.status === 201 || response.status === 200){
                    
                    removeSpinner()
                    return response.json();
                }
            } catch (ex) {
                toastnotification("Error", ex.message);
                
                removeSpinner()
                // console.error(ex);
            }
        },
        clearForm= () => {
            loadFile(null);
            title.value = ""
            price.value = "";
            $(description).summernote('destroy');
            description.value = "";
            $(description).summernote();
            servicetype.selectedIndex = 0;
            discount.selectedIndex = 0;
            address.value = "";
            state.value = ""

        },
        makeServiceTypeoOption = () =>{
            user.serviceTypes.forEach(val => {
                const option = document.createElement("option");
                option.value = val;
                option.textContent = val;
                servicetype.appendChild(option);
            })
        },
        removeImageBlanks = (imageObject) => {
            imgWidth = imageObject.width;
            imgHeight = imageObject.height;
            canvas.setAttribute("width", imgWidth);
            canvas.setAttribute("height", imgHeight);
            var context = canvas.getContext('2d');
            context.drawImage(imageObject, 0, 0);
        
            var imageData = context.getImageData(0, 0, imgWidth, imgHeight),
                data = imageData.data,
                getRBG = function(x, y) {
                    var offset = imgWidth * y + x;
                    return {
                        red:     data[offset * 4],
                        green:   data[offset * 4 + 1],
                        blue:    data[offset * 4 + 2],
                        opacity: data[offset * 4 + 3]
                    };
                },
                isWhite = function (rgb) {
                    // many images contain noise, as the white is not a pure #fff white
                    return rgb.red > 200 && rgb.green > 200 && rgb.blue > 200;
                },
                        scanY = function (fromTop) {
                var offset = fromTop ? 1 : -1;
        
                // loop through each row
                for(var y = fromTop ? 0 : imgHeight - 1; fromTop ? (y < imgHeight) : (y > -1); y += offset) {
        
                    // loop through each column
                    for(var x = 0; x < imgWidth; x++) {
                        var rgb = getRBG(x, y);
                        if (!isWhite(rgb)) {
                            if (fromTop) {
                                return y;
                            } else {
                                return Math.min(y + 1, imgHeight);
                            }
                        }
                    }
                }
                return null; // all image is white
            },
            scanX = function (fromLeft) {
                var offset = fromLeft? 1 : -1;
        
                // loop through each column
                for(var x = fromLeft ? 0 : imgWidth - 1; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {
        
                    // loop through each row
                    for(var y = 0; y < imgHeight; y++) {
                        var rgb = getRBG(x, y);
                        if (!isWhite(rgb)) {
                            if (fromLeft) {
                                return x;
                            } else {
                                return Math.min(x + 1, imgWidth);
                            }
                        }      
                    }
                }
                return null; // all image is white
            };
        
            var cropTop = scanY(true),
                cropBottom = scanY(false),
                cropLeft = scanX(true),
                cropRight = scanX(false),
                cropWidth = cropRight - cropLeft,
                cropHeight = cropBottom - cropTop;
        
            canvas.setAttribute("width", cropWidth);
            canvas.setAttribute("height", cropHeight);
            // finally crop the guy
            canvas.getContext("2d").drawImage(imageObject,
                cropLeft, cropTop, cropWidth, cropHeight,
                0, 0, cropWidth, cropHeight);
        
            return canvas.toDataURL();
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
                     toastnotification("Success", "Service Created successfully");
                     clearForm();
                    } 
                else
                throw "An error occurred"
            } catch (ex) {

                toastnotification("Error", ex.message);
            }
            return false;
        }
    });

    loadFile(null, "../assets/img/undraw_online_calendar_kvu2.svg");
    makeServiceTypeoOption();
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