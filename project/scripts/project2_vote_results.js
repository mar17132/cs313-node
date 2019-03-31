
function disVote(page,jsonObj)
{
    if(jsonObj.length > 1)
    {
        hideShowRemClass(voteList,voteform,'hidden');

        displayTable = $("#voteTable");
        removeKeep(displayTable,1);

        $.each(jsonObj,function(index,value){
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

            if(!(currentDate >= startDate && currentDate <= endDate))
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
}


function resultsList(page,jsonObj)
{
    if(jsonObj.length > 1)
    {
        hideShowRemClass(disResultsList,resultsForm,'hidden');

        displayTable = $("#resultsTable");
        removeKeep(displayTable,1);

        $.each(jsonObj,function(index,value){

            startDate = new Date(returnDate(value.votingstart));
            endDate = new Date(returnDate(value.votingend));
            currentDate = new Date();

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

}
