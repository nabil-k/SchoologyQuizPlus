var getAnswers = document.getElementById('getAnswers');
var selectAnswers = document.getElementById('selectAnswers');
getAnswers.addEventListener('click', function(){

    chrome.tabs.executeScript(null, {
        file: "getCorrectAnswers.js"
      }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
          message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
      });
})

selectAnswers.addEventListener('click', function(){
  chrome.tabs.executeScript(null, {
      file: "selectCorrectAnswers.js"
    }, function() {
      // If you try and inject into an extensions page or the webstore/NTP you'll get an error
      if (chrome.runtime.lastError) {
        message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
      }
    });
})


