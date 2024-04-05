@echo off
cls
cd ./server
call npx knex seed:run
pause