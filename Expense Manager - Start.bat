@echo off
cls
cd ./server
call npm i
call npx knex migrate:latest
call npm start