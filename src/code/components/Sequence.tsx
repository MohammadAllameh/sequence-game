// import { useEffect, useState } from 'react';
// import useStore from '../store/store';
// import Board from './Board';
// import Titlescreen from './Titlescreen';
// import Level from './Level';
// import { timeout } from '../utils/timeout';
// import { GameState } from '../types/types';

// const Sequence: React.FC = () => {
//     const [isOn, setIsOn] = useState<boolean>(false);
//     const [isOver, setIsOver] = useState<boolean>(false);
//     const numberList: string[] = Array.from(Array(9).keys()).map((i) => i.toString());

//     const initPlay: GameState = {
//         isDisplay: false,
//         userTurn: false,
//         score: 0,
//         tileSequence: [],
//         userGuess: [],
//         prevTile: ''
//     };

//     const [play, setPlay] = useState<GameState>(initPlay);
//     const [flashTile, setFlashTile] = useState<string>('');
//     const { playerScore, setPlayerScore } = useStore();

//     useEffect(() => {
//         if (isOn) {
//             setPlay({ ...initPlay, isDisplay: true });
//         } else {
//             setPlay(initPlay);
//         }
//     }, [isOn]);

//     useEffect(() => {
//         if (isOn && play.isDisplay) {
//             let tileID = Math.floor(Math.random() * 9);
//             if (
//                 play.tileSequence.length > 0 &&
//                 numberList[tileID] === play.prevTile
//             ) {
//                 if (tileID === 8) {
//                     tileID = 0;
//                 } else {
//                     tileID++;
//                 }
//             }
//             const newTile = numberList[tileID];
//             const copySequence = [...play.tileSequence];
//             copySequence.push(newTile);
//             setPlay({ ...play, prevTile: newTile, tileSequence: copySequence });
//         }
//     }, [isOn, play.isDisplay, play.tileSequence.length, numberList, play.prevTile]);

//     useEffect(() => {
//         if (isOn && play.isDisplay && play.tileSequence.length) {
//             displayTiles();
//         }
//     }, [isOn, play.isDisplay, play.tileSequence.length]);

//     const displayTiles = async (): Promise<void> => {
//         await timeout(500);
//         for (let i = 0; i < play.tileSequence.length; i++) {
//             await timeout(300);
//             setFlashTile(play.tileSequence[i]);
//             await timeout(300);
//             setFlashTile('');

//             if (i === play.tileSequence.length - 1) {
//                 const copyTiles = [...play.tileSequence];
//                 setPlay({
//                     ...play,
//                     isDisplay: false,
//                     userTurn: true,
//                     userGuess: copyTiles.reverse()
//                 });
//             }
//         }
//     };

//     const tileClickHandle = async (number: string): Promise<void> => {
//         if (!play.isDisplay && play.userTurn) {
//             const copyTiles = [...play.userGuess];
//             const lastColor = copyTiles.pop();
//             setFlashTile(number);

//             if (number === lastColor) {
//                 if (copyTiles.length) {
//                     setPlay({ ...play, userGuess: copyTiles });
//                 } else {
//                     setPlay({
//                         ...play,
//                         isDisplay: true,
//                         userTurn: false,
//                         score: play.tileSequence.length,
//                         userGuess: []
//                     });
//                 }
//             } else {
//                 await timeout(200);
//                 setPlayerScore(play.score);
//                 setPlay({
//                     ...initPlay,
//                     score: play.tileSequence.length
//                 });
//                 setIsOn(false);
//                 setIsOver(true);
//             }
//             await timeout(200);
//             setFlashTile('');
//         }
//     };

//     if (isOn) {
//         return (
//             <Board>
//                 <div>
//                     <Level>{play.score}</Level>
//                     <div className="grid grid-cols-3 gap-5">
//                         {numberList.map((v) => (
//                             <button
//                                 key={v}
//                                 className={`bg-white p-14 rounded-md transition-opacity ${flashTile === v ? 'opacity-100' : 'opacity-20'
//                                     }`}
//                                 onClick={() => tileClickHandle(v)}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </Board>
//         );
//     }

//     if (isOver) {
//         return (
//             <Board>
//                 <div className="text-center">
//                     <h1 className="text-4xl text-white p-4">
//                         Sequence Memory
//                     </h1>
//                     <h2 className="text-5xl text-white">
//                         Level: {playerScore}
//                     </h2>
//                     <button
//                         className="mt-10 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-8 rounded-lg transition-colors"
//                         onClick={() => {
//                             setIsOn(true);
//                             setIsOver(false);
//                         }}
//                     >
//                         Play again
//                     </button>
//                 </div>
//             </Board>
//         );
//     }

//     return (
//         <Board>
//             <Titlescreen
//                 title="Sequence Memory"
//                 symbol="🧠"
//                 button="Start"
//                 onStatusChange={setIsOn}
//             >
//                 Remember the sequence of tiles!
//             </Titlescreen>
//         </Board>
//     );
// };

// export default Sequence;
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface BoardProps {
    children: React.ReactNode;
}

interface LevelProps {
    children: React.ReactNode;
}

interface TitlescreenProps {
    onStatusChange: (status: boolean) => void;
}

const Board: React.FC<BoardProps> = ({ children }) => (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-4 flex-col space-y-16">
        {children}
    </div>
);

const Level: React.FC<LevelProps> = ({ children }) => (
    <div className="text-4xl text-white text-center mb-8">Level: {children}</div>
);

