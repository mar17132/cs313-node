var postage = {
    ls:['$0.55','$0.70','$0.85','$1.00'],
    lm:['$0.50','$0.65','$0.80','$0.95'],
    lf:['$1.00','$1.15','$1.30','$1.45','$1.60','$1.75',
        '$1.90','$2.05','$2.20','$2.35','$2.50','$2.65',
        '$2.80'
       ],
    fc:['$3.66','$3.66','$3.66','$3.66','$4.39','$4.39',
        '$4.39','$4.39','$5.19','$5.19','$5.19','$5.19',
        '$5.71'
       ]
};

exports.calculateRate = function(weight,postType){
    var weightInt = Math.round(parseFloat(weight));
    var returnVal = "";
    switch(postType)
    {
        case "ls":
            returnVal = (postage.ls[weightInt - 1] != null) ?
                postage.ls[weightInt - 1] : "Invalid Weight";
            break;
        case "lm":
            returnVal = (postage.lm[weightInt - 1] != null) ?
                postage.lm[weightInt - 1] : "Invalid Weight";
            break;
        case "lf":
            returnVal = (postage.lf[weightInt - 1] != null) ?
                postage.lf[weightInt - 1] : "Invalid Weight";
            break;
        case "fc":
            returnVal = (postage.fc[weightInt - 1] != null) ?
                postage.fc[weightInt - 1] : "Invalid Weight";
            break;
    }

    return returnVal;
};

