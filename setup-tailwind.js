import fs from "fs";

fs.writeFileSync(
  "tailwind.config.js",
  `export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};`
);

fs.writeFileSync(
  "postcss.config.js",
  `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`
);

console.log("Tailwind CSS configuration files have been created successfully.");