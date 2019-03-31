
var menuButtons = $('.menu-a');
var contentDisplay = $('.content-display');
var pageTitle = $('.title'); //update the title on the page not tab
var addItem = $('.addButton');
var editAddTitle = $('#addEdit-name');

//resturants
var restList = $(".list-resturants");
var restAdd = $(".add-resturant");

//create vote
var createVList = $(".disCreateVote");
var createVAdd = $(".createVote-form");
var createVEdit = $(".editVote-form");

//vote
var voteList = $("#disVote");
var voteform = $("#voteForm");

//results
var resultsList = $("#resultsList");
var resultsForm = $("#resultsForm");

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


