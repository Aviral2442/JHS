import React from "react";
import '../../index.css';

interface HeroProps {
  title: string;
  highlightedText?: string;
  subtitle?: string;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  align?: "left" | "center";
}

const CommonHero: React.FC<HeroProps> = ({
  title,
  highlightedText,
  subtitle,
  primaryBtnText,
  secondaryBtnText,
  onPrimaryClick,
  onSecondaryClick,
  align = "center",
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl animate-pulse delay-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 py-20">
        <div
          className={`w-full ${
            align === "center"
              ? "text-center items-center"
              : "text-left items-start"
          } flex flex-col`}
        >
          {/* Title */}
          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl animate-fadeInUp">
            {title}{" "}
            {highlightedText && (
              <span className="bg-linear-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                {highlightedText}
              </span>
            )}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl animate-fadeInUp delay-150">
              {subtitle}
            </p>
          )}

          {/* Buttons */}
          {(primaryBtnText || secondaryBtnText) && (
            <div className="mt-10 flex flex-wrap gap-4 animate-fadeInUp delay-300">
              {primaryBtnText && (
                <button
                  onClick={onPrimaryClick}
                  className="rounded-xl bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:scale-105"
                >
                  {primaryBtnText}
                </button>
              )}

              {secondaryBtnText && (
                <button
                  onClick={onSecondaryClick}
                  className="rounded-xl border border-white/20 px-8 py-3 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/10 hover:scale-105"
                >
                  {secondaryBtnText}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommonHero;
