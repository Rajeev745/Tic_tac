import React, { useState, useEffect } from "react";
import Square from "./Square";
import { pattern } from './Pattern'
import Winner from "./Winner";

export default function () {
    const [board, setboard] = useState(["", "", "", "", "", "", "", "", ""])
    const [player, setplayer] = useState("p1")
    const [wincon, setWincon] = useState({
        winner: player,
        state: "none"
    })
    useEffect(() => {
        if (player == "X") {
            setplayer("O")
        } else {
            setplayer("X")
        }
        Tie()
        win()
    }, [board])



    const handleClick = (square) => {

        setboard(
            board.map((val, idx) => {
                if (idx == square && val == "") {
                    return player;
                }
                return val;
            })
        )

    }


    const win = () => {
        pattern.forEach((val) => {
            const p1 = board[val[0]];
            if (p1 == "") return;
            let win = true;
            val.forEach((idx) => {
                if (board[idx] != p1) {
                    win = false;
                }
            })
            if (win) {
                setWincon({
                    winner: player,
                    state: "winnner"
                })
            }
        })
    }

    const Tie = () => {
        let filles = true;
        board.forEach((square) => {
            if (square == "") {
                filles = false;
            }
        })
        if (filles) {
            setWincon({ winner: "No Winner", state: "Draw" })
        }
    }
    useEffect(() => {
        if (wincon.state != "none") {
            if (wincon.winner == "X") {
                document.querySelector(".winner1").style.display = 'block'
                // Restart()
            } else if (wincon.winner == "O") {
                document.querySelector(".winner2").style.display = 'block'
                // Restart()
            }else if(wincon.winner == "No Winner"){
                document.querySelector(".winner3").style.display = 'block'
                // Restart()
            }

            // alert(`Game over winner is ${wincon.winner}`)
            
        }
    }, [wincon])


    const Restart = () => {
        setboard(["", "", "", "", "", "", "", "", "",])
        setplayer("O")
        document.querySelector(".winner1").style.display = 'none'
        document.querySelector(".winner2").style.display = 'none'
        document.querySelector(".winner3").style.display = 'none'
    }
    return (
        <div className="content">
            <Winner ></Winner>
            <div className="rows">
                <Square value={board[0]}
                    handleClick={() => { handleClick(0) }} />
                <Square value={board[1]}
                    handleClick={() => { handleClick(1) }} />
                <Square value={board[2]}
                    handleClick={() => { handleClick(2) }} />
            </div>
            <div className="rows">
                <Square value={board[3]}
                    handleClick={() => { handleClick(3) }} />
                <Square value={board[4]}
                    handleClick={() => { handleClick(4) }} />
                <Square value={board[5]}
                    handleClick={() => { handleClick(5) }} />
            </div>
            <div className="rows">
                <Square value={board[6]}
                    handleClick={() => { handleClick(6) }} />
                <Square value={board[7]}
                    handleClick={() => { handleClick(7) }} />
                <Square value={board[8]}
                    handleClick={() => { handleClick(8) }} />
            </div>
            <button className="restart" onClick={Restart}>RESTART</button>
        </div>
    )
}