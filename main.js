const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

let ver = "2.0"
let build = "v2.0.1"
let lang = "FR-BE"
let update = "11-23-19"
let dev = "V7 | TheSky#0420"


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

//  bot.user.setGame("-help");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = "-";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}kick`){

    //.kick {user} {reason}

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Impossible de trouver l'utilisateur!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu n'as pas la permission");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cette personne ne peut pas être expulsée!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("**Kick**")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "cmd");
    if(!kickChannel) return message.channel.send("Can't find cmd channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);


    
    return;
  }

//.ban {user} {reason}

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Impossible de trouver l'utilisateur!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Tu n'as pas la permission");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Cette personne ne peut pas être bannie!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("**Ban**")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "cmd");
    if(!incidentchannel) return message.channel.send("Can't find cmd channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }


  if(cmd === `${prefix}report`){

    //.report {user} {reason}

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("**Reports**")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "cmd");
    if(!reportschannel) return message.channel.send("Couldn't find cmd channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }




  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#02b7f9")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Coded by", dev)
    .addField("Build", build)
    .addField("Update The", update)
    .addField("Version", ver)

    return message.channel.send(botembed);
  }
  
  if(cmd === `${prefix}help`){

    let helpEmbed = new Discord.RichEmbed()
    .setTitle("Liste des commandes")
    .setColor("#9900ff")
    .addField("Report un utilisateur qui ne repecte pas les règles", "-report [user] [reason]")
    .addField("Voir son nombres d'invitation", ".invite ou .leaderboard")
    .addField("Voir les informations du bot", "-botinfo")
    .addField("Voir les informations du serveur", "-serverinfo");

    //let kickChannel = message.guild.channels.find(`name`, "cmd");
    //if(!kickChannel) return message.channel.send("Can't find cmd channel.");

    return message.channel.send(helpEmbed);
  }



const chat_filter = [
  "FDP",
  "fdp",
  "ntm",
  "NTM",
  "TG",
  "tg",
  "ez",
  "EZ",
  "卍",
  "SALOPE",
  "salope",
  "connard",
  "CONNARD",
  "PUTAIN",
  "putain",
  "ptn",
];

if(chat_filter.some(word => message.content.includes(word))){
  message.delete()
  message.reply("**Hey!** Vous n'êtes pas autorisé à utiliser ce mot ici ! :no_entry_sign: \nVotre mère ne vous a pas appris la politesse ?");
}

});


bot.login(process.env.TOKEN_BOT);
