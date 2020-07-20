/**
 * A base for commands.
 */
export type BaseCommand = {
    name: string
    alias?: string | string[]
}

/**
 * A repository for commands.
 */
export class CommandRepository<Command extends BaseCommand> {
    /**
     * The commands inside this array.
     */
    protected commands: Command[]

    /**
     * Initializes a new command repository.
     */
    public constructor(commands: Command[]) {
        this.commands = commands
    }

    /**
     * @returns the size of commands array.
     */
    public get size() {
        return this.commands.length
    }

    /**
     * Adds a command to the repository.
     */
    public add(command: Command): CommandRepository<Command> {
        this.commands.push(command)
        return this
    }

    /**
     * Finds a command by the name or aliases.
     */
    public query(name: string): Command | undefined {
        return this.commands.find((command: Command) => {
            return (
                command.name === name ||
                (Array.isArray(command.alias) ? command.alias.includes(name) : command.alias === name)
            )
        })
    }
}
