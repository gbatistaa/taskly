import React, { useState, useEffect, useCallback } from "react";
import { IoClose, IoWarning } from "react-icons/io5";
import { Vortex } from "react-loader-spinner";

interface DeleteTeamModalProps {
  teamName: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

function DeleteTeamModal({ teamName, onClose, onConfirm }: DeleteTeamModalProps): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const REQUIRED_TEXT = "i want to delete my team";
  const isConfirmationValid = confirmationText.toLowerCase() === REQUIRED_TEXT;

  const handleConfirm = async () => {
    if (!isConfirmationValid) return;

    setLoading(true);
    await onConfirm();
    setLoading(false);
    onClose();
  };

  return (
    <section
      className={`top-0 left-0 z-50 fixed inset-0 flex justify-center items-center bg-black/70 w-screen h-screen transition-opacity duration-200 ${isClosing ? "opacity-0" : "opacity-100"}`}
      onClick={handleBackdropClick}
    >
      <main
        className={`box-border flex flex-col gap-6 bg-slate-900 p-6 border border-slate-700 rounded-xl w-125 solid transition-all duration-200 ${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        <header className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl">Delete team</h1>
            <button type="button" onClick={handleClose}>
              <IoClose size={24} className="hover:-rotate-90 duration-400 cursor-pointer" />
            </button>
          </div>
          <span className="text-gray-400 text-sm">This action cannot be undone</span>
        </header>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 bg-red-500/10 p-3 border border-red-500/30 rounded-lg">
            <IoWarning className="w-5 h-5 text-red-500 shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-red-500 text-sm">Danger Zone</p>
              <p className="text-gray-300 text-sm">
                Deleting <span className="font-semibold">{teamName}</span> will permanently remove all team data,
                members, and tasks. This action is irreversible.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmation" className="text-gray-300 text-sm">
              Type <span className="font-semibold text-white">&quot;{REQUIRED_TEXT}&quot;</span> to confirm:
            </label>
            <input
              type="text"
              id="confirmation"
              autoComplete="off"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              className="bg-slate-950 p-2 border border-slate-700 rounded-lg outline-none ring-2 ring-transparent focus:ring-red-500/80 duration-300 ease-out"
              placeholder={REQUIRED_TEXT}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="box-border flex flex-1 justify-center items-center bg-slate-800 hover:bg-slate-700 rounded-lg h-12 font-medium duration-300 ease-out cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!isConfirmationValid || loading}
              className="box-border flex flex-1 justify-center items-center bg-red-500 hover:bg-red-500/60 disabled:opacity-50 rounded-lg h-12 font-medium duration-300 ease-out cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <Vortex
                  visible={true}
                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  wrapperClass="h-5/6"
                  colors={["#EF4444"]}
                />
              ) : (
                <span>Delete team</span>
              )}
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}

export default DeleteTeamModal;
