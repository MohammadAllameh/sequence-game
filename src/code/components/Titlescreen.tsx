interface TitlescreenProps {
    title: string;
    symbol: string;
    button: string;
    children: React.ReactNode;
    onStatusChange: (status: boolean) => void;
}

const Titlescreen: React.FC<TitlescreenProps> = ({
    title,
    symbol,
    button,
    children,
    onStatusChange
}) => {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
            <div className="text-6xl mb-4">{symbol}</div>
            <p className="text-white text-xl mb-8">{children}</p>
            <button
                onClick={() => onStatusChange(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-8 rounded-lg transition-colors"
            >
                {button}
            </button>
        </div>
    );
};

export default Titlescreen;