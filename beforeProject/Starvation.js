function repeat(){
  console.log("hiii");
  process.nextTick(repeat);
}
repeat();

setTimeout(()=>{
  console.log("entered in the event loop");
},0);