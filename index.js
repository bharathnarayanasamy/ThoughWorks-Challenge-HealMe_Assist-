require('dotenv').config()
const Telegraf=require('telegraf')
const {data}=require('./js/getData.js')
const bot=new Telegraf(process.env.BOT_TOKEN)
const Markup=require('telegraf/markup')
const {textHandler}=require("./js/textHandler.js")
const {text}=require("./js/text.js")
const {inlineHandler}=require("./js/inlineHandler.js")
const {quiz}=require("./js/quiz.js")

const rp = require('request-promise');

var request = require('request');
const Extra=require('telegraf/extra')

bot.start(ctx=>
  {
  ctx.reply(`Hello ${ctx.from.first_name} 👋, I am your Health Assistant.\n\n<b>Want to know more about me 👉 Refer</b> /help`,Extra.HTML())
  ctx.reply(`Please give your Location 🛰️ access for better experience!!!`,Markup.keyboard([['Give Location']]).resize().extra())
  })
bot.help(ctx=>ctx.reply('Here is the complete walk-through about Me 😇\
<b><u>\n\nCommands:</u></b>\n\n\
/start\nWelcome to the Bot !!!\n\n\
/total\nDisplays the live count of COVID-19 cases in India.\n\n\
/precautions\nList of Precaution for various disease\n\n\
/statewise\nList of COVID cases of all states in India.\n\n\
/country\nShows the COVID cases in the specified country.\n\n\
/state\nList of COVID cases in particular state.\n\n\
/district\nCount of identified Cases in specific district.\n\n\
/help\nView all available Commands.\n\n\
/about\nInformation about the bot.\n\n\
/developer\n Information about Developer`s',Extra.HTML()))

bot.command('country',ctx=>ctx.reply('Enter the Country name for which the count is needed :'))

bot.command('state',ctx=>ctx.reply('Enter the State name in India for which the count is needed :'))

bot.command('district',ctx=>ctx.reply('Enter the District name in India for which the count is needed :'))

bot.command('developer',ctx=>ctx.reply('Developer`s Contact : \n👉 <a href="https://t.me/balarp">Bala Srinyvas R P</a>\n👉 <a href="https://t.me/Bharath27071999">Bharath N</a>\n👉 <a href="https://t.me/Anish_M">Anish M</a>',Extra.HTML().webPreview(false)))

bot.command('about',ctx=>ctx.reply('This bot is created to help people with varoius knowledge regard`s Health💓\n\nData Source - <a href="https://api.covid19india.org">https://api.covid19india.org</a>',Extra.HTML().webPreview(false)))

bot.command('total',ctx=>{
  
    var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
        if (err) {
          throw err;
        }
       var tc=json.cases_time_series[json.cases_time_series.length-1].totalconfirmed;
       var tr=json.cases_time_series[json.cases_time_series.length-1].totalrecovered;
       var dc=json.cases_time_series[json.cases_time_series.length-1].dailyconfirmed;
       var dr=json.cases_time_series[json.cases_time_series.length-1].dailyrecovered;
       var dt=json.cases_time_series[json.cases_time_series.length-1].dailydeceased;
       var td=json.cases_time_series[json.cases_time_series.length-1].totaldeceased;
       var date=json.cases_time_series[json.cases_time_series.length-1].date;
       ctx.reply(
        `COVID-19 INDIA updates as on <b>${date}</b>\nTotal Cases <b>${tc}</b> ↗️\nTotal Recovered <b>${tr}</b> ↗️\nToday Confirmed <b>${dc}</b> ↗️\nToday Recovered <b>${dr}</b> ↙️\nToday's Death <b>${dt}</b> ⏺\nTotal Death <b>${td}</b> 🔴\n`,Extra.HTML()
      )

}
)
})
      var north=["Delhi","Haryana","Jammu and Kashmir","Himachal Pradesh","Uttar Pradesh","Punjab","Uttarakhand","Chandigarh"];
      var south=["Andaman and Nicobar Islands","Puducherry","Lakshadweep","Andhra Pradesh","Telangana","Tamil Nadu","Karnataka","Kerala"];
      var east=["Bihar","Jharkhand","Odisha","West Bengal","Assam","Sikkim","Nagaland","Manipur","Mizoram","Meghalaya","Tripura","Arunachal Pradesh"];
      var west=["Rajasthan","Gujarat","Goa","Maharashtra","Madhya Pradesh","Daman and Diu","Ladakh"];
