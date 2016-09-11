

var GoogleSearch = {
    
    sendMessage: function(tabId) {
        return function(data) {
            var icon = document.createElement("img");
            icon.src = 'icon.png';
            
            chrome.tabs.sendMessage(tabId, {args: [Util.csvToObject(data), icon]}, undefined);
        }
    },
    
    attachListener: function() {
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
            if (containsWord(tab.url, "google") && 
                (containsWord(tab.url, "search") || containsWord(tab.url, "q="))) {

                $.ajax({
                    method: "GET",
                    url: "data.csv",
                    success: GoogleSearch.sendMessage(tabId), 
                    error: function(error){console.log(error);}
                });
            }
        });

        chrome.tabs.onCreated.addListener(function(tab) {         
            if (containsWord(tab.url, "google") && 
                (containsWord(tab.url, "search") || containsWord(tab.url, "q="))) {
                chrome.tabs.sendMessage(tab.id, {args: ["Hello"]}, function(response) {});
            }
        });
    }
}

$(document).ready(function() {
  GoogleSearch.attachListener();
});