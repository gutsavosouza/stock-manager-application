import express from 'express';

const application = express();
const PORT = process.env.PORT || 8080;

application.use(express.json());

application.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}.`);
});