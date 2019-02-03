// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);
var questionsArr = []
function DOMtoString(document_root) {
    
    if(document_root.getElementsByClassName("question-view").length > 0){
        questionsArr = document_root.getElementsByClassName("question-view");
    }
    console.log(questionsArr);
    for(i = 0; i < questionsArr.length; i++){
        console.log(questionsArr[i].children[0]);
    }
    
    
    
    
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});