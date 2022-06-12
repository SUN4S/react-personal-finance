# react-personal-finance
A personal finance management program, that processes daily expenditures and ( at some point) generates weekly/monthly expense reports.

## Live version
https://www.marglipersonalfinance.me/

## Usage

In ```./client``` create a ```.env``` file containing:
```
SERVER_URL=http://localhost:3030 ( or something equaivalent) 
```
and run ```npm start```

In ```./server``` create a ```.env``` file containing:
```
PORT=3030
HTTPS_PORT=5050
DB_USERNAME=<mongo db username>
DB_PASSWORD=<mongo db password>
DB_CLUSTER=<mongo db cluster>
DB_DBNAME=<mongo db database name>
SSL_CERT_FILE=<https cert file location>
SSL_CERT_KEY=<https cer key file location>
```
and run ```npm start```

## Usage production

To run in production:
In ```./client``` diractory:
```npm run build```

In ```./server``` directory:
Remove comments from https cert(httpsOptions) options and createServer
```npm run serve```  to build and run pm2 instance
