export interface GameState {
    isDisplay: boolean;
    userTurn: boolean;
    score: number;
    tileSequence: string[];
    userGuess: string[];
    prevTile: string;
}

export interface StoreState {
    playerScore: number;
    setPlayerScore: (score: number) => void;
}