# PWalkersCrisps Porn Discord Bot

This Porn Bot is a Discord Bot that was created with Discord.js V13

## Initialization
### Terminal
#### Starting (While in the repo's directory)
```bash
node start
```
#### Stopping
```bash
^C
```
Stopping the bot needs you to press CTRL + C while in the bot's terminal screen
### Docker
#### Creating the container (While in the repo's directory)
```bash
docker build -t pwc-porn-bot .
```
#### Starting
```bash
docker run -d pwc-porn-bot
```
### Process Manager 2
#### Starting (While in the repo's directory
```bash
pm2 start ./src/index.js --Name "Porn Bot"
```
#### Stopping
```bash
pm2 stop "Porn Bot"
```
#### Checking its logs
```bash
pm2 monit
```
And find the instance with the name of "Porn Bot"

#### Starting when the system boots up
##### Windows
```bash
npm install --global pm2-windows-service
pm2-service-install
pm2 save
```
##### MacOS/Linux
```bash
# Detects the available init system, generates the config, and enables startup system
pm2 startup
# Or if you want to specify your machine manually, choose one of the options in the square brackets
pm2 startup [ubuntu | ubuntu14 | ubuntu12 | centos | centos6 | arch | oracle | amazon | macos | darwin | freesd | systemd | systemv | upstart | launchd | rcd | openrc]
# Doing either of these will output a command you need to run, this is an example for an ubuntu user:
[PM2] You have to run this command as root. Execute the following command:
      sudo su -c "env PATH=$PATH:/home/user/.nvm/versions/node/v8.9/bin pm2 startup ubuntu -u user --hp /home/user"
# After that is done
pm2 save
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
