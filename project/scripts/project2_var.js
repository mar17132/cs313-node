
var menuButtons = $('.menu-a');
var contentDisplay = $('.content-display');
var pageTitle = $('.title'); //update the title on the page not tab
var addItem = $('.addButton');
var editAddTitle = $('#addEdit-name');
var voteObj = function(){
    this.id = null;
    this.name = null;
    this.voteCount = 0;
    this.setId = function(newid){
        this.id = newid;
    };
    this.setName = function(newName){
        this.name = newName;
    };
    this.addVote = function(){
        this.voteCount++;
    };
    this.getId = function(){
        return this.id;
    };
    this.getName = function(){
        return this.name;
    };
    this.getVoteCount = function(){
        return this.voteCount;
    };
};
var resultsObj = {
    voteArray:[],
    winnerID:null,
    numVotes:0,
    setWinnerId:function(id){
        this.winnerID = id;
    },
    setNumVotes:function(vote){
        this.numVotes = vote;
    },
    getNumVotes:function(){
        return this.numVotes;
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
        this.setNumVotes(objArray.length);
        for(m = 0; m < this.numVotes; m++)
        {
            restVote = this.getVote(objArray[m].rest_id);
            restVote.addVote();
        }
    },
    getNumQuestion:function(){
        return this.voteArray.length;
    },
    getVotObj:function(arrayIndex){
        return this.voteArray[arrayIndex];
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


