function Containerrepair(props) {
  const { className = "", children, ...rest } = props;

  return (
    <div className={`max-w-[1410px] mx-auto px-4   ${className} `} {...rest}>
      {children}
    </div>
  );
}

export default Containerrepair;
