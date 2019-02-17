// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);
var questionsArr = [];
var questionOptionsArr = [];
var questionObjs = []
var answersArr = [];
function DOMtoString(document_root) {
    
    // Gets all of the questions from the quiz
    if(document_root.getElementsByClassName("question-title").length > 0){
        questionsArr = document_root.getElementsByClassName("question-title");
    }
    
    if(document_root.getElementsByClassName("form-radios-table sCommonRadiosProcessed").length > 0){
        // Gets the answer choices from every question
        questionOptionsArr = document_root.getElementsByClassName("form-radios-table sCommonRadiosProcessed");

        // Creates an Obj of all the questions and their answers
        for(i = 0; i < questionsArr.length; i++){
            question = questionsArr[i].innerHTML.replace("<p>", "");
            question = question.replace("</p>", "");
            questionObjs.push({
                "question": question,
                "answers": questionOptionsArr[i]
            })
        }
    }

    console.log(questionObjs)

    // Gets the locally stored correct answers (see getCorrectAnswer.js for what that is)
    chrome.storage.local.get(['correctAnswersArr'], function(result) {
        answersArr = result.correctAnswersArr;
        console.log(answersArr)

        // Checks for the questions on the correct quiz that match the questions from the previous attempt
        for(i = 0; i < questionObjs.length; i++){
            question = questionObjs[i].question;
            for(z = 0;  z < answersArr.length; z++){
                if(question == answersArr[z].question){
                    console.log("matched question: " + answersArr[z].question);
                    for(c = 0; c < questionObjs[i].answers.rows.length; c++){
                        // Answer Choice Content
                        answerOption = questionObjs[i].answers.rows[c].cells[1].querySelector("div").innerHTML;

                        // Answer Choice Radio Button
                        answerOptionRadioButton = questionObjs[i].answers.rows[c].cells[0].querySelector("div").querySelector("label").querySelector("input");
                        // Removes any HTML tags that may be present in the Answer choice content
                        answerOption = answerOption.replace("<p>", "");
                        answerOption = answerOption.replace("</p>", "");
                        answerOption = answerOption.replace(" ", "");

                        if(i==15){
                            console.log(answerOption);
                            console.log(answersArr[z].answer[0]);
                        }

                        // Selects the correct answers
                        if(answerOption == answersArr[z].answer[0]){
                            answerOptionRadioButton.checked = true;
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