const Extra=require('telegraf/extra')
module.exports.quiz = ctx =>{
    if(ctx.message.chat.type !='private')
    {
        ctx.reply('Quiz available in private chat -> @COVID2019trackerbot')
    }
    else
    {
        let questions =['a','b','c','d']
        let msg='Which is the correct option?<a href="https://images.newscientist.com/wp-content/uploads/2020/02/11165812/c0481846-wuhan_novel_coronavirus_illustration-spl.jpg">Helo</a>'
        return ctx.replyWithHTML(msg,
            Extra.markup( m=>m.inlineKeyboard(keyboard(m,1,questions))))
    }
}


const keyboard=(m,step,answers)=>{
       if(step===1)
       {
       return [
           [m.callbackButton(answers[0],'answer0'),m.callbackButton(answers[1],'answer1')],
           [m.callbackButton(answers[2],'answer2'),m.callbackButton(answers[3],'answer3')]
       ]
    }else if(step===2)
    {
    return [
        [m.callbackButton('NEXT','next')],
        [m.callbackButton('QUIT','quit')]
    ]
 }
}