// bot.command('State',ctx=>{
//   var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
//       if (err) {
//         throw err;
//       }
//       var r=""
//       for (i = 1; i <json.statewise.length; i++) {
//         r += json.statewise[i].state;
//         r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
//         r+='(+'+json.statewise[i].deltaconfirmed+')'
//         r+='\n';
//       }
//      ctx.reply(
//      `States Wise Count of Total Confirmed Cases:\n${r}`,Extra.HTML()
//     )

// }
// )
// })

bot.command('precautions',ctx=>ctx.reply('Prevention is Better than cure.Here is the list of diseases for which we offer precaution tips.Choose any...',Markup.keyboard([
    ['COVID-19','Malaria','Cold'],
    ['Tuberculosis','Heart Attack']
  ]).resize().extra()))

  bot.hears('COVID-19',ctx=>{
       ctx.reply(
       `1.STAY home 🏠\n
2.KEEP a safe distance 🔊\n
3.WASH hands often 👁\n
4.COVER your mouth when you cough 🙊\n
5.SICK?Call the helpline 💥`
      )
      ctx.replyWithVideo({url:"https://offersjunction.000webhostapp.com/wp-content/uploads/2020/05/6-Steps-to-Prevent-COVID-19.mp4",filename:'COVID-19 mp4'})
  
  }
  )

  bot.hears('Tuberculosis',ctx=>{
    ctx.reply(
    `1.Wash your hands after coughing or sneezing 👁\n
2.Use a fan or open windows to move around fresh air 💨\n
3.Don’t visit other people and don’t invite them to visit you 🙊\n`
   )
   ctx.replyWithVideo({url:'https://offersjunction.000webhostapp.com/wp-content/uploads/2020/05/videoplayback.mp4',filename:'Tuberculosis mp4'})

}
)
bot.hears('Malaria',ctx=>{
  ctx.reply(
  `1.Avoid mosquito bites by using insect repellent, covering your arms and legs, and using a mosquito net.  🦟\n
2.Find out whether you're at risk of getting malaria. 💡 \n
3.Get immediate medical advice ☎️\n`
 )
 ctx.replyWithVideo({url:'https://offersjunction.000webhostapp.com/wp-content/uploads/2020/05/videoplayback-1.mp4',filename:'Malaria mp4'})

}
)
bot.hears('Cold',ctx=>{
  ctx.reply(
  `1.Stay hydrated 🍶\n
2.Gargle with salt water 🧂\n
3.Have some honey for instant relief 🍯\n
4.Use a humidifier to soothe your cough and loosen up secretions in the nasal passages\n
5.Avoid drinking cold water and other liquids ❌\n`
 )
 
}
)
bot.hears('Heart Attack',ctx=>{
  ctx.reply(
  `1.Eat small meals at regular intervals 🍚\n
2.Regularly monitor blood pressure level🌡️\n
3.Don’t skip prescribed medications💊\n
4.Avoid smoking and drinking🚭\n
5.Bathe in hot water and stay indoors📣\n
6.Get yourself regularly checked📝\n
7.Limit Salt intake 🧂\n`
 )
 
}
)

bot.command('statewise',ctx=>ctx.reply('Customized Selection',Markup.keyboard([['All States','North Region','South Region'],['East Region','West Region']]).resize().extra()))



bot.hears('All States',ctx=>{

  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
      for (i = 1; i <json.statewise.length; i++) {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+')'
        r+='\n';
      }
     ctx.reply(
     `States Wise Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
      m=>inline(m))
    )

}
)
})






bot.hears('North Region',ctx=>{
  
  
  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
    
      var q=""
      var north=["Delhi","Haryana","Jammu and Kashmir","Himachal Pradesh","Uttar Pradesh","Punjab","Uttarakhand","Chandigarh"];
      for (i = 1; i <json.statewise.length; i++) {
        q = json.statewise[i].state;
        if(north.includes(q))
        {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+')'
        r+='\n';
        }
      }
     ctx.reply(
     `North Region Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
      m=>inline1(m))
    )

}
)
})


