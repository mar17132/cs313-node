

function editItems(page,jsonObjs)
{
    if(page == "restaurants")
    {
        hideShowRemClass(restAdd,restList,'hidden');
        var disDiv = $('.rest-cats');
        editAddTitle.text("Edit");
        newUL = $("<ul class='ul-cat-dis'></ul>");
        $.each(jsonObjs,function(index,value){
            newLI = $("<li></li>");
            newCheck = $("<input type='checkbox' value='" + value.id + "' class='catSelect'/>");
            newSpan = $("<span class='span-cat-select'>" + value.name + "</span>");

            newCheck.appendTo(newLI);
            newSpan.appendTo(newLI);
            newLI.appendTo(newUL);

        });

        newLI.appendTo(disDiv);
    }
}


function catSetup(page,jsonObj)
{
    var disDiv;
    var newUL = $("<ul class='ul-cat-dis'></ul>");

    if(page == "restaurants")
    {
        if(jsonObj.message == null)
        {
            hideShowRemClass(restAdd,restList,'hidden');
            disDiv = $('.rest-cats');
            disDiv.empty();
            editAddTitle.text("Edit");
        }
    }

    $.each(jsonObj,function(index,value){
        displayCheckbox(value).appendTo(disDiv);
    });

}


function displayCheckbox(obj)
{
    newLI = $("<li></li>");
    newCheck = $("<input type='checkbox' value='" + obj.id + "' class='catSelect'/>");
    newSpan = $("<span class='span-cat-select'>" + obj.name + "</span>");

    newCheck.appendTo(newLI);
    newSpan.appendTo(newLI);

    return newLI;

}


function unCheck(elem)
{
    elem.attr('checked',false);
}

