@echo off
cls
cd ./server
call npx knex migrate:rollback
pause