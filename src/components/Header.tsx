import { useContext, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { MdOutlineTaskAlt } from "react-icons/md";
import { AuthContext, AuthValue } from "../context/AuthContext";
import LoginModal from "./LoginModal";

const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logOut, loadingUser } = useContext(AuthContext) as AuthValue;

  return (
    <header className="fixed top-0 flex h-20 w-full justify-center bg-violet-700 text-white shadow-lg">
      <nav className="mx-8 grid max-w-6xl grow grid-cols-3 py-5">
        <div className="flex items-center">
          <MdOutlineTaskAlt className="text-2xl" />
          <h1 className="ml-1 text-xl font-semibold">Todo list</h1>
        </div>
        <div className="flex items-center justify-center">
          <h3 className="text-center text-sm text-purple-100">
            {loadingUser ? (
              <CgSpinner className="animate-spin text-lg" />
            ) : user ? (
              `Hello, ${user.email}`
            ) : (
              "Log in to save your todos!"
            )}
          </h3>
        </div>
        <div className="flex flex-row-reverse items-center text-right">
          {loadingUser ? (
            <CgSpinner className="animate-spin text-lg" />
          ) : user ? (
            <button className="button--light" onClick={logOut}>
              Log out
            </button>
          ) : (
            <button
              className="button--light"
              onClick={() => setShowLoginModal(true)}
            >
              Log in
            </button>
          )}
          {showLoginModal && (
            <LoginModal
              onClose={() => setShowLoginModal(false)}
              showModal={showLoginModal}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
