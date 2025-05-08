To reproduce, follow the steps below.

1. Run `bun install`

Then run each of the commands in a seperate terminal window

1. Run `bun dev:db-up`
2. Run `bun dev:push`
3. Run `bun dev:zero-cache`
4. Run `bun dev:web`

Then navigate to `http://localhost:3000/` and click the update button. The push endpoint will print the value of `prev` which is undefined on the server but is valid on the client.
