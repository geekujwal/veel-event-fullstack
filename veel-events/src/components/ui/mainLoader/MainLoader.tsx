function MainLoader() {
  return (
    <div className="fixed z-[99999] bg-primaryBlueLight inset-[0px] flex items-center">
      <div className="flex flex-col w-full">
        <div className="h-[140px]">
          <img
            src="/loader/loader.gif"
            className="w-full h-full object-contain drop-shadow-md"
            alt=""
          />
        </div>
        <h2 className="text-white drop-shadow-md text-center">Loading...</h2>
      </div>
    </div>
  );
}

export default MainLoader;
