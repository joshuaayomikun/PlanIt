const serviceid = getUrlVars()['serviceid'],
    title = document.querySelector(".title"),
    description = document.querySelector(".description"),
    servicespan = document.querySelector(".service"),
    image = document.querySelector(".checkout-image"),
    price = document.querySelector(".price"),
    booknow = document.querySelector(".book-now"),
    addToCart = document.querySelector(".add-to-cart"),
    viewservice = async () => {
        try {
            makeSpinner();
            const response = fetch(`${apiBaseUrl}api/vendors/getSingleService/${serviceid}`);
            if ((await response).ok || (await response).status === 200){
                removeSpinner()
                return (await response).json()
            }
            throw Error
        } catch (ex) {
            removeSpinner()
            toastnotification("error", ex.message);
        }
    },
    populatePage = async () => {
        const response = await viewservice();
        // console.log(await response);
        const {
            service
        } = response;

        title.textContent = service.title;
        title.id = service._id;
        description.innerHTML = decodeURIComponent(service.description);
        image.src = service.imageUrl;
        price.appendChild(document.createTextNode(new Intl.NumberFormat(undefined, { style: 'currency', currency: 'NGN' }).format(service.price)))
        servicespan.appendChild(document.createTextNode(service.serviceType));
        if(user !== null){
            if(user !== ""){
                if(typeof user.userId !== "undefined"){
                    booknow.style.display = "none";
                    return;
                }
            }
        }
        addToCart.style.display = "none"
        booknow.href = "payment.html?serviceId="+service._id;
        // booknow.href = `payment.html?serviceid=${service._id}`
    };

    addToCart.addEventListener("click", async e=>{
        try{
            if(user !== null) {
                const data = await populateCart(e, {serviceId:title.id, userId:user.userId,});
                const cartcount = document.querySelector('.cart-count');
                if(typeof data !== "undefined"){
                    if(typeof data.count !== "undefined"){
                    cartcount.textContent = data.count
                    toastnotification("success", "click on the cart icon to go to payment")
                    }
                    return
                }
            } else {
                toastnotification("warning",`You need to sign in to cart click <a href="login.html?redirecturl=${window.location.href}">here</a> to login or click Book Now to Book`)
            }
        } catch(ex) {
            toastnotification("error", ex);
        }

    });

if (typeof serviceid !== "undefined") {
    populatePage();
} else {
    alert("Select a Service  first")
    window.location.href = "index.html";
}
