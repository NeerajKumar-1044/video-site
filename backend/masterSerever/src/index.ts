import app from "./app";
import {connectDB} from './db/db';
import 'dotenv/config'

const PORT = process.env.PORT || 9000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} 👌`);
    });
    }
).catch((err: any) => {
    console.log(err);
});
