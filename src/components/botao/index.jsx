export const Button = ({ children, onClick }) => {
  return (
    <button
      className="bg-blue-500
    hover:bg-blue-700 
      hover:rounded-xl
      text-white 
      font-bold py-4 px-4 rounded 
      cursor-pointer
      m-4"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
