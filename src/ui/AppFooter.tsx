const AppFooter = () => {
  return (
    <footer className="footer absolute bottom-0 py-4 bg-inherit w-full max-w-2xl text-center z-50">
      <div className="content has-text-centered">
        <p>
          <strong className="font-semibold">WikiSearch</strong> by{" "}
          <a
            href="https://github.com/jessej-samuel/"
            className="text-blue-500 hover:underline"
          >
            Jessej Samuel
          </a>
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
