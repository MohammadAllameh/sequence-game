interface LevelProps {
    children: React.ReactNode;
}

const Level: React.FC<LevelProps> = ({ children }) => {
    return (
        <div className="text-4xl font-bold text-white mb-6">
            Level: {children}
        </div>
    );
};

export default Level;