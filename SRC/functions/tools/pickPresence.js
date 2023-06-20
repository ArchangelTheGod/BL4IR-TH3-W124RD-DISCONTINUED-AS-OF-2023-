const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Watching,
        text: "You",
        status: "dnd",
      },
      {
        type: ActivityType.Listening,
        text: "To Your Nonsense",
        status: "dnd",
      },
      {
        type: ActivityType.Playing,
        text: "With You 😈",
        status: "dnd",
      },
      {
        type: ActivityType.Listening,
        text: "For /",
        status: "dnd",
      }
    ];
    const option = Math.floor(Math.random() * options.length);

    client.user.setPresence({
      activities: [
        {
          name: options[option].text,
          type: options[option].type,
        },
      ],
      status: options[option].status,
    });
  };
};
