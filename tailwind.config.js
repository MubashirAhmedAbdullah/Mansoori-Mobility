/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0F172A",
        ocean: "#102B40",
        action: "#2563EB",
        trust: "#0D9488",
        mint: "#11C8A5",
        canvas: "#F4F8FB",
        muted: "#64748B",
        line: "#E2E8F0",
        amber: "#F59E0B"
      },
      boxShadow: {
        soft: "0 8px 28px rgba(15, 23, 42, 0.06)",
        lift: "0 16px 38px rgba(15, 23, 42, 0.12)"
      },
      borderRadius: { panel: "14px" }
    }
  },
  plugins: []
};
