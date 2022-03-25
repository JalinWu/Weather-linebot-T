const { getWeather, getWeatherObject } = require('./getWeather');
const { getEarthQ } = require('./getEarthQ');
const { getFlexMsg } = require('./getFlexMsg');

// 各種通知
var webhookEvent = function (bot) {
    // 被加入好友
    bot.on('follow', async (event) => {
        event.reply('感謝將我加為好友');
    })

    // 被解除好友
    bot.on('unfollow', async (event) => {
        console.log('被解除好友了 QQ');
    })

    // 被加入群組/聊天室
    bot.on('join', async (event) => {
        event.reply('感謝將我加入群組');
    })

    // 被踢出群組/聊天室
    bot.on('leave', async (event) => {
        console.log('被踢出群組了 QQ');
    })

    // 有人加入群組/聊天室
    bot.on('memberJoined', async (event) => {
        event.reply('歡迎加入群組 ^^');
    })

    // 有人離開群組/聊天室
    bot.on('memberLeft', async (event) => {
        console.log('有人離開群組了 QQ');
    })
}

// 氣象機器人
let weatherBot = async function (bot) {

    bot.on('message', async function (event) {
        // 使用者輸入的內容
        var userMsg = event.message.text;

        // write your code here 
        // "請對我輸入指令，目前有的指令有:\n-地震\n-[地區]，ex: 臺北"
        if (userMsg == "help") {
            event.reply("請對我輸入指令，目前有的指令有:\n-地震\n-[地區]，ex: 臺北");
        } else if (userMsg == "地震") {
            let earthQImg = await getEarthQ();

            event.reply({
                type: "image",
                originalContentUrl: earthQImg,
                previewImageUrl: earthQImg
            });
        } else {
            // let weather = await getWeather(userMsg);
            // event.reply(weather);

            let weather = await getWeatherObject(userMsg);
            console.log(weather);
            
            if (weather.status == 200) {
                let replyMsg = getFlexMsg(weather);
                event.reply(replyMsg);
            } else {
                event.reply(weather.msg);
            }
        }

    });
}

module.exports = {
    webhookEvent,
    weatherBot
}