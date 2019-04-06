

//var progressBarDiv = $("#progressBarDiv");
//var progressBar50Text = $(".progress-text");

var progressClassObj = function(classStr,startInt,endInt){
    this.className = classStr;
    this.startRange = startInt;
    this.endRange = endInt;
};

var progressBarClass = {
    progressClassArray:[],
    addClass:function(classname,start,end){
        this.progressClassArray.push(new progressClassObj(classname,start,end));
    },
    findClass:function(progressInt){
        for(l = 0; l < this.progressClassArray.length; l++)
        {
            if(this.progressClassArray[l].startRange <= progressInt &&
               this.progressClassArray[l].endRange >= progressInt)
            {
                return this.progressClassArray[l];
            }
        }
    }
};

progressBarClass.addClass("progressBar-bar-1-50",1,50);
progressBarClass.addClass("progressBar-bar-51-70",51,70);
progressBarClass.addClass("progressBar-bar-71-100",71,100);
progressBarClass.addClass("progressBar-bar-0",0,0);


function createProgressBar(progressInt,parentElem)
{
    newUl = $("<ul class='progress-ul'></ul>");
    zeroLi = $("<li class='progress-li' >0</li>");
    hendredLi = $("<li class='progress-li' >100</li>");
    barLi = $("<li class='progress-li' ></li>");
    divContainer = $("<div class='progress-container'></div>");
    divWrapper = $("<div class='progressBar-wrapper'></div>");
    divBarTxt = $("<div class='progress-text'></div>");
    progressBarDiv = $("<div></div>");

    zeroLi.appendTo(newUl);
    divBarTxt.appendTo(divWrapper);
    progressBarDiv.appendTo(divWrapper);
    divWrapper.appendTo(divContainer);
    divContainer.appendTo(barLi);
    barLi.appendTo(newUl);
    hendredLi.appendTo(newUl);

    updateProgress(progressInt,progressBarDiv,divBarTxt);

    newUl.appendTo(parentElem);

}


function updateProgress(progressInt,progressBarDiv,progressBar50Text)
{
    progressClass = progressBarClass.findClass(progressInt);
    progressBarDiv.removeClass();
    progressBarDiv.addClass(progressClass.className);
    width = progressInt;

    if(progressInt >= 50)
    {
        updateProgressText(progressBar50Text,progressInt + "%");
        removeProgressText(progressBarDiv);
    }
    else if(progressInt == 0)
    {
        updateProgressText(progressBar50Text,progressInt + "%");
        removeProgressText(progressBarDiv);
        width = 1;
    }
    else
    {
        updateProgressText(progressBarDiv,progressInt + "%");
        removeProgressText(progressBar50Text);
    }

    progressBarDiv.css('width',width + "%");
}


function updateProgressText(progressElem,progressStr)
{
    progressElem.text(progressStr);
}


function removeProgressText(progressElem)
{
    progressElem.text("");
}



