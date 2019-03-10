// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);
var questionsArr = [];
var questionObjs = []
var answersArr = [];
function DOMtoString(document_root) {
    
    // Gets all of the questions from the quiz
    if(document_root.getElementsByClassName("question-wrapper").length > 0){
        questionsArr = document_root.getElementsByClassName("question-wrapper");

        // Creates an Obj of all the questions and their answers
        for(i = 0; i < questionsArr.length; i++){
            var questionOptions = []
            question = questionsArr[i].getElementsByClassName("question-question")[0].getElementsByClassName("question-title")[0].innerHTML;
            question = question.replace("<p>", "");
            question = question.replace("</p>", "");

            if(questionsArr[0].getElementsByClassName("radios-wrapper")[0].getElementsByClassName("form-radios").length > 0){
                questionOptions[0] = questionsArr[i].getElementsByClassName("radios-wrapper")[0].getElementsByClassName("form-radios")[0];
            }
            else if(questionsArr[0].getElementsByClassName("radios-wrapper")[0].getElementsByClassName("form-checkboxes").length > 0){
                questionOptions[0] = questionsArr[i].getElementsByClassName("radios-wrapper")[0].getElementsByClassName("form-checkboxes")[0];
            }

            questionObjs.push({
                    "question": question,
                    "answers": questionOptions
            })

            console.log("DONE: " + question)
        }
        
    }
    

    console.log(questionObjs)

    // Gets the locally stored correct answers (see getCorrectAnswer.js for what that is)
    chrome.storage.local.get(['correctAnswersArr'], function(result) {
        answersArr = result.correctAnswersArr;
        console.log(answersArr);

        // Checks for the questions on the correct quiz that match the questions from the previous attempt
        for(i = 0; i < questionObjs.length; i++){
            question = questionObjs[i].question;
            for(z = 0;  z < answersArr.length; z++){
                if(question == answersArr[z].question){
                    console.log("matched question: " + answersArr[z].question);
                    console.log(questionObjs[i].answers);
                    for(c = 0; c < questionObjs[i].answers.rows.length; c++){
                        // Answer Choice Content
                        answerOption = questionObjs[i].answers.rows[c].cells[1].querySelector("div").innerHTML;

                        // Answer Choice Radio Button
                         answerOptionRadioButton = questionObjs[i].answers.rows[c].cells[0].querySelector("div").querySelector("label").querySelector("input");
                        
                        // Removes any HTML tags that may be present in the Answer choice content
                        answerOption = answerOption.replace("<p>", "");
                        answerOption = answerOption.replace("</p>", "");
                        //answerOption = answerOption.replace(" ", "");

                        // Selects the correct answers
                        for(a = 0; a < answersArr[z].answer.length; a++){
                            if(answerOption == answersArr[z].answer[a]){
                                answerOptionRadioButton.checked = true;
                            }
                        }

                    }
                
                }
            }
        }
    });
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});