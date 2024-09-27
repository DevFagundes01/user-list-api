import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const port = process.env.PORT || 3001

const app = express()
app.use(express.json())

app.use(cors({
    // origin: "http://localhost:5173"
    origin: "https://react-app-devclub.netlify.app"
}))

app.get("/", (req, res) => {
    return res.json("hello world");
});

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()

    res.status(200).json(users)
})

app.post('/users', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                age: req.body.age,
                name: req.body.name
            }
        })
    
        console.log('Created user:', user)
    
        res.status(201).json(user)
    } catch (error) {
        if (error.code === 'P2002') {
            res.status(409).json({ message: 'This email is already in use. Please use a different email.'})
        } else {
            res.status(500).json({ message: 'Error creating user:', error: error.message})
        }
    }
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

    res.status(204).json({ message: 'user deleted successfully' })
})

app.listen(port, () => {
    console.log(`${port} 🚀🚀🚀`)
})