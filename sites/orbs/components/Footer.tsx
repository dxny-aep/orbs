import React from 'react';

export function Footer() {
  return (
    <footer className="text-[13px] leading-[14px] text-center pt-12 pb-6">
      <a
        className="text-(--footer-name) no-underline transition-colors duration-150 hover:text-(--footer-name-hover)"
        href="https://x.com/uidxny"
        target="_blank"
        rel="noopener noreferrer"
      >
        x.com/uidxny
      </a>
    </footer>
  );
}
