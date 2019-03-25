
function getRestaurants()
{

}


function displayRestaurants(restaurantObj)
{

    if(restaurantObj.length > 1)
    {
        hideShowRemClass(restList,restAdd,'hidden');

        restTable = $("#restTable");
        removeKeep(restTable,2);

        $.each(restaurantObj,function(index,value){
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
            removeButton = $("<input value='Remove' type='button' class='rest-remove-button restBtn'/>");
            editButton = $("<input value='Edit' type='button' class='rest-edit-button restBtn'/>");
            hiddenId = $("<input value='" + value.id + "' type='hidden' class='rest-id'/>");
            removeType = $("<input value='restaurants' type='hidden' class='removeType'/>");
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

            newRow.appendTo(restTable);

        });
    }
    else
    {
        hideShowRemClass(restAdd,restList,'hidden');
    }
}


