const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const create = require("./create")(prisma);
const confirm = require("./confirm")(prisma);
const argv = require("minimist")(process.argv.slice(2));

module.exports = async () => {
  // around 100 characters of data
  // repeated 100 times in for loop
  // then confirmed via a count request
  const { loops = 100, chars = 100 } = argv;
  await prisma.connect();
  const before = await confirm();
  await create(chars, loops);
  const after = await confirm();
  await prisma.disconnect();
  return { before, after };
};
