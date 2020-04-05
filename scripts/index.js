const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const create = require("./create")(prisma);
const confirm = require("./confirm")(prisma);
const argv = require("minimist")(process.argv.slice(2));

const { loops = 100, chars = 100 } = argv;
// around 100 characters of data
// repeated 100 times in for loop
// then confirmed via a count request
(async () => {
  await prisma.connect();
  await confirm();
  await create(chars, loops);
  await confirm();
  await prisma.disconnect();
})();
