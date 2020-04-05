module.exports = (prisma) =>
  async function create(stringSize = 1, loopSize = 1) {
    const name = "x".repeat(1000 * stringSize);
    let promises = [];
    // NOTE: beware of the stack overflow due to handling 95kb * 10k times.
    for (let i = 0; i < loopSize; i++) {
      promises.push(
        prisma.user.create({
          data: {
            name,
          },
          select: {
            id: true,
            name: true,
          },
        })
      );
    }
    await Promise.all(promises);
  };
