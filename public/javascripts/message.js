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
  const messageType = eventInfo.message.type;
  const messageID = eventInfo.message.id;
  const messageText = eventInfo.message.text;

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

    }
  });
}
