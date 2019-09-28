const emojiRegex = require('emoji-regex');

const regex = emojiRegex();

export const extractEmoji = (text) => {
  let match;
  const emojies = [];
  while ((match = regex.exec(text))) {
    const emoji = match[0];
    emojies.push(emoji);
  }

  return emojies.join('');
};
