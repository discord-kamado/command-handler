### Kamado Router

A simple command router for [Kamado Framework](https://github.com/discord-kamado).

#### Usage

```ts
import { KamadoRouter, KamadoRequestParser } from '@kamado/router'
import { Client, Message } from 'discord.js'

type Command = {
    name: string
    alias?: string | string[]
    execute: (message: Message, args: string[]) => Promise<any>
}

const sayCommand: Command = {
    name: 'say', // <string> `name` is required.
    alias: 's', // <string[] | string> `alias` is optional.
    execute: async (message: Message, args: string[]) => {
        return message.reply(args.join(' '))
    }
}

const prefix = '?'
const kommander = new KamadoRouter<Command>({
    parser: new KamadoRequestParser(prefix), // A `parser` is required. If you don't want to create a custom parser, you can use `KamadoRequestParser` from `@kamado/router` library
    commands: [sayCommand]
})

const client = new Client()

client.on('message', async (message: Message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return
    const queryResult = kommander.query(message.content)

    //         `queryResult` === undefined: cannot parse given string
    // `queryResult.command` === undefined: command not found
    if (queryResult && queryResult.command) {
        return queryResult.command.execute(message, queryResult.arguments)
    } else {
        return message.channel.send('Command not found.')
    }
})

client.login(process.env.DISCORD_TOKEN)
```

#### License

[MIT](/LICENSE) &copy; Kamado Framework
