const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const create = require("./create")(prisma);
const confirm = require("./confirm")(prisma);
const argv = require("minimist")(process.argv.slice(2));
const { defaultLoops = 100, defaultChars = 100 } = argv;

module.exports = async (loops = defaultLoops, chars = defaultChars) => {
  // around 100 characters of data
  // repeated 100 times in for loop
  // then confirmed via a count request
  console.time("worker");
  console.time("connect");
  await prisma.connect();
  console.timeEnd("connect");

  console.time("before confirm");
  const before = await confirm();
  console.timeEnd("before confirm");

  console.time("create");
  await create(chars, loops);
  console.timeEnd("create");

  console.time("after confirm");
  const after = await confirm();
  console.timeEnd("after confirm");

  console.time("disconnect");
  await prisma.disconnect();
  console.timeEnd("disconnect");
  console.timeEnd("worker");
  return { before, after };
};
