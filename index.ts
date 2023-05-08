import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const PORT = 8000;

const app: Application = express();
app.use(cors());
app.use(express.json());

const API_KEY = "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";
// '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'

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/completions", async (req: Request, res: Response) => {
  try {
    const completion = await openai.createChatCompletion({
      model: "text-davinci-002",
      messages: [
        { role: "user", content: "Create SQL request to " + req.body.message },
      ],
    });
    res.send(completion.data.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => console.log(`Your server ${PORT}`));
