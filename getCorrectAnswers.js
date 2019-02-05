// 
// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

var questionsArr = [];
var correctAnswers = []
function DOMtoString(document_root) {
    
    // Stores all of the quiz questions
    if(document_root.getElementsByClassName("question-view").length > 0){
        questionsArr = document_root.getElementsByClassName("question-view");
    }
    
    // Handles all of the quiz questions that are correct
    for(i = 0; i < questionsArr.length; i++){
        answer = questionsArr[i].children[1].getElementsByClassName("selected correct");
        if(answer[0] != undefined){
            question = questionsArr[i].children[0].innerHTML;
            answer = answer[0].children[0].children[1].innerHTML;
            // question and answer string edits
            question = question.replace("<p>", "");
            question = question.replace("</p>", "");
            answer = answer.replace("<p>", "");
            answer = answer.replace("</p>", "");
            answer = answer.slice(answer.indexOf(".") + 2, answer.length);
            answer.trim()

            correctAnswers.push({
                "question": question,
                "answer":  answer
            })
        }

    }
    
    console.log(correctAnswers)

    // Stores correct answers to local storage
    chrome.storage.local.set({correctAnswersArr: correctAnswers}, function() {
        console.log('correctAnswersArr is set to ' + correctAnswers);
    });
    
    
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});