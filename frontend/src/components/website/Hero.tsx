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
    <section className="relative w-full overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--black-color), var(--gray-color), var(--black-color))' }}>
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(0, 173, 181, 0.2)' }} />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-3xl animate-pulse delay-300" style={{ backgroundColor: 'rgba(0, 173, 181, 0.15)' }} />
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
              <span className="text-primary">
                {highlightedText}
              </span>
            )}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg text-white sm:text-xl animate-fadeInUp delay-150" style={{ opacity: 0.85 }}>
              {subtitle}
            </p>
          )}

          {/* Buttons */}
          {(primaryBtnText || secondaryBtnText) && (
            <div className="mt-10 flex flex-wrap gap-4 animate-fadeInUp delay-300">
              {primaryBtnText && (
                <button
                  onClick={onPrimaryClick}
                  className="btn-primary rounded-xl shadow-lg hover:scale-105"
                >
                  {primaryBtnText}
                </button>
              )}

              {secondaryBtnText && (
                <button
                  onClick={onSecondaryClick}
                  className="btn-outline rounded-xl backdrop-blur hover:scale-105"
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
