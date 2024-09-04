document.getElementById("email").addEventListener("click", function(){
    if (document.getElementById("email-text").classList.contains("hidden")) {
        document.getElementById("email-text").classList.remove("hidden");
        
    } else {
        document.getElementById("email-text").classList.add("hidden");
    }
});