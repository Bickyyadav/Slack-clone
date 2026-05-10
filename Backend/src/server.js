import express from "express";
import { ENV } from "./config/env.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
// import { authRouter } from "./routes/auth.route.js";
import { connectDB } from "./config/db.js";
import { serve } from "inngest/express";
import { functions, inngest } from "./config/inngest.js";

const app = express();


app.use(express.json());

// Request Logger to check if Inngest is hitting the server
// app.use((req, res, next) => {
//     console.log("🔴🔴🔴🔴🔴🔴🔴🔴🔴🔴");
//     console.log(`${req.method} ${req.url}`);
//     next();
// });

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use(clerkMiddleware())

app.get("/", (req, res) => {
    res.send("Hello World!123")
})



const startServer = async () => {
    try {
        await connectDB();
        if (ENV.NODE_ENV !== "production") {
            app.listen(ENV.PORT, () => {
                console.log("Server started on port:", ENV.PORT);
            });
        }
    } catch (error) {
        console.error("Error starting server:", error);
        process.exit(1); // Exit the process with a failure code
    }
};

startServer();