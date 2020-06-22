const userstring = window.localStorage.getItem("user"),
user = typeof userstring !== 'undefined' ? JSON.parse(userstring): "",
menulist = [{
    menuname: "Dashboard",
    menulink: "Vendor/index.html"
},{
    menuname: "Event",
    menulink: ""
},{
    menuname: "Booked Services",
    menulink: "Vendor/Bookedservices.html"
},{
    menuname: "Users",
    menulink: "Vendor/user.html"
},{
    menuname: "Past Events",
    menulink: "Vendor/history.html"
},{
    menuname: "Create Service",
    menulink: "Vendor/createservice.html"
},{
    menuname: "My Services",
    menulink: "Vendor/myservices.html"
}];
if(user) {
    user.role.toLowerCase() !== "vendor"? (function(){
        alert("You don't have access to this page!!");
        signout()}()):""
}
// debugger
makesidebar(menulist);



