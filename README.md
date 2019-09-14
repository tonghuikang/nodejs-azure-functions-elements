# Nodejs Azure Functions elements

Why did I make this?

Because Azure is not developed for developers but engineered for corporate compliance. Converting a Node.js backend app to work on Azure Functions is not easy, and I need to hunt for tutorials and packages. Notably, the standard packages do not parse multipart/form-data on Azure Functions, and I needed to find an obscure package.

    "azure-func-multipart-parser": "^0.1.2",
    "azure-function-express": "^2.0.0",

What is technically special in the solution is (which I tried quite hard to put together)

- it is somewhat like a NodeJS Express app
- that can be deployed on Azure functions
- that organises by middlewares (with 'azure-function-express' package)
- and parses form-data fields and forms (with an obscure package 'azure-func-multipart-parser')
- that is deployable on Google Cloud Functions as well (by serialising middlewares in ./index.js, with 'middleware-flow' package)

Azure functions work in a very restricted environment. Do not assume that your usual Node.js methods will work on Azure Functions, so please try element by elements sequentially. Azure Functions that work on local may not work on the Azure server.

In these examples, no bindings are used, and all functions are anonymous (the endpoint can be called without any authorisation.)

#### Prerequisites

Basic knowledge of Javascript, especially on how to use `async await`.
https://medium.com/front-end-weekly/callbacks-promises-and-async-await-ad4756e01d90

Basic knowledge of Express app, deploying endpoints and middlewares.
https://expressjs.com/en/guide/using-middleware.html

Making and receiving HTTP requests, including those of content type multipart/form-data
https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData

## Development Setup

Here I explain how did I set up Azure Functions in the portal, and how I iterate my development of the code.

#### Development environment

The repository is developed on VSCode, with the following extensions

- Azure Account
- Azure Functions
- GitLens (to see when you last edited that code and more)
- Prettier (for standardised code formatting)

Postman is used to test whether the functions works on local and work on remote.

#### Developement process

After I have made my edits on VScode, I start the debugger which runs a server on my local machine.

I send a sample input to the function with Postman, posting to http://localhost:7071/api/domainPath/
(There might be a cleaner process with "rest-client" VSCode extension.) The test case is simple for now, it checks whether the status code is 200.

I use breakpoints to investigate the execution of the code.
Breakpoints allow me to understand the state of the machine between every line or every breakpoint.
This is a much neater process compared to using print statements.

Then I deploy on the remote server with the Azure functions extension.
For the first deployment and after every edit of local environmental variables, click "Upload Settings" when the deployment is complete. Do not overwrite AzureWebJobsStorage environment variable.

After deployment, I change the domain name on Postman. For the domain name, I have used a variable, and the variable is shared across the entire Postman collection. I just need to edit the variable (still troublesome, should try that VSCode extension) under collection settings.

If the functions fail on Azure (but works locally which happens often), reading the logs from Azure is quite hard. I have to go to the function app in the portal and click the monitor tab. The logs may be delayed by up to five minutes (Google Cloud Functions two minutes). What is shown is error-level logs, so if you want to probe more information you might need to print more error level logs.

I commit the code after every successful deployment so that I can revisit the version if needed.

I set up monitoring with Postman, which allow up to 1000 free APIs calls per month. There should be substitutes provided by the cloud provider.

See the gif images on https://github.com/microsoft/vscode-azurefunctions for a taste of the development process. I appreciate advice on my testing process as well.

## Functions offered

#### HttpTriggerHello

This is the template code provided by Azure.

https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node#exporting-a-function

If this does not run, the rest of the examples will not either.
Please check your settings.

#### accessEnv

Each deployment of your app may have secrets which should not be committed the repository.

Please remember to return ./local.settings.json back to .gitignore if you want to base your code on this example.

https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node#environment-variables

#### importFunction

Calling code from another file. We want different endpoints to share certain functions.

#### makeRequest

Call a function which makes a POST request. This also shows that packages can be imported for Azure Functions.

Featuring package `axios`

#### formDataParse

The inability to parse multipart/form-data is what stopped me from using Azure functions, because I was required to parse that kind of input. And surprisingly, there is no easy solution.

https://stackoverflow.com/questions/48009300/cant-properly-parse-multipart-form-data-inside-azure-functions-using-node-js
"Indeed it's a known issue, see https://github.com/Azure/azure-functions-host/issues/2009"

https://stackoverflow.com/questions/40713479/how-to-parse-multi-part-form-data-in-an-azure-function-app-with-http-trigger-n
This suggested to either parse yourself or use the multipart parsing middlewares when you have installed azure-function-express (I have not tried the latter, however.)

https://stackoverflow.com/questions/48009300/cant-properly-parse-multipart-form-data-inside-azure-functions-using-node-js
This also suggests parsing yourself.

Featuring package `azure-func-multipart-parser`
The solution was to use an obscure package which only a handful of downloads.
https://www.npmjs.com/package/azure-func-multipart-parser and https://github.com/safer-bwd/azure-func-multipart-parser

(Please tell me if you are able to parse form-data with standard packages like multiparty or formidable. On hindsight, you might need to multipart parsing middlewares with azure-function-express)

#### formDataParsePost

We want to post the form-data as well. Please also try posting the request directly to the monitoring endpoint and compare the difference in content.

#### formDataParseSaveLoadPost

Here we save the file content in the directory rather than as a variable.
This is to prepare because some of your functions only read a directory for input.
There are some rules regarding the use of the filesystem in Azure Functions https://stackoverflow.com/questions/39218895

#### importMiddleware

Here an endpoint is defined just like an Express app.
The domain path defined has to be equal to the assigned domain path by Azure.
The assigned domain path is /api/<folder name>
Then the set of middleware can be defined as per usual.
https://expressjs.com/en/guide/using-middleware.html

Featuring package `azure-function-express`

#### serialisedMiddleware
In a usual Express App, the endpoints are defined at the root directory.
These endpoints will have a series of middlewares bound to it.

However, the Azure functions are defined in its respective folders.
So these series of middlewares will be referenced from here.

Instead of parsing a list of middleware to /api/serialisedMiddleware, we pass one middleware that was combined in series, using package middleware-flow
This allows them to be deployed on Google Cloud Functions, if necessary.

Featuring package `middleware-flow`
