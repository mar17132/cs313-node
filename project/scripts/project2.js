

function createCheckbox(chkID,chkvalue,chkclass,checked)
{
    var checkLI = $("<li></li>");
    var newCheck = $("<input type='checkbox' class='check-select' value='"
                    + chkID + "' />");
    var newValue = $("<span class='check-select'>" + chkvalue + "</span>");

    if(chkclass)
    {
        newCheck.addClass(chkclass);
    }

    if(checked)
    {
        newCheck.attr('checked',true);
    }

    newCheck.appendTo(checkLI);
    newValue.appendTo(checkLI);

    return checkLI;
}

function setDisplayPage(pageName)
{
    contentDisplay.hide();
    $('.' + pageName).show();
}


function returnDate(dateStr)
{
    var returnVale = dateStr.split('T');
    return returnVale[0];
}


function removeKeep(elem,keepNum)
{
    childArray = elem.children();

    for(i = (childArray.length - 1); i >= keepNum; i--)
    {
        childArray.eq(i).remove();
    }

}


function hideShowRemClass(showElem,hideElm,remClass)
{
    if(Array.isArray(hideElm))
    {
        for(i = 0; i < hideElm.length; i++)
        {
            hideElm[i].addClass(remClass);
        }
        showElem.removeClass(remClass);
    }
    else
    {
        showElem.removeClass(remClass);
        hideElm.addClass(remClass);
    }
}


function clearTextBox(txtBox)
{
    txtBox.val("");
}


function ajaxCall(whatPage,value)
{
    var returnJsonObj = null;
    var xhttp = new XMLHttpRequest();
    var sendString = "";

    if(whatPage != null)
    {
        sendString = "/" + whatPage.toLowerCase();

        if(value != null)
        {
            sendString += "?" + value;
        }

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
            {
                returnJsonObj = JSON.parse(this.responseText);

                if(returnJsonObj.pageType != null)
                {
                    ajaxCall(returnJsonObj.pageType,null);
                }
                else
                {
                    switch(whatPage.toLowerCase())
                    {
                        case "home":
                            break;
                        case "restaurants":
                            displayRestaurants(returnJsonObj);
                            break;
                        case "create vote":
                            break;
                        case "vote":
                            break;
                        case "results":
                            break;
                        default:
                            console.log("Error: Incorrect Ajax call");
                            break;
                    }
                }
            }
        };
        xhttp.open("GET",sendString, true);
        xhttp.send();
    }
}


function ajaxCallItems(whatPage,value,callBack)
{
    var returnJsonObj = null;
    var xhttp = new XMLHttpRequest();
    var sendString = "";

    if(whatPage != null)
    {
        sendString = "/" + whatPage.toLowerCase();

        if(value != null)
        {
            sendString += "?" + value;
        }

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
            {
                returnJsonObj = JSON.parse(this.responseText);

                if(returnJsonObj.cats)
                {
                    callBack(returnJsonObj.page,returnJsonObj.cats);
                }
                else
                {
                    callBack(null,returnJsonObj);
                }
            }
        };
        xhttp.open("GET",sendString, true);
        xhttp.send();
    }
}


