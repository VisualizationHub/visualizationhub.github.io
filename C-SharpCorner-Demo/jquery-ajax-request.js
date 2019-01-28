function sampleRequest(i){
//var url='https://jsonplaceholder.typicode.com/todos/1';
var url='https://jsonplaceholder.typicode.com/todos/'+i;
var dfd=$.Deferred();
 $.ajax({url:url,method:"GET",success:function(res){
if(i){
dfd.resolve(res);}
},error:function(xhr){
dfd.reject(xhr);
}
}) 
return dfd.promise();
        }
        
        
        
        
        for(var i=1;i<20;i++){
//console.log(i);
sampleRequest(i).then(r=>console.log(r,i)).fail((err)=>console.log(err))
}

var allDFD=[]


for(var i=1;i<20;i++){
//console.log(i);
allDFD.push(sampleRequest(i));
}
allDFD.then((function(){console.log(this.arguments)})

//Put in queue and resole at once.
$.when(...allDFD).then(function(...ar){console.log(ar)})
