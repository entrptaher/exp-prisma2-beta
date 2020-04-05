module.exports = (prisma) =>
  async function confirm() {
    const count = await prisma.user.count();
    console.log({ count });
    return count;
  };
