import {
  useState,
  FunctionComponent,
  useContext,
  useEffect,
  FormEvent,
} from "react";
import { AuthContext, AuthValue } from "../context/AuthContext";
import Modal from "./Modal";
import { CgSpinner } from "react-icons/cg";
import ErrorCard from "./ErrorCard";

type LoginModalSubmitFunction = "login" | "register";

type LoginModalProps = {
  showModal: boolean;
  onClose: () => void;
};

const LoginModal: FunctionComponent<LoginModalProps> = ({
  showModal,
  onClose,
}) => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitFunction, setSubmitFunction] =
    useState<LoginModalSubmitFunction>("login");
  const [error, setError] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const { createUser, loginUser, loadingUser, authError } = useContext(
    AuthContext,
  ) as AuthValue;

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    setError(authError);
  }, [authError, mounted]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (submitFunction === "login") {
      loginUser(email, password).then((result) => {
        if (result) {
          onClose();
          clearForm();
        }
      });
    }

    if (submitFunction === "register") {
      if (password.length < 6) {
        setError("Password should be at least 6 characters");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      createUser(email, password).then((result) => {
        if (result) {
          onClose();
          clearForm();
        }
      });
    }
  };

  const clearForm = () => {
    setError("");
    setemail("");
    setPassword("");
    setConfirmPassword("");
  };

  const closeForm = () => {
    clearForm();
    onClose();
  };

  return (
    <Modal
      showModal={showModal}
      onClose={() => closeForm()}
      title={submitFunction === "login" ? "Log in" : "Sign up"}
    >
      <div className="flex w-96 flex-col justify-between px-4">
        <form onSubmit={handleSubmit}>
          {error && <ErrorCard error={error} onClose={() => setError("")} />}
          <div className="flex flex-col justify-center gap-3 p-4 align-middle">
            <input
              className="login-input"
              type="email"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
            <input
              className="login-input"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {submitFunction === "register" && (
              <input
                className="login-input"
                type="password"
                id="confirmpassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
          </div>
          <div className="flex justify-center p-4">
            <button
              className="button flex h-9 w-40 justify-center py-2"
              type="submit"
            >
              {loadingUser ? (
                <CgSpinner className="animate-spin text-lg" />
              ) : submitFunction === "login" ? (
                "Log in"
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
        <div className="mt-2 text-center">
          <hr className="py-2" />
          {submitFunction === "login" && (
            <div>
              Dont have an account?
              <button
                className="ml-1 text-violet-700 underline hover:cursor-pointer"
                onClick={() => {
                  setSubmitFunction("register");
                  clearForm();
                }}
              >
                Sign up
              </button>
            </div>
          )}
          {submitFunction === "register" && (
            <div>
              Already have an account?
              <button
                className="ml-1 text-violet-700 underline hover:cursor-pointer"
                onClick={() => {
                  setSubmitFunction("login");
                  clearForm();
                }}
              >
                Log in
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
