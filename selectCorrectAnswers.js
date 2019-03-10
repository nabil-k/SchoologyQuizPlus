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

            if(questionsArr[i].getElementsByClassName("radios-wrapper").length > 0){
                questionOptions = questionsArr[i].getElementsByClassName("radios-wrapper")[0].children;
            }
            console.log(questionsArr[i].getElementsByClassName("radios-wrapper")[0]);
            

           

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
                // checks if questions matched
                if(question == answersArr[z].question){
                    TFQuestion = false;

                    // console.log("matched question: " + answersArr[z].question);
                    // console.log(questionObjs[i]);
                    // console.log(questionObjs[i].answers);
                    var questionsHTML = questionObjs[i].answers[0].getElementsByClassName("form-radios-table sCommonRadiosProcessed")[0];
                    console.log(questionObjs[i]);
                    if(questionsHTML == undefined){
                        if(questionObjs[i].answers[0].getElementsByClassName("form-radio")[0] == null){
                            questionsHTML =  questionObjs[i].answers[0].getElementsByClassName("form-checkboxes-table sCommonCheckboxesProcessed")[0].tBodies[0].rows;
                            
                        }
                        else{
                            questionsHTML = questionObjs[i].answers[0].getElementsByClassName("form-radio-title");
                            console.log("********************");
                            TFQuestion = true;
                        }
                    }else{
                        questionsHTML = questionObjs[i].answers[0].getElementsByClassName("form-radios-table sCommonRadiosProcessed")[0].tBodies[0].rows;
                    }

                    console.log(questionsHTML);

                    var matchedAnswers = 0;
                    for(c = 0; c < questionsHTML.length; c++){

                        var answerOption;
                        var answerOptionRadioButton;

                        for(v = 0; v < answersArr[z].answers.length; v++){

                            // Answer Choice Content and Answer Choice Radio Button
                            if(TFQuestion){

                                answerOption = questionsHTML[c].innerHTML;
                                answerOptionRadioButton = questionsHTML[c].parentNode.querySelector("input");
                                console.log(answerOption);
                                console.log(answerOptionRadioButton);
                                
                            }else{
                                answerOption = questionsHTML[c].cells[1].querySelector("div").innerHTML;
                                answerOptionRadioButton = questionsHTML[c].cells[0].querySelector("div").querySelector("label").querySelector("input");
                            }
                            
                            // Removes any HTML tags that may be present in the Answer choice content

                            answerOption = answerOption.replace("<p>", "");
                            answerOption = answerOption.replace("</p>", "");
                            console.log(answerOption);
            
                            //answerOption = answerOption.slice(answerOption.indexOf(".") + 1);
                            console.log(answerOption);


                            console.log(answerOption + " = " + answersArr[z].answers[v]);
                            console.log(answerOption == answersArr[z].answers[v]);
                            if(answerOption == answersArr[z].answers[v]){

                                matchedAnswers++;
                            }
                            
                        }
                        

                    }

                    console.log(matchedAnswers);
                    if(matchedAnswers == answersArr[z].answers.length){
                        for(c = 0; c < questionsHTML.length; c++){
                            // Answer Choice Content and Answer Choice Radio Button
                            if(TFQuestion){

                                answerOption = questionsHTML[c].innerHTML;
                                answerOptionRadioButton = questionsHTML[c].parentNode.querySelector("input");
                                console.log(answerOption);
                                console.log(answerOptionRadioButton);
                                
                            }else{
                                answerOption = questionsHTML[c].cells[1].querySelector("div").innerHTML;
                                answerOptionRadioButton = questionsHTML[c].cells[0].querySelector("div").querySelector("label").querySelector("input");
                            }

                            // Removes any HTML tags that may be present in the Answer choice content

                            answerOption = answerOption.replace("<p>", "");
                            answerOption = answerOption.replace("</p>", "");
                            console.log(answerOption);
            
                            //answerOption = answerOption.slice(answerOption.indexOf(".") + 1);
                            
    
    
                            // Selects the correct answers
                            for(a = 0; a < answersArr[z].answers.length; a++){
                                if(answerOption == answersArr[z].correct_answers[a]){
                                    
                                    answerOptionRadioButton.checked = true;
                                }
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