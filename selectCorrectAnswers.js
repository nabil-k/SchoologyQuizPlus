// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);
var questionsArr = [];
var answersArr = [];
function DOMtoString(document_root) {
    
    // Gets all of the questions from the quiz
    if(document_root.getElementsByClassName("question-title").length > 0){
        questionsArr = document_root.getElementsByClassName("question-title");
    }

    console.log(questionsArr[0].innerHTML);

    // Gets the locally stored correct answers (see getCorrectAnswer.js for what that is)
    chrome.storage.local.get(['correctAnswersArr'], function(result) {
        answersArr = result.correctAnswersArr;
        console.log(answersArr)

        // Checks for the questions on the correct quiz that match the questions from the previous attempt
        for(i = 0; i < questionsArr.length; i++){
            question = questionsArr[i].innerHTML.replace("<p>", "");
            question = question.replace("</p>", "");
            for(z = 0;  z < answersArr.length; z++){
                if(question == answersArr[z].question){
                    console.log("matched question: " + answersArr[z].question);
                }
            }
        }
    });


    
    
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});