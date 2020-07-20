/**
 * Represents a command request.
 */
export interface CommandRequest {
    /**
     * The name of the requested command.
     */
    name: string

    /**
     * The requested command arguments.
     */
    arguments: string[]
}

/**
 * A command request parser.
 */
export abstract class CommandRequestParser {
    /**
     * Parses a raw command request.
     */
    public abstract parse(request: string): CommandRequest | undefined
}

/**
 * The default command request parser for Kamado Router.
 */
export class KamadoRequestParser {
    /**
     * The prefix used to listen for command.
     */
    public prefix: string

    /**
     * Initializes a new command parser.
     */
    public constructor(prefix: string) {
        this.prefix = prefix
    }

    /**
     * Parses a command request.
     */
    public parse(request: string): CommandRequest {
        const commandArguments = request.slice(this.prefix.length).split(/\s+/g)

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const commandName = commandArguments.shift()!

        return {
            name: commandName,
            arguments: commandArguments
        }
    }
}
