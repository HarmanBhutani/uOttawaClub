function gnSearchPrimo() {
    document.getElementById("gnPrimoQuery").value = "any,contains," + document.getElementById("uottawa-global-search-box-input").value;
    document.forms["global-search-form"].submit(); 
}