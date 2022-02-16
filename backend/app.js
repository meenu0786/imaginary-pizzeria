import express from 'express';
import { urlencoded, json } from 'body-parser';
import cors from 'cors';
import { connect, connection } from "mongoose";
import expressWs from 'express-ws';

import routes from './routes/index';
const PORT = 3001;
const app = express();

app.use(cors());

app.use(urlencoded({ extended: false }));
app.use(json());

expressWs(app);

connect("mongodb+srv://meena-user:4TE5ay50BOz5MQJO@cluster0.hzpzr.mongodb.net/pizzaria?retryWrites=true&w=majority", { useNewUrlParser: true }, () =>
  console.log("connected to db")
);
connection.on("error", function (err) {
  console.log("Error: Could not connect to MongoDB.");
});

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`connection is live at port ${PORT}`);
});
