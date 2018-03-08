const request = require("request");
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'attend_admin',
  password : 'light12345',
  database : 'LineBeaconSystem'
});

exports.messageEvents = function(eventInfo){
  console.log("Entered message.js");
  const replyToken = eventInfo.replyToken;
  const userID = eventInfo.source.userId;
  const messageType = eventInfo.message.type;
  const messageID = eventInfo.message.id;
  const messageText = eventInfo.message.text;

  switch(messageText){
    case '情報登録をします':
      const options = {
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: {
          'Content-Type':'application/json',
          'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
        json: true,
        body: {
          replyToken:replyToken,
          messages:[{
            type:'text',
            text:'名前を教えてください\n姓と名の間は空けないでください\n例:嶋川司'
          }]
        }
      };
      request.post(options, function(error, response, body){
          if (!error && response.statusCode == 200) {
              console.log('success!');
          } else {
              console.log(response.body);
          }
      });
      break;
    default:
      connection.query(`SELECT userID FROM user WHERE name="${messageText}"`,function(error,result_userID,fields){
        if(error){
          throw error;
        }else if(result_userID.length == 0){
          const replyMessage = `${messageText}さんはこのBotに登録されていません`;
          const options = {
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: {
              'Content-Type':'application/json',
              'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
            json: true,
            body: {
              replyToken:replyToken,
              messages:[{
                type:"text",
                text:replyMessage
              }]
            }
          };
          request.post(options, function(error, response, body){
              if (!error && response.statusCode == 200) {
                  console.log('success!');
              } else {
                  console.log(response.body);
              }
          });
        }else if(result_userID.length == 1){
          const userID = result_userID[0].userID;
          connection.query(`SELECT room FROM userLocation WHERE userID="${userID}"`,function(error,result_location,fields){
            if(error){
              throw error;
            }else if(result_location.length == 0){
              const replyMessage = `${messageText}さんはまだ現在地が登録されていません`;
              const options = {
                url: 'https://api.line.me/v2/bot/message/reply',
                headers: {
                  'Content-Type':'application/json',
                  'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
                json: true,
                body: {
                  replyToken:replyToken,
                  messages:[{
                    type:"text",
                    text:replyMessage
                  }]
                }
              };
              request.post(options, function(error, response, body){
                  if (!error && response.statusCode == 200) {
                      console.log('success!');
                  } else {
                      console.log(response.body);
                  }
              });
            }else{
              const location = result_location[result_location.length-1].room;
              const replyMessage = `${messageText}さんは${location}にいます`;
              const options = {
                url: 'https://api.line.me/v2/bot/message/reply',
                headers: {
                  'Content-Type':'application/json',
                  'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
                json: true,
                body: {
                  replyToken:replyToken,
                  messages:[{
                    type:"text",
                    text:replyMessage
                  }]
                }
              };
              request.post(options, function(error, response, body){
                  if (!error && response.statusCode == 200) {
                      console.log('success!');
                  } else {
                      console.log(response.body);
                  }
              });
            }
          });
        }else{
          const replyMessage = "エラーが発生しています\n管理者に報告してください";
          const options = {
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: {
              'Content-Type':'application/json',
              'Authorization':'Bearer {0TFlC+RkUreO3Vo2NnuIpRZMHUQ+5FgGEmlWhSbU6QjjAZcBT5in0wcBDdZP7AQne1nSJ5pesVigCvVE2hZSGlieFoZL4YpUnfImwzrXrKjlqjogGqEQw62+/fCKDJgyeIFL86s6ewFpDjmzrMfGGgdB04t89/1O/w1cDnyilFU=}'},
            json: true,
            body: {
              replyToken:replyToken,
              messages:[{
                type:"text",
                text:replyMessage
              }]
            }
          };
          request.post(options, function(error, response, body){
              if (!error && response.statusCode == 200) {
                  console.log('success!');
              } else {
                  console.log(response.body);
              }
          });
        }
      });
      break;
  }
}
