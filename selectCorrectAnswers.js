// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);
var questionsArr = [];
var answersArr = [];
function DOMtoString(document_root) {
    
    if(document_root.getElementsByClassName("question-title").length > 0){
        questionsArr = document_root.getElementsByClassName("question-title");
    }

    console.log(questionsArr[0].innerHTML);

    chrome.storage.local.get(['correctAnswersArr'], function(result) {
        answersArr = result.correctAnswersArr;
        console.log(answersArr)
    });


    for(i = 0; i < questionsArr.length; i++){
        for(z = 0;  z < answersArr.length; z++){
            if(questionsArr[i].innerHTML == answersArr[z]){
                console.log(questionsArr[i].innerHTML + " " + answersArr[z].question.innerHTML)
            }
        }
    }
    
    
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});