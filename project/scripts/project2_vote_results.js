
function disVote(page,jsonObj)
{
    if(jsonObj.length > 1)
    {
        hideShowRemClass(voteList,voteform,'hidden');

        displayTable = $("#voteTable");
        removeKeep(displayTable,1);

        $.each(jsonObj,function(index,value){

            startDate = Date.parse(returnDate(value.votingstart));
            console.log(startDate);
            endDate = Date.parse(returnDate(value.votingend));
            console.log(endDate);
            currentDate = Date.now();

            newRow = $("<ul class='table-row row'></ul>");

            lunchCell = $("<li class='table-cell col' ></li>");
            startCell = $("<li class='table-cell col' ></li>");
            endCell = $("<li class='table-cell col' ></li>");
            optionCell = $("<li class='table-cell col' ></li>");

            lunchContent = $("<div class='table-cell-content'>");
            lunchContent.text(returnDate(value.lunchdate));

            startContent = $("<div class='table-cell-content'>");
            startContent.text(returnDate(value.votingstart));

            endContent = $("<div class='table-cell-content'>");
            endContent.text(returnDate(value.votingend));

            optionContent = $("<div class='table-cell-content'>");
            viewButton = $("<input value='Vote' type='button' class='vote-view-button voteBtn'/>");

            if(currentDate >= startDate && currentDate < endDate)
            {
               viewButton.attr('disabled',false);
            }
            else
            {
                viewButton.attr('disabled',true);
            }

            hiddenId = $("<input value='" + value.vote_id + "' type='hidden' class='vote-id'/>");
            removeType = $("<input value='vote' type='hidden' class='removeType'/>");
            viewButton.appendTo(optionContent);
            hiddenId.appendTo(optionContent);
            removeType.appendTo(optionContent);

            lunchContent.appendTo(lunchCell);
            startContent.appendTo(startCell);
            endContent.appendTo(endCell);
            optionContent.appendTo(optionCell);
            lunchCell.appendTo(newRow);
            startCell.appendTo(newRow);
            endCell.appendTo(newRow);
            optionCell.appendTo(newRow);

            newRow.appendTo(displayTable);

        });
    }

}


function displayVoteForm(page,jsonObj)
{
    hideShowRemClass(voteform,voteList,'hidden');

    restDiv = $(".rest-vote");
    lunchDateLi = $("#disLunchDate");
    lunchvoteID = $("#vote_luchID");
    restDiv.empty();
    myObj = jsonObj[0];
    restIdArray = myObj.rest_id.split(",");
    restNameArray = myObj.rest_name.split(",");

    lunchDateLi.text(returnDate(myObj.lunchdate));
    lunchvoteID.val(myObj.vote_id);

    for(k = 0; k < restIdArray.length; k++)
    {
        parentUL = $("<ul class='vote-table row'></ul>");
        newRadio = $("<input type='radio' value='" + restIdArray[k] +
                     "' name='voteRest' class='vote-radio' />");
        radioCell = $("<li class='col'></li>");
        nameCell = $("<li class='col'>" + restNameArray[k] + "</li>");

        newRadio.appendTo(radioCell);
        radioCell.appendTo(parentUL);
        nameCell.appendTo(parentUL);

        parentUL.appendTo(restDiv);

    }



}


function resultsList(page,jsonObj)
{
    if(jsonObj.length > 1)
    {
        hideShowRemClass(disResultsList,resultsForm,'hidden');

        displayTable = $("#resultsTable");
        removeKeep(displayTable,1);

        $.each(jsonObj,function(index,value){

            startDate = Date.parse(returnDate(value.votingstart));
            console.log(startDate);
            endDate = Date.parse(returnDate(value.votingend));
            console.log(endDate);
            currentDate = Date.now();

            newRow = $("<ul class='table-row row'></ul>");

            lunchCell = $("<li class='table-cell col' ></li>");
            startCell = $("<li class='table-cell col' ></li>");
            endCell = $("<li class='table-cell col' ></li>");
            optionCell = $("<li class='table-cell col' ></li>");

            lunchContent = $("<div class='table-cell-content'>");
            lunchContent.text(returnDate(value.lunchdate));

            startContent = $("<div class='table-cell-content'>");
            startContent.text(returnDate(value.votingstart));

            endContent = $("<div class='table-cell-content'>");
            endContent.text(returnDate(value.votingend));

            optionContent = $("<div class='table-cell-content'>");
            viewButton = $("<input value='View' type='button' class='results-view-button resultsBtn'/>");

            if(!(currentDate >= startDate))
            {
               viewButton.attr('disabled',true);
            }


            hiddenId = $("<input value='" + value.vote_id + "' type='hidden' class='results-id'/>");
            removeType = $("<input value='results' type='hidden' class='removeType'/>");
            viewButton.appendTo(optionContent);
            hiddenId.appendTo(optionContent);
            removeType.appendTo(optionContent);

            lunchContent.appendTo(lunchCell);
            startContent.appendTo(startCell);
            endContent.appendTo(endCell);
            optionContent.appendTo(optionCell);
            lunchCell.appendTo(newRow);
            startCell.appendTo(newRow);
            endCell.appendTo(newRow);
            optionCell.appendTo(newRow);

            newRow.appendTo(displayTable);

        });
    }

}


function resultsDisplay(page,jsonObj)
{
    hideShowRemClass(resultsForm,disResultsList,'hidden');

    displayNumVotes = $("#resultsTotalVotes");
    resultsDisplayDiv = $(".results-rest-display");

    resultsDisplayDiv.empty();

    resultsObj.calVotes(jsonObj);
    displayNumVotes.text(resultsObj.getNumVotes());

    for(n = 0; n < resultsObj.getNumQuestion(); n++)
    {
        result = resultsObj.getVotObj(n);
        newRow = $("<ul class='row results-row-ul' ></ul>");
        nameCell = $("<li class='col results-name-cell'>" + result.getName() +
                     "</li>");
        resultPrecentage = ((result.getVoteCount() / resultsObj.getNumVotes())
                            * 100).toFixed(0);
        resultCell = $("<li class='col results-result-cell'>" + resultPrecentage +
                     "%</li>");

        nameCell.appendTo(newRow);
        resultCell.appendTo(newRow);
        newRow.appendTo(resultsDisplayDiv);
    }

    resultsObj.clearVoteArray();


}

