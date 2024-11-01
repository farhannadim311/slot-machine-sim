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
};
const transpose = (reels) =>
{
   const newArr = [];
   for (let i = 0; i < ROWS; i++)
   {
    newArr.push([]);
    for (let j = 0; j < COLS; j++)
    {
        newArr[i].push(reels[j][i]);
    }
   }
   return newArr;
};
const printRows = (rows) =>
{
    for (const row of rows)
    {
        let rowString = "";
        for (const[i, symbol] of row.entries())
        {
            rowString +=  symbol;
            if (i != row.length - 1)
            {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};
const getWinnings = (rows, bet, lines) =>
{
    let winnings = 0;
    for (let row = 0; row < lines; row++)
    {
        const symbols = rows[row];
        let allSame = true;
        for (const symbol of symbols)
        {
            if (symbol != symbols[0])
            {
                allSame = false
                break;
            }
        }
        if (allSame)
        {
            winnings += bet * SYMBOLS_VALUE[symbols[0]];
        }

    }
    return winnings;
};

const game = () =>
{
    let balance = GetDeposit();
    while (true)
        {
            console.log("You have $" + balance);
            const lines = GetLine();
            const bet = Getbet(balance, lines);
            balance -= bet * lines;
            const reels = Spin();
            const rows = transpose(reels);
            printRows(rows);
            const winning = getWinnings(rows, bet, lines);
            balance += winning;
            console.log("You have won $" + winning);
            if (balance <= 0)
            {
                console.log("You have ran out of money");
            }
            const playAgain = prompt("Do you want to play again (y/n)");
            if (playAgain != 'y') break;
        }
};
    game();

