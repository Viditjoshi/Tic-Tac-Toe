import { useEffect, useState } from "react";

const Square = ({ value, onClick, highlight, theme }) => {
    return (
        <button
            onClick={onClick}
            className={`border-2 float-left h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 text-2xl lg:text-4xl p-0 text-center transition-transform duration-300 ${highlight ? "bg-green-400 animate-pulse" : `hover:bg-${theme === 'dark' ? 'gray-600' : 'gray-200'}`
                } ${theme === "dark"
                    ? "bg-gray-800 text-white border-gray-500"
                    : "bg-gray-200 text-black border-gray-500"
                }`}
        >
            {value}
        </button>
    );
};

const TicTacToe = () => {
    const [squares, setSquares] = useState(Array(9).fill(""));
    const [isXTurn, setIsXTurn] = useState(true);
    const [status, setStatus] = useState("");
    const [winningSquares, setWinningSquares] = useState([]);
    const [theme, setTheme] = useState("light");

    const handleClick = (index) => {
        if (GetWinner(squares) || squares[index]) return;
        const newSquares = squares.slice();
        newSquares[index] = isXTurn ? "X" : "O";
        setSquares(newSquares);
        setIsXTurn(!isXTurn);
    };

    const GetWinner = (squares) => {
        const winningPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                setWinningSquares(pattern);
                return squares[a];
            }
        }
        return null;
    };

    const resetGame = () => {
        setSquares(Array(9).fill(""));
        setIsXTurn(true);
        setStatus("");
        setWinningSquares([]);
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        const winner = GetWinner(squares);
        if (winner) {
            setStatus(`Winner is ${winner}! Please restart the game.`);
        } else if (squares.every((square) => square !== "")) {
            setStatus("It's a draw! Please restart the game.");
        } else {
            setStatus(`Next turn: ${isXTurn ? "X" : "O"}`);
        }
    }, [squares, isXTurn]);

    return (
        <div className={`flex flex-col items-center pt-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen`}>
            <button
                onClick={toggleTheme}
                className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 transition-all duration-300"
            >
                Toggle {theme === "light" ? "Dark" : "Light"} Theme
            </button>
            <div className="grid grid-cols-3 gap-1">
                {squares.map((value, index) => (
                    <Square
                        key={index}
                        value={value}
                        onClick={() => handleClick(index)}
                        highlight={winningSquares.includes(index)}
                        theme={theme}
                    />
                ))}
            </div>
            <h1 className="text-lg font-semibold mt-4 text-center animate-fade-in">{status}</h1>
            <button
                onClick={resetGame}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-all duration-300"
            >
                Restart Game
            </button>
        </div>
    );
};

export default TicTacToe;
