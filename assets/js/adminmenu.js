
const menulist = [{
    menuname: "Dashboard",
    menulink: "admin/index.html"
},{
    menuname: "Customers",
    menulink: "admin/allcustomers.html"
},{
    menuname: "Bookings",
    menulink: "admin/allbookings.html",
},{
    menuname: "Services",
    menulink: "admin/allservices.html",
},{
    menuname: "Vendors",
    menulink: "admin/listofvendors.html",
}],
getVendors = async () => {
    try {
        
        makeSpinner()
        const response = await fetch(`${apiBaseUrl}api/vendors/getAllVendors`);

        if (response.status === 200 || response.status === 201) {
            
            removeSpinner()
            return response.json();
        }

        throw "error in fetching"
    } catch (ex) {
        toastnotification("error", ex.message);
        
        removeSpinner()
    }

}
// debugger
if(user) {
    user.role.toLowerCase() !== "admin"? (function(){
        alert("You don't have access to this page!!");
        signout()}()):""
}
// debugger
makesidebar(menulist);