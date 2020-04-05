module.exports = (prisma) =>
  async function confirm() {
    const count = await prisma.user.count();
    return count;
  };
