## OpenAI-Codex
This is a web application built using [VanillaJS](http://vanilla-js.com/) and [Vite](https://vitejs.dev/), hosted on [Vercel](https://vercel.com/). The server is hosted on [Render](https://render.com/). The application allows the users to ask for help with programming language(s) -- similar to ChatGPT -- such as JavaScript, React, and more.

It has an elegant user interface similar to the ChatGPT app, and it is capable of communicating with the advanced GPT-3 model API (in this example, **text-davinci-001** is being used).
One of the main features of this application is the ability to ask for help with programming languages such as JavaScript and React.
Additionally, it can take code and translate it into another programming language.

## Development Environment
A web application built using _**VanillaJS**_ framework via _**Vite**_ - version 4.2.0, which is a next generation frontend tooling and hosted using _**Vercel**_. The web service (server) was hosted on _**Render**_.

The following are the server packages:
| Package Name | Version
| -------- | -------- |
| cors | ^2.8.5 |
| dotenv | ^16.0.3 |
| express | ^4.18.2 |
| nodemon | ^2.0.21 |
| openai | ^3.2.1 |

You can lauch this application ---> <a href="https://open-ai-codex-coral.vercel.app/" target="_blank">here</a> **[*my token has reached the limit]**.

## To run the project locally
Make sure you clone the repository from the `main` branch.
 ```git
     git clone git@github.com:sangay-yonten/OpenAI-Codex.git
 ```

 After cloning the repository, perform the following to start the **Frontend application** and **Backend server**. <br />
 **(a) STEP 1:** Start the Frontend (web application)
 ```git
  cd client
 ```
 ```git
  npm install && npm run dev
 ```
 
 **(b) STEP 2:** Open split terminal and start the server (BE)
 ```git
  cd server
 ```
 ```git
  npm install && npm run server
 ```
 
 **(c) STEP 3:** To add your custom API key and change the model <br />
 In the server directory, add a `.env` file and write OPENAI_API_KEY = "api_value_here", then save it and re-start or re-run the server.
 
 Open `server.js` file and update the model value/name by the desired model and update the changes to use it.
 
 So to make use of the above changes, you must last update the `handleSubmit` function in `script.js` file, which fetches the API response from frontend.
 Replace `'https://openai-codex-57kl.onrender.com'` with the value `port-the-server-listens-to`, in my case I have kept it as,
 http://localhost:4200, when I start the server locally.

## Help and Issues
If you're experiencing 401, 429, or similar issues, here are some potential cause and solutions:
- Proper API key from OpenAI: It's possible that you are not using a valid API key from OpenAI. You can get an API key by visiting https://beta.openai.com/account/api-keys.
- Free credits offered by OpenAI: If you are using the free credits offered by OpenAI to use their models, you can check your usage at https://beta.openai.com/account/usage. If you have used up your free credits, you can check the pricing and upgrade your account at https://openai.com/api/pricing/.
- Proper server deployment: Make sure you use the deployed link from Render at https://render.com/. If you are unsure how to deploy the project, follow the steps mentioned in the video.
- After successfully deploying the link, make sure to paste the link in the script file of the client and push it to GitHub. This will allow Vercel to detect and deploy the application properly. Also, please note that the server link used in the Codex repository shared on GitHub has used all of its credits, so it will throw a 429 error and will not work. You will need to use your own server link by deploying it on Render or using another hosting service.

You can even contact [us](mailto:sangay9yonten@gmail.com) for more details and open discussions.
