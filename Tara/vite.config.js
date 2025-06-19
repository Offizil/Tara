import { defineConfig } from 'vite'
import { resolve } from "path";


export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),        
        // signup: resolve(__dirname, "src/signup.html"),
        // welcome: resolve(__dirname, "src/welcome.html"),
       
      },
    },
  },
});








// ---------------------------------
// import { defineConfig } from 'vite'

// export default defineConfig({
//   root: 'src/',

//   build: {
//     outDir: 'dist',  
//         rollupOptions: {
//       input: {
//         main: 'index.html',
//         signup: 'sign_up.html',
//         welcome: 'welcome.html',
//       },
//     },
//   },
// })
