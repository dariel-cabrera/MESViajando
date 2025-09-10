
import * as joi from 'joi';

import { config } from 'dotenv';
config(); // Lee el archivo .env


interface EnvVars{
	PORT:number;

	APP_URL:string;

	API_URL:string;

	MONGO_URI:string;

}
const envsSchema= joi.object({
     PORT: joi.number().required(),
	 APP_URL:joi.string().required(),
	 API_URL:joi.string().required(),
	 MONGO_URI:joi.string().required(),
})
.unknown(true);


const {error, value}= envsSchema.validate(process.env);

if (error) {
	throw new Error (`Config validation error: ${error.message}`);

}
const envVars: EnvVars= value;

export const envs = {
	port : envVars.PORT,
	app_url_client:envVars.APP_URL,
	app_url_api:envVars.API_URL,
	mongo_uri:envVars.MONGO_URI
}
