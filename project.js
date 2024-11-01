const prompt = require("prompt-sync")();
const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT =
{
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}
const SYMBOLS_VALUE = 
{
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2, 
}

const GetDeposit = () =>
{
    while (true)
    {
        const deposit = prompt("Enter the amount of money that you want to play with: ");
        const NumDeposit = parseFloat(deposit);
        if (isNaN(NumDeposit) || NumDeposit < 0)
        {
            console.log("Invalid amount entered. Please try again");
        }
        else
        {
            return NumDeposit;
        }
    }
};
const GetLine = () =>
    {
        while (true)
        {
            const Line = prompt("Enter the number of lines that you want to play with(1-3): ");
            const Linenumber = parseFloat(Line);
            if (isNaN(Linenumber) || Linenumber < 0 || Linenumber > 3)
            {
                console.log("Invalid line number entered, try again");
            }
            else
            {
                return Linenumber;
            }
        }
    };
const Getbet = (balance, lines) =>
{
    while (true)
        {
            const bet = prompt("Enter the bet per line: ");
            const BetNumber = parseFloat(bet);
            if (isNaN(BetNumber) || BetNumber < 0 || BetNumber * lines > balance)
            {
                console.log("Invalid bet, try again");
            }
            else
            {
                return BetNumber;
            }
        } 
};
const Spin = () =>
{
    const symbols = [];
    for (const[symbol, count] of Object.entries(SYMBOLS_COUNT))
    {
        for (let i = 0; i < count; i++)
        {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i = 0; i < COLS; i++)
    {
        reels.push([]);
        reelsValue = [...symbols];
        for (let j = 0; j < ROWS; j++)
        {
            randomindex = Math.floor(Math.random() * reelsValue.length);
            reels[i].push(reelsValue[randomindex]);
            reelsValue.splice(randomindex, 1);    
        }
    }
    return reels;
}
let balance = GetDeposit();
const lines = GetLine();
const bet = Getbet(balance, lines);
const reels = Spin();
console.log(reels);


