interface BoardProps {
    children: React.ReactNode;
}

const Board: React.FC<BoardProps> = ({ children }) => {
    return (
        <div className="w-full h-[70vh] bg-blue-500 flex items-center justify-center">
            <div className="flex p-2 mb-6 text-center justify-center">
                {children}
            </div>
        </div>
    );
};

export default Board;