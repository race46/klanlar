fetch("https://mobile-wwr1438viptr.liveapp-dev.com/getSpecialOffer", {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9,tr;q=0.8",
    "authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImE3MWI1MTU1MmI0ODA5OWNkMGFkN2Y5YmZlNGViODZiMDM5NmUxZDEiLCJ0eXAiOiJKV1QifQ.eyJ0b2tlbl9pZCI6ImI0NjYwYzI1LWU3NmMtNGQ1MS1iOWMzLWI5MTZiNGIxMmIyNyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS93d3IxNDM4dmlwdHIiLCJhdWQiOiJ3d3IxNDM4dmlwdHIiLCJhdXRoX3RpbWUiOjE3MzU1Njg5NTgsInVzZXJfaWQiOiJROUoyR29tSjhnZENFbkM5T1FhVU9VV1NIdnQxIiwic3ViIjoiUTlKMkdvbUo4Z2RDRW5DOU9RYVVPVVdTSHZ0MSIsImlhdCI6MTczNTU2ODk1OCwiZXhwIjoxNzM1NTcyNTU4LCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7fSwic2lnbl9pbl9wcm92aWRlciI6ImN1c3RvbSJ9fQ.lL2FVpEKLlHcPTURIIIGOMzjEEzEG-DkFb0Szjp0IJHmN1T-JDqZ7RS7Dqz-a-XYKgMnYnGx-1HZA9kckafUJao6IvIMLUAXsTq6HSk6cp8csgOZzZoswKckDr1m2Z9P4MnLyfHek7EhI52ZrS9Hriqsg7lt684Cnomk3hzaOpjsfxAyrO_cRWcBFWFDvWyNB9wTBQRLTaQAUj1DaT4DXYFvIQ78jpWa0AHK01QL501L4UhoqipLnTIojDc5oCAqFVi8qt1VBC3Wo5Qru20TH5_cE3OxMWlmAgsyZj_osVrp0Pi8q_QoTodxTqom9wyuQXRYJ6hqC-kdz5Pnnxgm4g",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": "\"Android\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://who-web-wwr1438viptr.web.app/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": "{\"data\":{\"client_params\":{\"app\":\"webapp\",\"app_build\":\"1.0.12\",\"build_time\":\"2024-12-26T15:40:31.656Z\",\"os_type\":\"web\",\"device_lang\":\"en-US\",\"device_langs\":[\"en-US\",\"en\",\"tr\"],\"lang\":\"en\",\"adid\":null,\"adjust_attribution_data\":null,\"adjust_web_uuid\":null,\"web_type\":1,\"sub_app\":null,\"uuid_c1\":\"7sjfmpndAnxkakThtVq1N9ndmxa9AacM\",\"vl_cid\":null,\"ttp\":\"wWVKiFj5NTSb_22n0jmg7YnCff-.tt.2\",\"twclid\":null,\"fbc\":null,\"fbp\":null},\"status\":0}}",
  "method": "POST",
  "mode": "cors",
  "credentials": "include"
}).then(r => r.json()).then(console.log)