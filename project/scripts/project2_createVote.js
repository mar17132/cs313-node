


function disCreateVote(page,jsonObj)
{
    if(jsonObj.length > 1)
    {
        hideShowRemClass(createVList,[createVAdd,createVEdit],'hidden');

        displayTable = $("#disCreateVote");
        removeKeep(displayTable,2);

        $.each(jsonObj,function(index,value){
            console.log(value);
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
            removeButton = $("<input value='Remove' type='button' class='createV-remove-button cVoteBtn'/>");
            editButton = $("<input value='Edit' type='button' class='createV-edit-button cVoteBtn'/>");
            hiddenId = $("<input value='" + value.vote_id + "' type='hidden' class='cVote-id'/>");
            removeType = $("<input value='create vote' type='hidden' class='removeType'/>");
            editButton.appendTo(optionContent);
            removeButton.appendTo(optionContent);
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
    else
    {
        hideShowRemClass(restAdd,restList,'hidden');
    }
}


