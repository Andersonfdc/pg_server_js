const express = require('express')
const nunjucks = require('nunjucks')

const server =  express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    noCache: true 
    //,autoescape: false (apara ler como html)
})

server.get("/", function(req, res) {
    const about = {
        avatar_url:"https://avatars.githubusercontent.com/u/81028954?s=400&u=a869f0221cc0bc52ee1073a5189d7475a51096bc&v=4",
        name: "Andersonn Costa",
        role:"Programador Fullstack",
        description:"Desenvolverdor Fullstack e entusiasta na área de segurança da informação ",
        link: [
            {name: "Github", url: "https://github.com/Andersonfdc", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg"},

            {name: "Linkedin", url: "https://www.linkedin.com/in/anderson-franciscodc/", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"}
        ]
    }

    return res.render("about", { about })
})

server.get("/portifolio", function(req, res) {

    return res.render("portifolio",{itens: videos})
})

server.get("/page", function(req, res){
    const id = req.query.id

    const page = videos.find(function(page){
        if(page.id == id){
            return true
        }
    })

    if (!page){
        return res.send("Page not found")
    }

    return res.render("page", { item: page })
})

server.listen(5000, function (){
    console.log("server is running")
})

