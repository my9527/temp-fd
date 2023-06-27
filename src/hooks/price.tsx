
import React, { createContext, useContext, useEffect, useState } from "react";



export const PriceContext = createContext({
    fil: 0,
});

interface PriceProvderProps {
    children:  React.ReactNode
}



export const PriceProvider = ({ children }: PriceProvderProps) => {

    const [filPrice, updateFilPrice] = useState(0);

    useEffect(() =>{
        async function _init() {
            let result = null;
            try{
              result = await fetch("https://data.filedoge.io/api/swap/price")
            // result = await fetch("http://localhost:3000/swap/price")
              .then(res => res.json())
              .catch(e => console.log("getFilPrice fetch ", e))
            } catch(e) {
              console.log('getFilPrice error', e);
            }
      
            if(result && result?.filecoin.usd) {
                updateFilPrice(result?.filecoin.usd);
            }
      
        }

        _init();

        let intervalId = setInterval(() => {
            _init();
        }, 30 * 1000);
        return () => {
            if(intervalId) {
                clearInterval(intervalId);
            }
        }
    }, []);



    return (
    <PriceContext.Provider value={{ fil: filPrice }}>
        {children}
    </PriceContext.Provider>
    );
}

export const useFilUSDPrice = () => {
    const { fil } = useContext(PriceContext)
    return fil;
}