$(document).ready(function(){
    pagesObj.setCurrentPageObj(1);
    setDisplayPage(pagesObj.getCurrentPageObj().display);
    menuButtons.on('click',function(){
        //setup page
        thisPage = pagesObj.getPageObjByName($(this)
                                             .text().trim().toLowerCase());
        pagesObj.setCurrentPageObj(thisPage.number);
        setDisplayPage(thisPage.display);

        if(thisPage.name == "restaurants")
        {
            ajaxCall(thisPage.name,null);
        }
        else if(thisPage.name == "create vote")
        {
            ajaxCallItems("createvote","pageType=" + thisPage.name, disCreateVote);
        }
        else if(this.name == "")
        {

        }

        //config the menu click
       // menuButtons.removeClass('menu-selected');
       // $(this).addClass('menu-selected');
    });

    $('.restaurants-display').on('click','#addRestBtn',function(){
        hideShowRemClass($('.add-resturant'),$('.list-resturants'),'hidden');
        editAddTitle.text("Add");
        //page = $(this).parent().find('.removeType').val();
        page = "restaurants";
        ajaxCallItems("categories","pageType=" + page, catSetup);
    });

    $('.restaurants-display').on('click','.rest-remove-button',function(){
        restId = $(this).nextAll('.rest-id').val();
        page = $(this).nextAll('.removeType').val();

        ajaxCall("remove","id=" + restId + "&removeType=" + page);

    });


    $('.restaurants-display').on('click','.rest-edit-button',function(){
        hideShowRemClass($('.add-resturant'),$('.list-resturants'),'hidden');
        editAddTitle.text("Edit");
        addItem.val('Update');
        page = $(this).nextAll('.removeType').val();
        restId = $(this).nextAll('.rest-id').val();
       ajaxCallItems("categories","pageType=" + page, catSetup);
       ajaxCallItems("restaurants","pageType=" + page + "&id=" + restId, function(page,jsonObj){
           $("#restID").val(jsonObj[0].id);
           $("#restName").val(jsonObj[0].name);
           var catArray = jsonObj[0].cat_id.split(",");
           $.each($('.catSelect'),function(){

               for(k = 0; k < catArray.length; k++)
               {
                   if($(this).val() == catArray[k])
                    {
                       $(this).attr('checked',true);
                    }
               }

           });
       });


    });


    //create vote buttons

     $('.create-vote-display').on('click','#addVoteBtn',function(){
        hideShowRemClass(createVAdd,[createVList,createVEdit],'hidden');
        page = "create vote";
        ajaxCallItems("restaurants","pageType=" + page, function(page,jsonObj){
            var displayRest = $("#createVoteRest");
            displayRest.empty();
            var newParent = $("<ul class='check-select-ul'></ul>");
            $.each(jsonObj,function(resIndex,resValue){
                var isChecked = false;

                createCheckbox(resValue.id,resValue.name).appendTo(newParent);
            });

            newParent.appendTo(displayRest);

        });
    });

    $('.create-vote-display').on('click','.createV-remove-button',function(){
        restId = $(this).nextAll('.cVote-id').val();
        page = $(this).nextAll('.removeType').val();

        ajaxCallItems("remove","id=" + restId + "&removeType=" + page,function(page,jsonObj){
            ajaxCallItems("createvote","pageType=" + page, editCreateVote);
        });

    });


    $('.create-vote-display').on('click','.createV-edit-button',function(){
        hideShowRemClass(createVEdit,[createVAdd,createVList],'hidden');
        page = $(this).nextAll('.removeType').val();
        restId = $(this).nextAll('.cVote-id').val();
        ajaxCallItems("createvote","pageType=" + page + "id=" + restId, editCreateVote);
    });


    $('.create-vote-display').on('click','#editVoteBtn',function(){
        hideShowRemClass(createVList,[createVAdd,createVEdit],'hidden');

        lunchDate = $("#editLunchDate");
        startDate = $("#editStartVoteDate");
        endDate = $("#editEndVoteDate");
        lunchVoteID = $("#editVoteID");
        restSelected = $(".rest-edit:checked");
        page = "create vote";
        resIdStr = "";
        valuesStr = "addType=" + page + "&id=" + lunchVoteID.val() +
                    "&votingStart= " + startDate.val() +
                    "&votingEnd=" + endDate.val() +
                    "&lunchDate=" + lunchDate.val();

        $.each(restSelected,function(index,value){
                if(index == ($('.rest-edit:checked').length - 1))
                {
                    resIdStr += $(this).val();
                }
                else
                {
                    resIdStr += $(this).val() + ",";
                }
        });

        ajaxCallItems("edit",valuesStr + "&rest=" + resIdStr,function(page,jsonObj){
            ajaxCallItems("createvote","pageType=" + page, editCreateVote);

        });

        clearTextBox(lunchDate);
        clearTextBox(startDate);
        clearTextBox(endDate);
        clearTextBox(lunchVoteID);

    });

    $('.create-vote-display').on('click','#createVoteBtn',function(){
        hideShowRemClass(createVList,[createVAdd,createVEdit],'hidden');

        lunchDate = $("#editLunchDate");
        startDate = $("#editStartVoteDate");
        endDate = $("#editEndVoteDate");
        restSelected = $(".rest-edit:checked");
        page = "create vote";
        resIdStr = "";
        valuesStr = "addType=" + page + "&votingStart= " + startDate.val() +
                    "&votingEnd=" + endDate.val() +
                    "&lunchDate=" + lunchDate.val();

        $.each(restSelected,function(index,value){
                if(index == ($('.rest-edit:checked').length - 1))
                {
                    resIdStr += $(this).val();
                }
                else
                {
                    resIdStr += $(this).val() + ",";
                }
        });

        ajaxCallItems("add",valuesStr + "&rest=" + resIdStr,function(page,jsonObj){
            ajaxCallItems("createvote","pageType=" + page, editCreateVote);

        });

        clearTextBox(lunchDate);
        clearTextBox(startDate);
        clearTextBox(endDate);
        clearTextBox(lunchVoteID);
    });


    addItem.on('click',function(){
        page = $("#addType").val();
        name = $("#restName").val();
        clearTextBox($("#restName"));
        catString = "";

        if($(this).val() == "Add")
        {

            $('.catSelect:checked').each(function(index,value){
                if(index == ($('.catSelect:checked').length - 1))
                {
                    catString += $(this).val();
                }
                else
                {
                    catString += $(this).val() + ",";
                }
            });
            ajaxCall("add","name=" + name + "&addType=" + page + "&cats=" + catString);
        }
        else if($(this).val() == "Update")
        {
            id = $("#restID").val();
            $('.catSelect:checked').each(function(index,value){
                if(index == ($('.catSelect:checked').length - 1))
                {
                    catString += $(this).val();
                }
                else
                {
                    catString += $(this).val() + ",";
                }
            });
            ajaxCall("edit","id=" + id + "&name=" + name + "&addType=" + page + "&cats=" + catString);

        }

        unCheck($('.catSelect'));
    });


});

