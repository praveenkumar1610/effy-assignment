import dotenv from 'dotenv';

dotenv.config({path:`.env`})


const config= {
    dbURL:process.env.dburl,
    PORT:process.env.port
}

export default config;