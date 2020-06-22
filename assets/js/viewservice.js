const serviceid = getUrlVars()['serviceid'],
    title = document.querySelector(".title"),
    description = document.querySelector(".description"),
    servicespan = document.querySelector(".service"),
    image = document.querySelector(".checkout-image"),
    price = document.querySelector(".price")
viewservice = async () => {
        try {
            const response = fetch(`${apiBaseUrl}api/vendors/getSingleService/${serviceid}`);
            if ((await response).ok || (await response).status === 200)
                return (await response).json()
            throw "Error in fetching service"
        } catch (ex) {
            toastnotification("error!!", ex.message);
        }
    },
    populatePage = async () => {
        const response = await viewservice();
        console.log(await response);
        const {
            service
        } = response;

        title.textContent = service.title;
        description.innerHTML = decodeURIComponent(service.description);
        image.src = service.imageUrl;
        price.appendChild(document.createTextNode(new Intl.NumberFormat(undefined, { style: 'currency', currency: 'NGN' }).format(service.price)))
        servicespan.appendChild(document.createTextNode(service.serviceType))
    }

if (typeof serviceid !== "undefined") {
    populatePage();
} else {
    alert("Select a Service  first")
    window.location.href = "index.html";
}