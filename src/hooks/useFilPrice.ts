import { useEffect, useState } from "react"

export  function useFilPrice() {
    const [usdPerFil, setUsdPerFile] = useState();

    useEffect(() => {
      async function _init() {
          let result = null;
          try{
            result = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=filecoin&vs_currencies=usd")
            .then(res => res.json())
            .catch(e => console.log("getFilPrice fetch ", e))
          } catch(e) {
            console.log('getFilPrice error', e);
          }
    
          if(result && result?.filecoin.usd) {
            setUsdPerFile(result?.filecoin.usd);
          }
    
          console.log("getFilPrice", result);  
      }
      _init();
   }, [])

   return usdPerFil;

}
