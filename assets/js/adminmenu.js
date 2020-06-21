
const userstring = window.localStorage.getItem("user"),
user = typeof userstring !== 'undefined' ? JSON.parse(userstring): "",
menulist = [{
    menuname: "Dashboard",
    menulink: "index.html"
},{
    menuname: "Customers",
    menulink: "user.html"
},{
    menuname: "Reports",
    menulink: "",
},{
    menuname: "Vendors",
    menulink: "listofvendors.html",
}];
debugger
if(user) {
    user.role.toLowerCase() !== "admin"? (function(){
        alert("You don't have access to this page!!");
        signout()}()):""
}
// debugger
makesidebar(menulist);