// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);
// Rest of the code was built off of his demo

var questionsArr = [];
var correctAnswers = []
console.log("here")
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
        allAnswerOptionsHTML = questionsArr[i].getElementsByClassName("option-span");
        //console.log(allAnswerOptionsHTML);
        
        // Edits the answers from an HTML element to a String
        for(t = 0; t < allAnswerOptionsHTML.length; t++){
            
            allAnswerOptionsHTML[t] = allAnswerOptionsHTML[t].innerHTML;

            allAnswerOptions.push(allAnswerOptionsHTML[t].innerHTML);
    
            allAnswerOptions[t] = allAnswerOptions[t].replace("<p>", "");
            allAnswerOptions[t] = allAnswerOptions[t].replace("</p>", "");
            allAnswerOptions[t] = allAnswerOptions[t].replace(/ /g, "");
            allAnswerOptions[t] = allAnswerOptions[t].slice(allAnswerOptions[t].indexOf(".") + 1);

        }
        
        

        if(correct_answers[0] != undefined){
            // question string edits
            question = questionsArr[i].children[0].innerHTML;
            question = question.replace("<p>", "");
            question = question.replace("</p>", "");
            //console.log(correct_answers);
            
            finalAnswers = [];

            //correct answer(s) string edits
            for(z = 0; z < correct_answers.length; z++){
                //console.log(questionsArr[i]);
                if(questionsArr[i].getElementsByClassName("ordering-review")[0] != null){

                }
                else if(questionsArr[i].getElementsByClassName("matching-review")[0] != null){
                    
                }
                else if(questionsArr[i].getElementsByClassName("answer s-rte")[0] != null){

                }
                else if(questionsArr[i].getElementsByClassName("legacy-true-false-question")[0] != null){
                    finalAnswers.push(correct_answers[z].children[1].innerHTML);

                    // finalAnswers[z] = finalAnswers[z].replace("<p>", "");
                    // finalAnswers[z] = finalAnswers[z].replace("</p>", "");
                    // finalAnswers[z] = finalAnswers[z].trimEnd();
                    // //console.log(finalAnswers[z]);
                    // finalAnswers[z] = finalAnswers[z].slice(finalAnswers[z].indexOf(".") + 1);
                    // finalAnswers[z] = finalAnswers[z].trim();

                    finalAnswers[z] = finalAnswers[z].replace("<p>", "");
                    finalAnswers[z] = finalAnswers[z].replace("</p>", "");
                    finalAnswers[z] = finalAnswers[z].replace(/ /g, "");
                    finalAnswers[z] = finalAnswers[z].slice(finalAnswers[z].indexOf(".") + 1);

                    correctAnswers.push({
                        "question": question,
                        "answers": allAnswerOptions,
                        "correct_answers":  finalAnswers
        
                    })

                }else if(questionsArr[i].getElementsByClassName("legacy-multiple-choice-question")[0] != null){
                    //console.log(correct_answers[z].getElementsByClassName("legacy-multiple-choice-question")[0].innerHTML);
                    finalAnswers.push(correct_answers[z].getElementsByClassName("legacy-multiple-choice-question")[0].innerHTML);

                    finalAnswers[z] = finalAnswers[z].replace("<p>", "");
                    finalAnswers[z] = finalAnswers[z].replace("</p>", "");
                    finalAnswers[z] = finalAnswers[z].replace(/ /g, "");
                    finalAnswers[z] = finalAnswers[z].slice(finalAnswers[z].indexOf(".") + 1);
                    console.log(finalAnswers)

                    correctAnswers.push({
                        "question": question,
                        "answers": allAnswerOptions,
                        "correct_answers":  finalAnswers
        
                    })

                }
                

                
            }



        }

    }
    

    // Stores correct answers to local storage
    chrome.storage.local.set({correctAnswersArr: correctAnswers}, function() {
        //console.log('correctAnswersArr is set to ' + correctAnswers);
    });
    
    
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});