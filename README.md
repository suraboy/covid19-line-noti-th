covid19-lambda
======

NOTE
----
push notification job by serverless 

Application flow pattern:
---------------------
https://github.com/suraboy/covid19-line-noti-th.git

Run for development:
---------------------
First you need to copy `.env.development` to `.env` for setup environment of appplication

Test Fuction by serverless
```bash
sls invoke local -f `functionName`
```

Installing Dependencies
------------------------------------
Run the composer installer:

```bash
npm install
```
or
```bash
npm update
```

Setup credential aws access key
------------------------------------
```bash
aws configure
```

Deploy Development
------------------------------------
```bash
sls deploy --env development --state development
```

Clear AWS
------------------------------------
```bash
sls remove -s {{env}} 
```

