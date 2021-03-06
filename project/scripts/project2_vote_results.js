
function disVote(page,jsonObj)
{
    if(jsonObj.length > 1)
    {
        hideShowRemClass(voteList,voteform,'hidden');

        displayTable = $("#voteTable");
        removeKeep(displayTable,1);

        $.each(jsonObj,function(index,value){

            //startDate = Date.parse(returnDate(value.votingstart));
            startDate =returnDate(value.votingstart);
            //endDate = Date.parse(returnDate(value.votingend));
            endDate = returnDate(value.votingend);
            currentDate = new Date();
            currentDateStr = currentDate.getFullYear() + "-"
                + (currentDate.getMonth() + 1) + "-" +currentDate.getDate();

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

            //if(currentDate >= startDate && currentDate < endDate)
            if(compareTime(currentDateStr,startDate) >= 0 &&
               compareTime(currentDateStr,endDate) == -1)
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
        parentUL = $("<ul class='voting-table row'></ul>");
        newRadio = $("<input type='radio' value='" + restIdArray[k] +
                     "' name='voteRest' class='vote-radio' />");
        radioCell = $("<li class='col vote-radio'></li>");
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

            //startDate = Date.parse(returnDate(value.votingstart));
            startDate =returnDate(value.votingstart);
            //endDate = Date.parse(returnDate(value.votingend));
            endDate = returnDate(value.votingend);
            currentDate = new Date();
            currentDateStr = currentDate.getFullYear() + "-"
                + (currentDate.getMonth() + 1) + "-" +currentDate.getDate();

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

            if(compareTime(currentDateStr,startDate) == -1)
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

    if(jsonObj.success != false)
    {
        for(n = 0; n < resultsObj.getNumQuestion(); n++)
        {
            result = resultsObj.getVotObj(n);
            newRow = $("<ul class='row results-row-ul' ></ul>");
            nameCell = $("<li class='col results-name-cell'>" + result.getName() +
                         "</li>");
            resultPrecentage = ((result.getVoteCount() / resultsObj.getNumVotes())
                                * 100).toFixed(0);
           // resultCell = $("<li class='col results-result-cell'>" + resultPrecentage +
           //              "%</li>");

            resultCell = $("<li class='col results-result-cell'></li>");

            createProgressBar(resultPrecentage,resultCell);

            nameCell.appendTo(newRow);
            resultCell.appendTo(newRow);
            newRow.appendTo(resultsDisplayDiv);
        }
    }
    else
    {
        resultsDisplayDiv.text("No resluts found");
        displayNumVotes.text("0");
    }

    resultsObj.clearVoteArray();


}


function disHomePage(page,jsonObj)
{
    if(jsonObj.length > 1)
    {
        hideShowRemClass(voteList,voteform,'hidden');

        displayTable = $("#homeTable");
        removeKeep(displayTable,1);

        $.each(jsonObj,function(index,value){

            startDate =returnDate(value.votingstart);
            endDate = returnDate(value.votingend);
            currentDate = new Date();
            currentDateStr = currentDate.getFullYear() + "-"
                + (currentDate.getMonth() + 1) + "-" +currentDate.getDate();

            if(compareTime(currentDateStr,startDate) >= 0 &&
                compareTime(currentDateStr,endDate) == -1)
            {

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
                voteButton = $("<input value='Vote' type='button' class='home-vote-button tableBtns'/>");
                resultsButton = $("<input value='Results' type='button' class='home-results-button tableBtns'/>");

                hiddenId = $("<input value='" + value.vote_id + "' type='hidden' class='home-id'/>");
                removeType = $("<input value='home' type='hidden' class='removeType'/>");
                voteButton.appendTo(optionContent);
                resultsButton.appendTo(optionContent);
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
            }

        });
    }

}


