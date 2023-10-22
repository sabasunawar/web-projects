const generateOptiontags = async () => {
  // =================================================================================================================
  // Get ALL SUPPORTED SYMBOLS
  // =================================================================================================================
  try {
    const response = await fetch(
      "https://currency-conversion-and-exchange-rates.p.rapidapi.com/symbols",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e85abf64e8mshef1bb1ed6d521cfp12e1fejsnf19b0ab80d0a",
          "X-RapidAPI-Host":
            "currency-conversion-and-exchange-rates.p.rapidapi.com",
        },
      }
    );

   
    const data = await response.json();
    console.log(data);
    const allSymbols = await data.symbols;
    console.log(allSymbols);
  
    const currencyCodes =Object.keys(allSymbols);
    console.log(currencyCodes);
    const currencyNames = Object.values(allSymbols);
    console.log(currencyNames);

    // Method for converting an object into an array 
    // const currencyentries = Object.entries(allSymbols);
    // console.log(currencyentries);

    // =================================================================================================================
    // Get ALL OPTION TAGS
    // =================================================================================================================
    
    

      } catch (error) {
    console.log(error);
  }

};

generateOptiontags();
