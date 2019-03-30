


function disCreateVote(page,jsonObj)
{
    if(jsonObj.length > 1)
    {
        hideShowRemClass(createVList,[createVAdd,createVEdit],'hidden');

        displayTable = $("#disCreateVote");
        removeKeep(displayTable,2);

        $.each(jsonObj,function(index,value){
            newRow = $("<ul class='table-row row'></ul>");

            nameCell = $("<li class='table-cell col' ></li>");
            catCell = $("<li class='table-cell col' ></li>");
            optionCell = $("<li class='table-cell col' ></li>");

            nameContent = $("<div class='table-cell-content'>");
            nameContent.text(value.name);

            catContent = $("<div class='table-cell-content'>");
            if(value.cat_name)
            {
               catContent.text(value.cat_name);
            }
            else
            {
                catContent.text(" ");
            }


            optionContent = $("<div class='table-cell-content'>");
            removeButton = $("<input value='Remove' type='button' class='createV-remove-button cVoteBtn'/>");
            editButton = $("<input value='Edit' type='button' class='createV-edit-button cVoteBtn'/>");
            hiddenId = $("<input value='" + value.id + "' type='hidden' class='cVote-id'/>");
            removeType = $("<input value='create vote' type='hidden' class='removeType'/>");
            editButton.appendTo(optionContent);
            removeButton.appendTo(optionContent);
            hiddenId.appendTo(optionContent);
            removeType.appendTo(optionContent);

            nameContent.appendTo(nameCell);
            catContent.appendTo(catCell);
            optionContent.appendTo(optionCell);
            nameCell.appendTo(newRow);
            catCell.appendTo(newRow);
            optionCell.appendTo(newRow);

            newRow.appendTo(displayTable);

        });
    }
    else
    {
        hideShowRemClass(restAdd,restList,'hidden');
    }
}


