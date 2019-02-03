// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);
var questionsArr = [];
var correctAnswers = []
function DOMtoString(document_root) {
    
    if(document_root.getElementsByClassName("question-view").length > 0){
        questionsArr = document_root.getElementsByClassName("question-view");
    }
    
    for(i = 0; i < questionsArr.length; i++){
        answer = questionsArr[i].children[1].getElementsByClassName("selected correct");
        if(answer[0] != undefined){
            question = questionsArr[i].children[0].innerHTML;
            answer = answer[0].children[0].children[1].innerHTML;

            question = question.replace("<p>", "");
            question = question.replace("</p>", "");
            
            answer = answer.replace("<p>", "");
            answer = answer.replace("</p>", "");
            answer = answer.slice(answer.indexOf(".") + 1, answer.length);

            correctAnswers.push({
                "question": question,
                "answer":  answer
            })
        }

    }
    
    console.log(correctAnswers)

    chrome.storage.local.set({correctAnswersArr: correctAnswers}, function() {
        console.log('correctAnswersArr is set to ' + correctAnswers);
    });
    
    
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});