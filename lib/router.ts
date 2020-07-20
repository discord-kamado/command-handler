import { CommandRepository, BaseCommand } from './command-repository'
import { CommandRequestParser } from './request-parser'

/**
 * The command router for Kamado Framework.
 */
export class KamadoRouter<Command extends BaseCommand = BaseCommand> {
    /**
     * The command request parser.
     */
    public parser: CommandRequestParser

    /**
     * The command repository.
     */
    public commands: CommandRepository<Command>

    /**
     * Initializes a new command router.
     */
    public constructor(options: KamadoRouterOptions<Command>) {
        this.parser = options.parser
        this.commands = new CommandRepository<Command>(options.commands || [])
    }

    /**
     * Parses a string and queries for a matching command.
     */
    public query(query: string): KamadoRouterQueryResult<Command> | undefined {
        const request = this.parser.parse(query)
        if (!request) return undefined

        const command = this.commands.query(request.name)

        /* istanbul ignore else*/
        if (!command) {
            return {
                name: request.name,
                arguments: request.arguments
            }
        }

        return {
            name: request.name,
            arguments: request.arguments,
            command
        }
    }
}

/**
 * A query result from the Kamado Router `query` function.
 */
export interface KamadoRouterQueryResult<Command> {
    /**
     * The query command name.
     */
    name: string

    /**
     * The query arguments.
     */
    arguments: string[]

    /**
     * The command that matches with query.
     */
    command?: Command
}

/**
 * The options for Kamado Router.
 */
export interface KamadoRouterOptions<Command> {
    /**
     * The command parser that will be used by the Kamado Router instance.
     */
    parser: CommandRequestParser

    /**
     * The Router initial commands.
     */
    commands?: Command[]
}
