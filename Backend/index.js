import express, { json } from "express";
import cors from "cors"; // Move this import before any executable code
import { rootRouter } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/', rootRouter);
app.get('/', (req,res) => {
    console.log("Please visit /api/v1/user/signup")
    res.status(800).json({
        msg: "Root route handled successfully"
    })
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
