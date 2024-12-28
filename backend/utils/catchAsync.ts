export default function catchAsync(fn) {
   try{
       fn();
   }catch(e){
       console.log(e);
   }
}