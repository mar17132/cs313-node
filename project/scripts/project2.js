
var menuButtons = $('.menu-a');
var contentDisplay = $('.content-display');
var pageTitle = $('.title'); //update the title on the page not tab
var addItem = $('.addButton');

var pagesObj = {
    currentPageObj:null,
    pages:[
        {name:'home',number:1,display:'home-display'},
        {name:'restaurants',number:2,display:'restaurants-display'},
        {name:'create vote',number:3,display:'create-vote-display'},
        {name:'vote',number:4,display:'vote-display'},
        {name:'results',number:5,display:'results-display'}
    ],
    getPageObjByNum:function(pageNum){

        var returnPage = null;

        $.each(this.pages,function(index,value){
            if(value.number == pageNum)
            {
                returnPage = value;
            }
        });

        return returnPage;
    },
    getPageDisByNum:function(pageNum){

        var returnPage = null;

        $.each(this.pages,function(index,value){
            if(value.number == pageNum)
            {
                returnPage = value.display;
            }
        });

        return returnPage;
    },
    getPageObjByName:function(pageName){

        var returnPage = null;

        $.each(this.pages,function(index,value){
            if(value.name == pageName)
            {
                returnPage = value;
            }
        });

        return returnPage;
    },
    setCurrentPageObj:function(pageNum){
        this.currentPage = this.getPageObjByNum(pageNum);
    },
    getCurrentPageObj:function(){
        return this.currentPage;
    }
};


function setDisplayPage(pageName)
{
    contentDisplay.hide();
    $('.' + pageName).show();
}


function getRestaurants()
{

}


function removeKeep(elem,keepNum)
{
    childArray = elem.children();

    for(i = childArray.length; i > keepNum; i--)
    {
        childArray.eq(i).remove();
    }

}


function displayRestaurants(restaurantObj)
{
    var restList = $(".list-resturants");
    var restDisplay = $(".display-resturant");

    if(restaurantObj.length > 1)
    {
        hideShowRemClass(restList,restDisplay,'hidden');

        restTable = $("#restTable");
        removeKeep(restTable,2);

        $.each(restaurantObj,function(index,value){
            newRow = $("<ul class='table-row row'></ul>");

            nameCell = $("<li class='table-cell col' ></li>");
            optionCell = $("<li class='table-cell col' ></li>");

            nameContent = $("<div class='table-cell-content'>");
            nameContent.text(value.name);

            optionContent = $("<div class='table-cell-content'>");
            editButton = $("<input value='Remove' type='button' class='rest-remove-button'/>");
            hiddenId = $("<input value='" + value.id + "' type='hidden' class='rest-id'/>");
            removeType = $("<input value='restaurants' type='hidden' class='removeType'/>");
            editButton.appendTo(optionContent);
            hiddenId.appendTo(optionContent);
            removeType.appendTo(optionContent);

            nameContent.appendTo(nameCell);
            optionContent.appendTo(optionCell);
            nameCell.appendTo(newRow);
            optionCell.appendTo(newRow);

            newRow.appendTo(restTable);

        });
    }
    else
    {
        hideShowRemClass(restDisplay,restList,'hidden');
    }
}


function hideShowRemClass(showElem,hideElm,remClass)
{
    showElem.removeClass(remClass);
    hideElm.addClass(remClass);
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


$(document).ready(function(){
    pagesObj.setCurrentPageObj(1);
    setDisplayPage(pagesObj.getCurrentPageObj().display);
    menuButtons.on('click',function(){
        //setup page
        thisPage = pagesObj.getPageObjByName($(this)
                                             .text().trim().toLowerCase());
        pagesObj.setCurrentPageObj(thisPage.number);
        setDisplayPage(thisPage.display);
        ajaxCall(thisPage.name,null);

        //config the menu click
       // menuButtons.removeClass('menu-selected');
       // $(this).addClass('menu-selected');
    });

    $('.restaurants-display').on('click','#addRestBtn',function(){
        hideShowRemClass($('.display-resturant'),$('.list-resturants'),'hidden');

    });

    $('.restaurants-display').on('click','.rest-remove-button',function(){
        restId = $(this).next('.rest-id').val();
        page = $(this).find('.removeType').val();

        ajaxCall("remove","id=" + restId + "&removeType=" + page);

    });

    addItem.on('click',function(){
        page = $("#addType").val();
        name = $("#restName").val();
        clearTextBox($("#restName"));
        ajaxCall("add","name=" + name + "&addType=" + page);
    });

});

