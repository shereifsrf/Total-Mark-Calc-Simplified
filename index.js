const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  const bigData = [];
  
  const processItAll = () => {
    let totalCp = 0;
    const result = bigData.reduce((prev, next) => {
      if (prev.hasOwnProperty("cp")) {
        const result = doMath(totalCp, prev.cp, prev.mk, 0);
        prev = result.result;
        totalCp = result.totalCp;
      }
      const result = doMath(totalCp, next.cp, next.mk, prev);
      totalCp = result.totalCp;
      return result.result;
    });
    console.log(`cp: ${totalCp}, res: ${(result / totalCp) * 100}`);
  };
  
  const doMath = (tCp, cp, mk, prev) => {
    const result = prev + parseInt(cp) * (parseFloat(mk) / 100);
    const totalCp = tCp + parseInt(cp);
    return { result, totalCp };
  };
  
  const userInput = () => {
    rl.question("credit points: ", (cp) => {
      if (cp === "q") {
        processItAll();
        rl.close();
      } else {
        credit = cp;
        rl.question(`Marks for ${cp} cp is: `, (mk) => {
          bigData.push({ cp, mk });
  
          // console.log(bigData);
          userInput();
        });
      }
    });
  };
  
  userInput();