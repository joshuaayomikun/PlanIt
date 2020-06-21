const userstring = window.localStorage.getItem("user"),
user = typeof userstring !== 'undefined' ? JSON.parse(userstring): "",
menulist = [{
    menuname: "Dashboard",
    menulink: "index.html"
},{
    menuname: "My orders",
    menulink: "myorders.html"
}];
if(user) {
    user.role.toLowerCase() === "admin" || user.role.toLowerCase() === "vendor"? 
        (function(){
        alert("You don't have access to this page!!");
        signout()}()):""
}
makesidebar(menulist);