## cube-pts-pack

- How To
- Run in Production
   inorder to run it , just create index.html file, Run `npm i cube-particles-pack1@1.0.0` .
    then refrence the index.js from the root dir of package from node_modules
- Run in Dev
   NOTE: Project is being written in Typescript and transpiled into es6 JS

   inorder to run it , just create index.html file, Run `npm i` .
    then refrence the index.js from the root dir of the working directory

### TODOS / Road Map
 - Cleaner code
 - Refactoring (Reduce code lines, break up functions, isolate modules)
 - Flexibility with optional input data
 - Chain an onLoad event to notify user particle is active
 - Add A few starter docs
 - Deploy to Dev env on a template for previewing
 - Deploy to Prod

### Contributors
- [Apostolis Ntaskas](https://github.com/ApostolisNt)
- [Fabio Saraseli](https://github.com/Fabio012119)
- [Gxp](https://github.com/safeplace12345)


### How To Use

> HTML 
    `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body></body>
    <script src="./node_modules/cube-pts-pack/index.js"></script>
    <script >
        const config = {
            connectionThreshold :170,
            particlesNumber : 50,
            particlesSpeed : 1
        }
        createParticlesBackDrop(config)
    </script>
</html>`

> React
    ``