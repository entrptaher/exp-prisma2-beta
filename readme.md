A minimal experiment to try out the prisma2, the new prisma.

# Development
Create a minimal postgresql server using the docker. And install yarn locally (so it doesn't overlap with your current prisma). Then create database tables using the migrations.

```sh
docker-compose up -d
yarn
yarn prisma generate
yarn prisma migrate up --experimental --verbose
```

Run the code to create 100 users with 100 chars each (just x repeated 100 times). By default it's 100 loops and 100 chars. 

```sh
node scripts/index.js --loops 100 --chars 100
# or the following
yarn run create --loops 100 --chars 100
```

If you use yarn run command, you get to see the timing provided by yarn as a bonus :D .
```
➜  yarn run create --loops 100 --chars 1000
yarn run v1.22.0
$ node scripts/index.js --loops 100 --chars 1000
{ count: 110079 }
{ count: 110179 }
Done in 3.15s.
```

If you want to do some benchmark with it, use [hyperfine](https://github.com/sharkdp/hyperfine). Just be aware there is a bootup time when node script starts for each iteration.

```
➜  prisma-3 git:(master) ✗ hyperfine "yarn run create --loops 100 --chars 100"
Benchmark #1: yarn run create --loops 100 --chars 100
  Time (mean ± σ):     861.0 ms ±  15.7 ms    [User: 849.4 ms, System: 144.8 ms]
  Range (min … max):   843.4 ms … 901.7 ms    10 runs
 
➜  prisma-3 git:(master) ✗ hyperfine "yarn run create --loops 1000 --chars 100"
Benchmark #1: yarn run create --loops 1000 --chars 100
  Time (mean ± σ):      5.191 s ±  0.046 s    [User: 5.897 s, System: 0.937 s]
  Range (min … max):    5.135 s …  5.270 s    10 runs
```