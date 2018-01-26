var maxTime= 1000;
// if input is even, double it 
//if input is odd, error
//(call takes random amount of time <1s)

var evenDoubler=function(v,callback){
    var waitTime = Math.floor(Math.random()*(maxTime+1));
        if(v%2){
            setTimeout(function(){
                callback(new Error("odd input"));
            },waitTime);
        }else{
            setTimeout(function(){
                callback(null,v*2,waitTime);
            },waitTime);
        }
};
var handleResults = function(error,results,time){
    if (err){
        console.log("ERROR" + err.message);
    }   else{
        console.log("The Results are :" + results+" (" +time+ " ms)." );
    }
};

module.exports.evenDoubler = evenDoubler;
module.exports.foo='bar';