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
        var allAnswerOptions = [];

        // gets only the correct answer(s) from a question
        correct_answers = questionsArr[i].children[1].getElementsByClassName("selected correct");
        // gets all of the answers choices from a question
        allAnswerOptionsHTML = questionsArr[i].children[1].getElementsByClassName("option-span legacy-multiple-choice-question");
        
        // Edits the answers from an HTML element to a String
        for(z = 0; z < allAnswerOptionsHTML.length; z++){
            
            allAnswerOptionsHTML[z] = allAnswerOptionsHTML[z].innerHTML;

            allAnswerOptions.push(allAnswerOptionsHTML[z].innerHTML);
            allAnswerOptions[z] = allAnswerOptions[z].replace("<p>", "");
            allAnswerOptions[z] = allAnswerOptions[z].replace("</p>", "");
            allAnswerOptions[z] = allAnswerOptions[z].slice(allAnswerOptions[z].indexOf(".") + 2, allAnswerOptions[z].length);
            allAnswerOptions[z] = allAnswerOptions[z].trim();
            
            console.log(allAnswerOptions[z]);

        }

        if(correct_answers[0] != undefined){
            // question string edits
            question = questionsArr[i].children[0].innerHTML;
            question = question.replace("<p>", "");
            question = question.replace("</p>", "");
            console.log(correct_answers);
            
            finalAnswers = []
            //correct answer(s) string edits
            for(z = 0; z < correct_answers.length; z++){
                finalAnswers.push(correct_answers[z].children[0].children[1].innerHTML);
                finalAnswers[z] = finalAnswers[z].replace("<p>", "");
                finalAnswers[z] = finalAnswers[z].replace("</p>", "");
                finalAnswers[z] = finalAnswers[z].slice(finalAnswers[z].indexOf(".") + 2, finalAnswers[z].length);
                finalAnswers[z] = finalAnswers[z].trim();
                
            }


            correctAnswers.push({
                "question": question,
                "answers": allAnswerOptions,
                "correct-answer":  finalAnswers

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