
var redirect_checkbox = document.getElementById("redirect");

chrome.storage.local.get({"redirect_enabled": true},function(obj) {
    redirect_checkbox.checked = obj.redirect_enabled
})

redirect_checkbox.addEventListener("change",function() {
    chrome.storage.local.set({"redirect_enabled": redirect_checkbox.checked},function(obj) {
        chrome.runtime.sendMessage({
            type: "options_changed"
        });
    })
});

