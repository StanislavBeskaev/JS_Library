# Библиотека

## Установка
Перейти в корень, выполнить команды:  
`npm install`  
`npm run frontend:install`  
Сделать build:  
`npm run frontend:build`  


## Запуск
Выполнить команду:  
`npm run start`

## Запуск через менеджер процессов PM2
Нужен pm2 (`npm install -g pm2`)  
Находясь в корне выполнить команду:  
`pm2 start npm -- start`

### Команды PM2
`pm2 list`  - список джобов  
`pm2 stop <app_name|namespace|id|'all'|json_conf>` - остановить джоб
`pm2 restart <app_name|namespace|id|'all'|json_conf>` - перезапустить джоб
`pm2 delete <app_name|namespace|id|'all'|json_conf>` - удалить джоб

