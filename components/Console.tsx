interface ConsoleProps {
  command: string;
  message: string;
}

const Console: React.FC<ConsoleProps> = ({ command, message }) => {
  return (
    <>
      <div className="p-4 mb-1.5">
        <div role="command">
          <p className="text-gray-600">root@controlmc <span className="text-gray-300 font-bold">:</span> {command}</p>
        </div>
        <div role="serverMessage">
          <p className="text-slate-300">
            <span className="text-violet-600 font-bold">[Server]</span> {message}
          </p>
        </div>
      </div>
    </>
  );
};

export default Console;