bot.hears('South Region',ctx=>{

  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
      var q=""
      var south=["Andaman and Nicobar Islands","Puducherry","Lakshadweep","Andhra Pradesh","Telangana","Tamil Nadu","Karnataka","Kerala"];
      for (i = 1; i <json.statewise.length; i++) {
        q = json.statewise[i].state;
        if(south.includes(q))
        {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+')'
        r+='\n';
        }
      }
     ctx.reply(
     `South  Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
      m=>inline2(m))
    )

}
)
})

bot.hears('East Region',ctx=>{
  
 
  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
      var q=""
      var east=["Bihar","Jharkhand","Odisha","West Bengal","Assam","Sikkim","Nagaland","Manipur","Mizoram","Meghalaya","Tripura","Arunachal Pradesh"];
      for (i = 1; i <json.statewise.length; i++) {
        q = json.statewise[i].state;
        if(east.includes(q))
        {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+')'
        r+='\n';
        }
      }
     ctx.reply(
     `East Region Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
      m=>inline3(m)
     )
    )

}
)
})

bot.hears('West Region',ctx=>{
  
 
  var data=request({url: 'https://api.covid19india.org/data.json', json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
      var r=""
      var q=""
      var west=["Rajasthan","Gujarat","Goa","Maharashtra","Madhya Pradesh","Daman and Diu","Ladakh"];
      for (i = 1; i <json.statewise.length; i++) {
        q = json.statewise[i].state;
        if(west.includes(q))
        {
        r += json.statewise[i].state;
        r+=' = <b>'+ json.statewise[i].confirmed+'</b>'
        r+='(+'+json.statewise[i].deltaconfirmed+')'
        r+='\n';
        }
      }
     ctx.reply(
     `West Region Count of Total Confirmed Cases:\n${r}`,Extra.HTML().markup(
      m=>inline4(m)
     )
    )

}
)
})

const inline= (m)=>m.inlineKeyboard(
  [
  [m.callbackButton('Statewise Detailed List ↗️','Statewise Detailed List ↗️')]
  ]) 

  const inline1= (m)=>m.inlineKeyboard(
    [
    [m.callbackButton('North Region Detailed List ↗️','North Region Detailed List ↗️')]
    ]) 

    const inline2= (m)=>m.inlineKeyboard(
      [
      [m.callbackButton('South Region Detailed List ↗️','South Region Detailed List ↗️')]
      ]) 
   
      const inline3= (m)=>m.inlineKeyboard(
        [
        [m.callbackButton('East Region Detailed List ↗️','East Region Detailed List ↗️')]
        ]) 

        const inline4= (m)=>m.inlineKeyboard(
          [
          [m.callbackButton('West Region Detailed List ↗️','West Region Detailed List ↗️')]
          ]) 
        
        const inline5= (m)=>m.inlineKeyboard(
          [
          [m.callbackButton('General Precautions  👁️‍🗨️','General Precautions 👁️‍🗨️')]
          ]) 

  bot.action('General Precautions 👁️‍🗨️',ctx=>
  ctx.reply
  (`1.Drink more and more so that you do not feel dehydration and giddiness. 🏡\n
2.People suffering from breathing difficulties must use a surgical mask. 😷\n
3.Eat plenty vegetables. 🍎🍉\n
4.Start your day with exercise. 💪\n
5.Stay away from highly polluted areas. 💥
6.Choose parks for your morning walk to get fresh air from the trees. 💥`))


  var west=["Rajasthan","Gujarat","Goa","Maharashtra","Madhya Pradesh","Daman and Diu","Ladakh"];
  bot.action('Statewise Detailed List ↗️',ctx=>
  ctx.reply
  ('Customized Selection',
  Markup.keyboard(
    [
      ['Delhi','Haryana','Himachal Pradesh'],
      ['Uttar Pradesh','Punjab','Uttarakhand'],
      ['Puducherry','Lakshadweep','Andhra Pradesh'],
      ['Telangana','Tamil Nadu','Karnataka','Kerala'],
      ['Bihar','Jharkhand','Odisha','West Bengal'],
      ['Assam','Sikkim','Nagaland','Manipur'],
      ['Mizoram','Tripura','Arunachal Pradesh'],
      ['Rajasthan','Gujarat','Goa'],
      ['Ladakh','Daman and Diu','Madhya Pradesh'],
      ['Jammu and Kashmir','Chandigarh','Maharashtra'],
      ['Andaman and Nicobar Islands','Meghalaya']
    ]
    )
  .resize().extra()))

  bot.action('West Region Detailed List ↗️',ctx=>
  ctx.reply
  ('Customized Selection',
  Markup.keyboard(
    [
      ['Rajasthan','Gujarat','Maharashtra'],
      ['Ladakh','Daman and Diu','Madhya Pradesh'],
      ['Goa']
    ]
    )
  .resize().extra()))

