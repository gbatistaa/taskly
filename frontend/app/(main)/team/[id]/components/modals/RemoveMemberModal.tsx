import React, { useState, useEffect, useCallback } from "react";
import { IoClose, IoWarning } from "react-icons/io5";
import { Vortex } from "react-loader-spinner";

interface RemoveMemberModalProps {
  memberName: string;
  isOwnCard: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

function RemoveMemberModal({ memberName, isOwnCard, onClose, onConfirm }: RemoveMemberModalProps): React.JSX.Element {
  const [loading, setLoading] = useState(false);
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

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    onClose();
  };

  return (
    <section
      className={`top-0 z-50 fixed flex justify-center items-center bg-black/70 w-screen h-screen transition-opacity duration-200 ${isClosing ? "opacity-0" : "opacity-100"}`}
      onClick={handleBackdropClick}
    >
      <main
        className={`box-border flex flex-col gap-8 bg-slate-900 p-6 border border-slate-700 rounded-xl w-125 solid transition-all duration-200 ${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      >
        <header className="flex flex-col gap-2">
          <div className="flex justify-between">
            <h1 className="font-semibold text-2xl">Remove member</h1>
            <button type="button" onClick={handleClose}>
              <IoClose size={24} className="hover:-rotate-90 duration-400 cursor-pointer" />
            </button>
          </div>
          <span className="text-gray-400 text-sm">
            {isOwnCard ? "You are about to leave this team" : "You are about to remove a member from this team"}
          </span>
        </header>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 bg-yellow-500/10 p-4 border border-yellow-500/30 rounded-lg">
            <IoWarning className="w-6 h-6 text-yellow-500 shrink-0" />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-yellow-500 text-sm">Warning</p>
              <p className="text-gray-300 text-sm">
                {isOwnCard ? (
                  <>
                    You will be removed from this team and redirected to the teams page. You will need to be invited
                    again to rejoin.
                  </>
                ) : (
                  <>
                    <span className="font-semibold">{memberName}</span> will be removed from this team and will need to
                    be invited again to rejoin.
                  </>
                )}
              </p>
            </div>
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
              disabled={loading}
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
                <span>{isOwnCard ? "Leave team" : "Remove member"}</span>
              )}
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}

export default RemoveMemberModal;
