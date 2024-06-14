const { Client, Collection } = require('discord.js-selfbot-v13');
const fs = require('fs');
const client = new Client({
    checkUpdate: false,
});

// const config = require('./config.json');

const token = process.env.TOKEN3


client.on('ready', () => {
    console.log(`${client.user.username} is running.`);
    launch()
})



function launch() {
    const channel = client.channels.cache.get('785917648693100605')
    channel.send('$daily')

    setTimeout(() => {
        channel.send('$dk')
    }, 2000);
   
    setTimeout(() => {
        summonTask(0 , 0 , 16)
    }, 1000);
   

    setInterval(() => {
        console.log('alive')
    }, 600000);


    setInterval(() => {
        summonTask(0 , 0 , 16)
    }, 3600000);


    setInterval(() => {
        channel.send('$daily')
    }, 73800000);
    

}

function summonTask(auth , auth2 , roll) {
    var val = 0
    var left = roll
    var claimed = false
    const channel = client.channels.cache.get('785917648693100605');    
    // var rn; 
    // const cn = ['mario' , 'akaza' , 'jibril' , 'meruem' , 'son gohan' , 'ash ketchum' , 'majin buu']

    if(left > 0) {
        var summon = setInterval(() => {
            // rn = Math.floor(Math.random() * 7);
            channel.send(`$ma`)
            left--

            // START ROLLS AND CLAIM SPECIFIC CHARACTER
            setTimeout(() => {
                channel.messages.fetch({ limit: 1 }).then(messages => {
                    const last = messages.first();
                    // console.log(last)

                    if(last.embeds.length > 0 && last.author.username == 'Mudae' && last.components[0].components.length > 0) {
                        const btn = last.components[0].components[0]
                        checkWish(last.embeds[0].author.name)
                        .then(found => {
                            if (found == true) {
                                claimed = true
                                setTimeout(() => {
                                    btn.click(last);
                                    if(auth2 != 1) {
                                        clearInterval(summon)
                                        checkRT(left)
                                    } 
                                }, 600);
                            }
                        })
                        .catch(error => {
                            console.error('Une erreur est survenue lors de la vérification du souhait :', error);
                        });
                    }

                }).catch(console.error);
            }, 800);
            val++

            // CHECK IF PLAYER CAN DAILY AFTER FINISHING ROLLS
            if(val == roll) {
                clearInterval(summon)
                setTimeout(() => {
                    if(auth != 1 && claimed != true) checkReset()
                }, 2000);
                
            }

        }, 3500);

       
    } 

}


function checkWishPro(character) {
    return new Promise((resolve, reject) => {
        fs.readFile('wish.txt', 'utf8', (err, data) => {
            if (err) {
                console.error('Erreur de lecture du fichier :', err);
                reject(err);
                return;
            }

            const lines = data.split('\n');
            const found = lines.some(line => line.trim() === character);
            resolve(found);
        });
    });
}

async function checkWish(character) {
    try {
        const found = await checkWishPro(character);
        return found
    } catch (error) {
        console.error('Une erreur est survenue :', error);
    }
}


function checkRT(left) {
    const channel = client.channels.cache.get('785917648693100605');  
    setTimeout(() => {      
        channel.send('$mu')
    }, 2000);
    

    setTimeout(() => {
        channel.messages.fetch({ limit: 1 }).then(messages => {
            const last = messages.first();
            // var tt = "nahass, temps restant avant de pouvoir vous remarier : **2h 02** min."
    
            if(last.author.username == 'Mudae') {
                var regex = /(\d{1,2})h/;
                var match = last.content.match(regex);
                
                if(match) {
                    channel.send('$rt')

                    setTimeout(() => {
                        summonTask(0 , 1 , left)
                    }, 1000);
                }
            }
    
        }).catch(console.error);
    }, 3500);
}

function checkReset() {
    const channel = client.channels.cache.get('785917648693100605');    
    channel.send('$mu')

    setTimeout(() => {
        channel.messages.fetch({ limit: 1 }).then(messages => {
            const last = messages.first();
            // console.log(last)
    
            if(last.author.username == 'Mudae') {
               var cv = last.content 

               // RESET ROLL IF DAILY ALLOWED AND THEN SUMMON
               if(cv.includes('vous __pouvez__')) {
                  channel.send('$rolls')

                  setTimeout(() => {
                    channel.messages.fetch({ limit: 1 }).then(messages => {
                        const last = messages.first();
                        if(last.reactions.cache.size > 0) {
                            summonTask(1 , 0 , 10)
                        }
                    }).catch(console.error);
                  }, 1500);
               }
            }
    
        }).catch(console.error);
    }, 1000);
    
}




client.login(token)