bot.hears('Give Location',ctx =>
          {
    const keyboard = Extra.markup(markup =>
        markup
        .resize()
        .keyboard([
            markup.locationRequestButton('Access Location')
        ])
    )
    ctx.replyWithMarkdown('Please give location access', keyboard)
}
)


var val=""
bot.on('location',ctx=>{
  var dis="";
 var lat=ctx.message.location.latitude;
 var lon=ctx.message.location.longitude;
  val=lat;
  let l;
  var data=request({url: `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=cc2a2ea8ec9b43b6a6be0a12e3039043`, json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
   dis=json.results[0].components.state_district; 
    //console.log(json);
     l=dis;
    
    var data1=request({url: `http://api.weatherstack.com/current?access_key=0da2ed6c400298578ddb1f91b6bbc435&query=${dis}`, json: true}, function(err, res, json) {
      if (err) {
        throw err;
      }
   var temp=json.current.temperature;
  var t=((temp)*(9/5))+32
   var temp1=json.current.weather_icons[0];
      
      ctx.reply(`Hi ${ctx.from.first_name} ,You belong to <b>${dis}</b>\n`,Extra.HTML())
      if(t>90)
        {
        ctx.reply(`Weather 🌤️ in your city is ${t}°F.\n\nDuring this Weather condition the listed disease 🦠 may spread fast!!!\n1.Typhoid\n2.Diarrhea\n3.Measles/chicken-pox\n4.Heat stroke\n\n<b>So be Safe</b> ❣️`,Extra.HTML().markup(
      m=>inline5(m)
     ));
        }
      else if(t>83)
        {
          ctx.reply(`Weather 🌦️ in your city is ${t}°F.\n\nDuring this Weather condition the listed disease 🦠 may spread fast!!!\n1.Pneumonia\n2.Bronchiolitis\n3.Throat Infection\n4.Stomach Flu\n\n<b>So be Safe</b> ❣️`,Extra.HTML().markup(
      m=>inline5(m)
     ));
        }
      else
        {
          ctx.reply(`Weather 🌨️ in your city is ${t}°F.\n\nDuring this Weather condition the listed disease 🦠 may spread fast!!!\n1.Raynaud’s Syndrome\n2.Allergic Asthma\n3.Colds and Flu\n4.Sinusitis\n\n<b>So be Safe</b> ❣️`,Extra.HTML().markup(
      m=>inline5(m)
     ));
        }
    ctx.replyWithPhoto(temp1);
}
)
    
})
}
)


  bot.action('East Region Detailed List ↗️',ctx=>
  ctx.reply
  ('Customized Selection',
  Markup.keyboard(
    [

      ['Bihar','Jharkhand','Odisha'],
      ['Assam','Sikkim','Nagaland'],
      ['Mizoram','Meghalaya','Tripura'],
      ['Manipur','West Bengal','Arunachal Pradesh']
    ]
    )
  .resize().extra()))


  bot.action('North Region Detailed List ↗️',ctx=>
  ctx.reply
  ('Customized Selection',
  Markup.keyboard(
    [
      ['Delhi','Haryana','Jammu and Kashmir'],
      ['Uttar Pradesh','Punjab','Uttarakhand'],
      ['Himachal Pradesh',,'Chandigarh']
    ]
    )
  .resize().extra()))


  bot.action('South Region Detailed List ↗️',ctx=>
  ctx.reply
  ('Customized Selection',
  Markup.keyboard(
    [
      ['Andaman and Nicobar Islands','Puducherry'],
      ['Telangana','Tamil Nadu','Karnataka'],
      ['Lakshadweep','Kerala','Andhra Pradesh']
    ]
    )
  .resize().extra()))


textHandler(bot)





bot.launch()