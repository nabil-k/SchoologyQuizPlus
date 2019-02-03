// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);
var questionsArr = [];
var correctAnswers = []
function DOMtoString(document_root) {
    
    if(document_root.getElementsByClassName("question-view").length > 0){
        questionsArr = document_root.getElementsByClassName("question-view");
    }
    console.log(questionsArr);
    for(i = 0; i < questionsArr.length; i++){
        // question
        //console.log(questionsArr[i].children[0]);
        //answers
        answer = questionsArr[i].children[1].getElementsByClassName("selected correct");
        if(answer[0] != undefined){
            correctAnswers.push({
                "question": questionsArr[i].children[0],
                "answer": answer[0]
            })
        }

    }
    
    console.log(correctAnswers)
    
    
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});