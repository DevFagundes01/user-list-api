import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// import { uuid } from 'uuid'
// import cors from 'cors'

const port = process.env.PORT || 3001
const app = express()
app.use(express.json())
// app.use(cors())

// const checkUserId = (req, res, next) => {
//     const { id } = req.params
//     const index = users.findIndex(user => user.id === id)

//     if (index < 0) {
//         return res.status(404).json({ message: "User not found" })
//     }
//     req.userIndex = index

//     next()
// }

app.get("/", (req, res) => {
    return res.json("hello world");
});

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.post('/users', async (req, res) => {
    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(201).json(user)
})

app.put('/users/:id', async (req, res) => {
    const user = await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }
    })

    res.status(200).json(user)
})

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(204).json({message: 'user deleted successfully'})
})

app.listen(port, () => {
    console.log('🚀🚀🚀')
})

/*
fagundediego2015
9aBxBidThMWZuNqT
*/