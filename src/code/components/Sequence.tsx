import { useEffect, useState } from 'react';
import useStore from '../store/store';
import Board from './Board';
import Titlescreen from './Titlescreen';
import Level from './Level';
import { timeout } from '../utils/timeout';
import { GameState } from '../types/types';

const Sequence: React.FC = () => {
    const [isOn, setIsOn] = useState<boolean>(false);
    const [isOver, setIsOver] = useState<boolean>(false);
    const numberList: string[] = Array.from(Array(9).keys()).map((i) => i.toString());

    const initPlay: GameState = {
        isDisplay: false,
        userTurn: false,
        score: 0,
        tileSequence: [],
        userGuess: [],
        prevTile: ''
    };

    const [play, setPlay] = useState<GameState>(initPlay);
    const [flashTile, setFlashTile] = useState<string>('');
    const { playerScore, setPlayerScore } = useStore();

    useEffect(() => {
        if (isOn) {
            setPlay({ ...initPlay, isDisplay: true });
        } else {
            setPlay(initPlay);
        }
    }, [isOn]);

    useEffect(() => {
        if (isOn && play.isDisplay) {
            let tileID = Math.floor(Math.random() * 9);
            if (
                play.tileSequence.length > 0 &&
                numberList[tileID] === play.prevTile
            ) {
                if (tileID === 8) {
                    tileID = 0;
                } else {
                    tileID++;
                }
            }
            const newTile = numberList[tileID];
            const copySequence = [...play.tileSequence];
            copySequence.push(newTile);
            setPlay({ ...play, prevTile: newTile, tileSequence: copySequence });
        }
    }, [isOn, play.isDisplay, play.tileSequence.length, numberList, play.prevTile]);

    useEffect(() => {
        if (isOn && play.isDisplay && play.tileSequence.length) {
            displayTiles();
        }
    }, [isOn, play.isDisplay, play.tileSequence.length]);

    const displayTiles = async (): Promise<void> => {
        await timeout(500);
        for (let i = 0; i < play.tileSequence.length; i++) {
            await timeout(300);
            setFlashTile(play.tileSequence[i]);
            await timeout(300);
            setFlashTile('');

            if (i === play.tileSequence.length - 1) {
                const copyTiles = [...play.tileSequence];
                setPlay({
                    ...play,
                    isDisplay: false,
                    userTurn: true,
                    userGuess: copyTiles.reverse()
                });
            }
        }
    };

    const tileClickHandle = async (number: string): Promise<void> => {
        if (!play.isDisplay && play.userTurn) {
            const copyTiles = [...play.userGuess];
            const lastColor = copyTiles.pop();
            setFlashTile(number);

            if (number === lastColor) {
                if (copyTiles.length) {
                    setPlay({ ...play, userGuess: copyTiles });
                } else {
                    setPlay({
                        ...play,
                        isDisplay: true,
                        userTurn: false,
                        score: play.tileSequence.length,
                        userGuess: []
                    });
                }
            } else {
                await timeout(200);
                setPlayerScore(play.score);
                setPlay({
                    ...initPlay,
                    score: play.tileSequence.length
                });
                setIsOn(false);
                setIsOver(true);
            }
            await timeout(200);
            setFlashTile('');
        }
    };

    if (isOn) {
        return (
            <Board>
                <div>
                    <Level>{play.score}</Level>
                    <div className="grid grid-cols-3 gap-5">
                        {numberList.map((v) => (
                            <button
                                key={v}
                                className={`bg-white p-14 rounded-md transition-opacity ${flashTile === v ? 'opacity-100' : 'opacity-20'
                                    }`}
                                onClick={() => tileClickHandle(v)}
                            />
                        ))}
                    </div>
                </div>
            </Board>
        );
    }

    if (isOver) {
        return (
            <Board>
                <div className="text-center">
                    <h1 className="text-4xl text-white p-4">
                        Sequence Memory
                    </h1>
                    <h2 className="text-5xl text-white">
                        Level: {playerScore}
                    </h2>
                    <button
                        className="mt-10 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-8 rounded-lg transition-colors"
                        onClick={() => {
                            setIsOn(true);
                            setIsOver(false);
                        }}
                    >
                        Play again
                    </button>
                </div>
            </Board>
        );
    }

    return (
        <Board>
            <Titlescreen
                title="Sequence Memory"
                symbol="🧠"
                button="Start"
                onStatusChange={setIsOn}
            >
                Remember the sequence of tiles!
            </Titlescreen>
        </Board>
    );
};

export default Sequence;