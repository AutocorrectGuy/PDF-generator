module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/components/pdf/**/*.{js,jsx}",
    "./src/components/dnd/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'Open-Sans': ["sans-serif"]
      },
    },
  },
  mode: 'jit',
  plugins: [],
}
