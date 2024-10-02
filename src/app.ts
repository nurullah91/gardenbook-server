import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';

// parser
app.use(express.json());
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send(`
    <div style="
    margin: -8px;
    padding: 0; 
    font-family: Arial, sans-serif; 
    background: linear-gradient(to right, #9100ff, #fe92f5); 
    height: 100vh; 
    display: flex; 
    justify-content: center; 
    align-items: center;"
    >
     <div style="
     text-align: center; 
     background-color: rgba(255, 255, 255, 0.9); 
     padding: 50px; 
     margin: auto 20px; 
     border-radius: 15px; 
     box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);"
     >
        <h1 style="font-size: 3em; color: #333;">Welcome to Gardenbook Server</h1>
        <p style="font-size: 1.2em; color: #666; margin: 20px 0;">
            We're excited to have you here. Explore our features and api's for Making your website more dynamic, real and user friendly!
        </p>
        <a href="https://github.com/nurullah91/meeting-sport-backend" style="
        display: inline-block; 
        padding: 15px 30px; 
        font-size: 1.2em; 
        color: white; 
        background-color: #00A86B; 
        border-radius: 25px; 
        text-decoration: none; 
        transition: background-color 0.3s;"
        >
            Explore API Endpoints
        </a>
    </div>
    </div>`);
});

export default app;
