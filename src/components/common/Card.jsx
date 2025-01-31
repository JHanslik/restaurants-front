export const Card = ({
  children,
  className = "",
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      className={`
        bg-white
        rounded-lg
        shadow-md
        p-6
        ${hoverable ? "hover:shadow-lg transition-shadow cursor-pointer" : ""}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