const Titlescreen: React.FC<TitlescreenProps> = ({ onStatusChange }) => (
    <div className="text-center">
        <h1 className="text-4xl text-white mb-4">Sequence Memory</h1>
        <p className="text-xl text-white mb-8">Remember the sequence of tiles!</p>
        <button
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-8 rounded-lg"
            onClick={() => onStatusChange(true)}
        >
            Start
        </button>
    </div>
);

interface PlayState {
    isDisplay: boolean;
    userTurn: boolean;
    currentSequenceIndex: number;
    userClicks: number;
}

const SequenceGame: React.FC = () => {
    const [isOn, setIsOn] = useState<boolean>(false);
    const [isOver, setIsOver] = useState<boolean>(false);
    const [currentLevel, setCurrentLevel] = useState<number>(1);
    const [gameSequence, setGameSequence] = useState<string[]>([]);
    const numberList: string[] = Array.from(Array(9).keys()).map((i) => i.toString());

    const initPlay: PlayState = {
        isDisplay: false,
        userTurn: false,
        currentSequenceIndex: 0,
        userClicks: 0
    };

    const [play, setPlay] = useState<PlayState>(initPlay);
    const [flashTile, setFlashTile] = useState<string>('');

    useEffect(() => {
        if (isOn && gameSequence.length === 0) {
            // Start with currentLevel number of tiles
            const newSequence: string[] = [];
            for (let i = 0; i < currentLevel; i++) {
                let newTile: string;
                do {
                    newTile = numberList[Math.floor(Math.random() * 9)];
                } while (
                    newSequence.length > 0 &&
                    newTile === newSequence[newSequence.length - 1]
                );
                newSequence.push(newTile);
            }
            setGameSequence(newSequence);
            setPlay({
                ...initPlay,
                isDisplay: true
            });
        }
    }, [isOn]);

    useEffect(() => {
        if (isOn && currentLevel > gameSequence.length) {
            // Add currentLevel - prevLevel new tiles
            const newTiles: string[] = [...gameSequence];
            const tilesToAdd = currentLevel - gameSequence.length;

            for (let i = 0; i < tilesToAdd; i++) {
                let newTile: string;
                do {
                    newTile = numberList[Math.floor(Math.random() * 9)];
                } while (
                    newTiles.length > 0 &&
                    newTile === newTiles[newTiles.length - 1]
                );
                newTiles.push(newTile);
            }

            setGameSequence(newTiles);
            setPlay({
                ...initPlay,
                isDisplay: true
            });
        }
    }, [currentLevel, isOn]);

    const timeout = (ms: number): Promise<void> =>
        new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        if (isOn && play.isDisplay && gameSequence.length > 0) {
            displayTiles();
        }
    }, [play.isDisplay, gameSequence]);

    const displayTiles = async (): Promise<void> => {
        await timeout(500);

        for (let i = 0; i < gameSequence.length; i++) {
            setFlashTile(gameSequence[i]);
            await timeout(500);
            setFlashTile('');
            await timeout(200);
        }

        setPlay({
            ...play,
            isDisplay: false,
            userTurn: true,
            currentSequenceIndex: 0,
            userClicks: 0
        });
    };

    const tileClickHandle = async (number: string): Promise<void> => {
        if (!play.isDisplay && play.userTurn) {
            setFlashTile(number);

            if (number === gameSequence[play.currentSequenceIndex]) {
                const newUserClicks = play.userClicks + 1;

                if (newUserClicks === gameSequence.length) {
                    await timeout(200);
                    setFlashTile('');

                    if (currentLevel < 50) {
                        setCurrentLevel(prev => prev + 1);
                    } else {
                        setIsOn(false);
                        setIsOver(true);
                    }
                } else {
                    setPlay({
                        ...play,
                        currentSequenceIndex: play.currentSequenceIndex + 1,
                        userClicks: newUserClicks
                    });
                }
            } else {
                await timeout(200);
                setIsOn(false);
                setIsOver(true);
            }

            await timeout(200);
            setFlashTile('');
        }
    };

    const restartGame = (): void => {
        setGameSequence([]);
        setCurrentLevel(1);
        setIsOver(false);
        setIsOn(true);
    };

    if (isOn) {
        return (
            <>
                <Board>
                    <div>
                        <Level>{currentLevel}</Level>
                        <div className="grid grid-cols-3 gap-5 w-96">
                            {numberList.map((v) => (
                                <button
                                    key={v}
                                    className={`bg-white w-28 h-28 rounded-md transition-opacity duration-200 ${flashTile === v ? 'opacity-100' : 'opacity-20'
                                        }`}
                                    onClick={() => tileClickHandle(v)}
                                />
                            ))}
                        </div>
                    </div>
                    <h2>by: <Link href='https://mohammadallameh.ir/' className='underline text-red-400'>Mohammad Allameh</Link></h2>

                </Board>

            </>

        );
    }

    if (isOver) {
        return (
            <>
                <Board>
                    <div className="text-center">
                        <h1 className="text-4xl text-white mb-4">Game Over!</h1>
                        <h2 className="text-5xl text-white mb-8">Level Reached: {currentLevel}</h2>
                        <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-8 rounded-lg"
                            onClick={restartGame}
                        >
                            Play again
                        </button>
                    </div>
                    <h2>by: <Link href='https://mohammadallameh.ir/' className='underline text-red-400'>Mohammad Allameh</Link></h2>
                </Board>
            </>

        );
    }

    return (
        <>
            <Board>
                <Titlescreen onStatusChange={setIsOn} />
                <h2>by: <Link href='https://mohammadallameh.ir/' className='underline text-red-400'>Mohammad Allameh</Link></h2>

            </Board>
        </>
    );
};

export default SequenceGame;