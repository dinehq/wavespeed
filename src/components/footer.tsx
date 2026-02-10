import Logo from "@/images/logo.svg";

const platformLinks = ["Image Models", "Video Models", "API Docs", "Status"];
const legalLinks = ["Terms of Service", "Privacy Policy", "Security"];
const socialLinks = ["GitHub", "Discord", "Twitter"];

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 px-20 pt-20 pb-12">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex gap-12 mb-16">
          {/* Logo + tagline */}
          <div className="w-[720px]">
            <div className="mb-10">
              <Logo className="h-6 w-auto text-white" />
            </div>
            <p className="font-mono text-xs text-[#737373] uppercase leading-[19.5px]">
              The All-in-One API for Inference.
            </p>
          </div>

          {/* Platform links */}
          <div className="flex flex-col gap-6 w-[336px]">
            <h4 className="font-mono text-xs font-bold text-footer-label tracking-[1.2px] uppercase leading-4">
              Platform
            </h4>
            <div className="flex flex-col gap-4">
              {platformLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-mono text-xs text-[#737373] leading-4 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-6 w-[336px]">
            <h4 className="font-mono text-xs font-bold text-footer-label tracking-[1.2px] uppercase leading-4">
              Legal
            </h4>
            <div className="flex flex-col gap-4">
              {legalLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-mono text-xs text-[#737373] leading-4 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-4 flex items-end justify-between">
          <p className="font-mono text-[10px] text-footer-text tracking-[1px] uppercase leading-[15px]">
            &copy; 2026 WAVESPEED
          </p>
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-mono text-[10px] text-footer-text tracking-[1px] uppercase leading-[15px] hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
