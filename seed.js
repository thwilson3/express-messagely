// Filename: generateSampleData.js

const User = require("./models/user");
const Message = require("./models/message");

const users = [
  { username: "alice", password: "alice123", first_name: "Alice", last_name: "Smith", phone: "123-456-7890" },
  { username: "bob", password: "bob123", first_name: "Bob", last_name: "Johnson", phone: "234-567-8901" },
  { username: "charlie", password: "charlie123", first_name: "Charlie", last_name: "Brown", phone: "345-678-9012" },
];

const messages = [
  { from_username: "alice", to_username: "bob", body: "Hey Bob, how are you?" },
  { from_username: "bob", to_username: "alice", body: "Hey Alice, I'm doing great!" },
  { from_username: "alice", to_username: "charlie", body: "Hi Charlie, are you available for a call?" },
  { from_username: "charlie", to_username: "alice", body: "Hey Alice, I'm busy right now, can we talk later?" },
  { from_username: "bob", to_username: "charlie", body: "Charlie, did you finish the project?" },
  { from_username: "charlie", to_username: "bob", body: "Hi Bob, yes, I finished it yesterday." },
];

async function generateSampleData() {
  try {
    for (const user of users) {
      await User.register(user);
      console.log(`User ${user.username} registered.`);
    }

    for (const message of messages) {
      await Message.create(message);
      console.log(`Message from ${message.from_username} to ${message.to_username} created.`);
    }

    console.log("Sample data generated.");
  } catch (error) {
    console.error("Error generating sample data:", error);
  }
}

generateSampleData();
