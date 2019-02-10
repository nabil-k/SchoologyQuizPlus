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
            // question string edits
            question = questionsArr[i].children[0].innerHTML;
            question = question.replace("<p>", "");
            question = question.replace("</p>", "");
            console.log(answer);
            
            finalAnswers = []
            //answer(s) string edits
            for(z = 0; z < answer.length; z++){
                finalAnswers.push(answer[z].children[0].children[1].innerHTML);
                finalAnswers[z] = finalAnswers[z].replace("<p>", "");
                finalAnswers[z] = finalAnswers[z].replace("</p>", "");
                finalAnswers[z] = finalAnswers[z].slice(finalAnswers[z].indexOf(".") + 2, finalAnswers[z].length);
                finalAnswers[z] = finalAnswers[z].trim();
                console.log(finalAnswers);
                
            }
            //answer(s) string edits



            correctAnswers.push({
                "question": question,
                "answer":  finalAnswers
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