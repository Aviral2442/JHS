import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import db from './src/config/db_Config';

const PORT = process.env.SERVER_RUN_PORT || 5000;

const startEngine = async () => {
    try {
        const connection = await db.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error starting the server:', error);
        process.exit(1);
    }
};

startEngine();





/*



  const url = new URL(
    'https://control.msg91.com/api/v5/oneapi/api/flow/jeevan/run'
  );

  let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "authkey": "{your_MSG91_authkey}"
  };

  let body = {
    "data":{
	"sendTo": [
		{
			"to": [
				{
					"mobiles": "911234567890",
					"variables": {
						"otp": {
							"type": "{your_type}",
							"value": "{your_value}"
						},
						"timer": {
							"type": "{your_type}",
							"value": "{your_value}"
						}
					}
				}
			],
			"variables": {
				"otp": {
					"type": "{your_type}",
					"value": "{your_value}"
				},
				"timer": {
					"type": "{your_type}",
					"value": "{your_value}"
				}
			}
		}
	]
}
    
  }

  fetch(url, {
      method: "POST",
      headers: headers,
      body:  JSON.stringify(body)
  })
  .then(response => response.json())
  .then(json => console.log(json));



*/