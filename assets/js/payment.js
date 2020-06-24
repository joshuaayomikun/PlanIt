const cartItems = document.querySelector(".cart-items"),
  cartcount = document.querySelector(".cart-count"),
  totalcost = document.querySelector(".total-cost"),
  bookingform = document.querySelector(".booking-form"),
  customername = document.querySelector("#name"),
  phonenumber = document.querySelector("#phonenumber"),
  email = document.querySelector("#email"),
  purpose = document.querySelector("#purpose"),
  address = document.querySelector("#address"),
  dateneeded = document.querySelector("#dateneeded"),
  plannedattendance = document.querySelector("#plannedattendance"),
  serviceIdUrl = getUrlVars()['serviceId'],
  makeItem = ({
    serviceType,
    title,
    price,
    userId,
    _id
  }) => {
    const listgroupitem = document.createElement("li"),
      div = document.createElement("div"),
      titl = document.createElement("h6"),
      servicetyp = document.createElement("small"),
      span = document.createElement("span"),
      vendorId = document.createElement("input"),
      serviceId = vendorId.cloneNode();

    serviceId.type = "hidden";
    vendorId.type = "hidden";
    serviceId.classList.add("serviceId")
    vendorId.classList.add("vendorId")
    span.classList.add("text-muterd");
    servicetyp.classList.add("text-muted");
    listgroupitem.classList.add("list-group-item", "d-flex", "justify-content-between", "lh-condensed")

    titl.classList.add("my-0")
    vendorId.value = userId;
    serviceId.value = _id;
    span.textContent = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'NGN'
    }).format(price)
    titl.textContent = title;

    servicetyp.textContent = serviceType;
    titl.appendChild(vendorId);
    titl.appendChild(serviceId)
    div.appendChild(titl);
    div.appendChild(servicetyp)
    listgroupitem.appendChild(div);
    listgroupitem.appendChild(span);

    return listgroupitem;

  },
  getCartContent = async () => {
      try {
        if (user !== null) {
          if (typeof user.userId !== "undefined") {
            makeSpinner()
            const response = await fetch(`${apiBaseUrl}api/getCartContentByUserId/${user.userId}`, {
              headers: {
                "x-access-token": user.token
              }
            });
            if (response.ok || response.status === 200 || response.status === 201) {
              removeSpinner();
              return response.json();
            }

            throw "An error occurred";
          }
        }
      } catch (ex) {
        removeSpinner()
        toastnotification("error", ex)
      }
    },
  getContentFromUrl = async () => {
      try {
          if (typeof serviceIdUrl !== "undefined") {
            makeSpinner()
            const response = await fetch(`${apiBaseUrl}api/vendors/getSingleServiceWithoutPicture/${serviceIdUrl}`);
            if (response.ok || response.status === 200 || response.status === 201) {
              removeSpinner();
              return response.json();
            }

            throw "An error occurred";
          }
      } catch (ex) {
        removeSpinner()
        toastnotification("error", ex)
      }
    },
    populate = async () => {
        const items = await getCartContent();
        if (typeof items !== "undefined") {
          cartcount.textContent = items.services.length;
          items.services.forEach(val => {
            cartItems.insertBefore(makeItem(val), cartItems.firstElementChild)
          });
          totalcost.textContent = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'NGN'
          }).format(items.services.reduce((acc, curr) => {
            return acc + curr.price;
          }, 0));

        }

      },
    populateFromSerciceId = async () => {
        const item = await getContentFromUrl();
        if (typeof item !== "undefined") {
          cartcount.textContent = 1;
          // items.services.forEach(val => {
            cartItems.insertBefore(makeItem(item.service), cartItems.firstElementChild)
          // });
          totalcost.textContent = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'NGN'
          }).format(item.service.price);

        }

      },
      boobkspace = async () => {
          //modias
          const response = await fetch(`${apiBaseUrl}api/bookVendor/${serviceId}`, {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': await user.token
            },
            body: JSON.stringify(getFormData())
          });
        },
        getFormData = () => {
          return {
            name: customername.value,
            phone: phonenumber.value,
            email: email.com,
            address: address.vallue,
            dateNeeded: dateneeded.value,
            vendorId: Array.from(document.querySelectorAll(".vendorId")).map(e => e.value).reduce((acc, next) => `${acc},${next}`, ""),
            id: user.userId,
            attendanceNo: plannedattendance.value,
            serviceId: Array.from(document.querySelectorAll(".serviceId")).map(e => e.value).reduce((acc, next) => `${acc},${next}`, "")
          }
        },
        prepopulate = async () => {
          if (user !== null) {
            if (user !== "") {
              if(typeof user.userId !== "undefined"){
                const userinfo = await getUserInfo(user.userId);
                customername.value = userinfo.user.name;
                email.value = userinfo.user.email;
                phonenumber.value = userinfo.user.phone;
                address.value - userinfo.user.address;
              }
            }
          }
        }
if (user !== null) {
  if (user !== "") {
    if (user !== "") {
      populate()
      prepopulate()
    }
  }
}
if(typeof serviceIdUrl !== "undefined" && user === ""){
  populateFromSerciceId()
}
//console.log(serviceIdUrl)
$(bookingform).validate({
  submitHandler: async (form, event) => {
    // await vendorsignup()
    // debugger;
    event.preventDefault();
    const paystatus = await boobkspace();
    try {
      getFormData()
    } catch (ex) {

      toastnotification("Error", ex.message);
    }
    return false;
  }
});




/*
<li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Hall name</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">#1,000,000</span>
          </li>
*/