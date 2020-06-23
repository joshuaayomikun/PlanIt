const serviceid = getUrlVars()['serviceid'],
    title = document.querySelector(".title"),
    description = document.querySelector(".description"),
    servicespan = document.querySelector(".service"),
    image = document.querySelector(".checkout-image"),
    price = document.querySelector(".price"),
    booknow = document.querySelector(".book-now"),
    addToCart = document.querySelector("add-to-card"),
    viewservice = async () => {
        try {
            const response = fetch(`${apiBaseUrl}api/vendors/getSingleService/${serviceid}`);
            if ((await response).ok || (await response).status === 200)
                return (await response).json()
            throw "Error in fetching service"
        } catch (ex) {
            toastnotification("error", ex.message);
        }
    },
    populatePage = async () => {
        const response = await viewservice();
        console.log(await response);
        const {
            service
        } = response;

        title.textContent = service.title;
        title.id = service._id;
        description.innerHTML = decodeURIComponent(service.description);
        image.src = service.imageUrl;
        price.appendChild(document.createTextNode(new Intl.NumberFormat(undefined, { style: 'currency', currency: 'NGN' }).format(service.price)))
        servicespan.appendChild(document.createTextNode(service.serviceType));
        // booknow.href = `payment.html?serviceid=${service._id}`
    };

    addToCart.addEventListener("click", e=>populateCart(e, {serviceId:title.id, userId:user.userId,}));

if (typeof serviceid !== "undefined") {
    populatePage();
} else {
    alert("Select a Service  first")
    window.location.href = "index.html";
}
