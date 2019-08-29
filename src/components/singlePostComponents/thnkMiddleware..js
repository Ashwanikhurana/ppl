

 export const setFlag = () =>  async (dispatch , getState) => {
   console.log("thunk...")

  // const ash = await (function(){return " i am called"})()

  dispatch({type : "TEST"});
   
 }
