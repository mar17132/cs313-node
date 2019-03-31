
function disVote(page,jsonObj)
{
    if(jsonObj.length > 1)
    {
        hideShowRemClass(createVList,[createVAdd,createVEdit],'hidden');

        displayTable = $("#disVote");
        removeKeep(displayTable,2);

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


function resultsList(page,jsonObj)
{
    if(jsonObj.length > 1)
    {
        hideShowRemClass(createVList,[createVAdd,createVEdit],'hidden');

        displayTable = $("#resultsList");
        removeKeep(displayTable,2);

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
            viewButton = $("<input value='View' type='button' class='results-view-button resultsBtn'/>");
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

}

