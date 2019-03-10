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
        allAnswerOptionsHTML = questionsArr[i].getElementsByClassName("option-span");
        console.log(allAnswerOptionsHTML);
        
        // Edits the answers from an HTML element to a String
        for(t = 0; t < allAnswerOptionsHTML.length; t++){
            
            allAnswerOptionsHTML[t] = allAnswerOptionsHTML[t].innerHTML;

            allAnswerOptions.push(allAnswerOptionsHTML[t].innerHTML);
            allAnswerOptions[t] = allAnswerOptions[t].replace("<p>", "");
            allAnswerOptions[t] = allAnswerOptions[t].replace("</p>", "");
            console.log(allAnswerOptions[t]);

            allAnswerOptions[t] = allAnswerOptions[t].slice(allAnswerOptions[t].indexOf(".") + 1);


            allAnswerOptions[t] = allAnswerOptions[t].trim();
            
            console.log(allAnswerOptions[t]);
            

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
                
                if(questionsArr[i].getElementsByClassName("legacy-true-false-question")[0] == null){
                    finalAnswers.push(correct_answers[z].children[0].children[1].innerHTML);
                }else{
                    finalAnswers.push(correct_answers[z].children[1].innerHTML);
                }
                
                finalAnswers[z] = finalAnswers[z].replace("<p>", "");
                finalAnswers[z] = finalAnswers[z].replace("</p>", "");
                console.log(finalAnswers[z]);

                finalAnswers[z] = finalAnswers[z].slice(finalAnswers[z].indexOf(".") + 1);
                

                
                finalAnswers[z] = finalAnswers[z].trim();
                
            }


            correctAnswers.push({
                "question": question,
                "answers": allAnswerOptions,
                "correct_answers":  finalAnswers

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