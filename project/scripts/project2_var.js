
var menuButtons = $('.menu-a');
var contentDisplay = $('.content-display');
var pageTitle = $('.title'); //update the title on the page not tab
var addItem = $('.addButton');
var editAddTitle = $('#addEdit-name');
var voteObj = {
    id:null,
    name:null,
    voteCount:0,
    setId:function(newid){
        this.id = newid;
    },
    setName:function(newName){
        this.name = newName;
    },
    addVote:function(){
        this.voteCount++;
    },
    getId:function(){
        return this.id;
    },
    getName:function(){
        return this.name;
    },
    getVoteCount:function(){
        return this.voteCount;
    }
};
var resultsObj = {
    voteArray:[],
    winnerID:null,
    setWinnerId:function(id){
        this.winnerID = id;
    },
    getWinnerId:function(){

        if(this.winnerID == null)
        {
           this.setWinner();
        }
        return this.winnerID;
    },
    voteAdd:function(id,name){
        this.voteArray.push(new voteObj);
        this.voteArray[this.voteArray.length - 1].setName(name);
        this.voteArray[this.voteArray.length - 1].setId(id);
    },
    getVote(id){

        for(l = 0; l < this.voteArray.length; l++)
        {
            if(id == this.voteArray[l].getId())
            {
                return this.voteArray[l];
            }
        }
    },
    createVoteArray:function(restIdA,restNameA){

        for(k = 0; k < restIdA.length; k++)
        {
            this.voteAdd(restIdA[k],restNameA[k]);
        }
    },
    calVotes:function(objArray){

        for(m = 0; m < objArray.length; m++)
        {
            restVote = this.getVote(objArray[m].vote_lunch_id);
            restVote.addVote();
        }
    }
};

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
var disResultsList = $("#resultsList");
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


