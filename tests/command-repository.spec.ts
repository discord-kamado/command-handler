import { BaseCommand, CommandRepository } from '../lib'

/**
 * Creates a command with a empty execute function.
 */
function createCommand(name: string, alias?: string | string[]): BaseCommand {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return { name, alias }
}

/**
 * Tests for the command repository.
 */
describe('Command Repository', () => {
    const sayCommand = createCommand('say')
    const helpCommand = createCommand('help', 'h')
    const playCommand = createCommand('play', ['p'])

    /**
     * The repository should be initialized with given command array.
     */
    it('should be initialized with given commands', () => {
        const commands = [sayCommand]
        const repository = new CommandRepository(commands)

        expect(repository['commands']).toStrictEqual(commands)
    })

    /**
     * `repository.size` should return the size of repository's array.
     */
    it('`repository.size` should have the same size of array', () => {
        const repository = new CommandRepository([sayCommand])

        expect(repository['commands']).toHaveLength(repository.size)
    })

    /**
     * `repository.add` should add commands to repository's array.
     */
    it('should accept new commands through `repository.add` function', () => {
        const commands = [sayCommand]
        const repository = new CommandRepository(commands)

        expect(repository.size).toBe(1)

        repository.add(playCommand)
        expect(repository.size).toBe(2)
    })

    /**
     * Tests for the `query` function.
     */
    describe('repository.query(<...>)', () => {
        const repository = new CommandRepository([sayCommand, playCommand, helpCommand])

        it('should find commands by the name', () => {
            const sayQueryResult = repository.query('say')
            expect(sayQueryResult).toBe(sayCommand)

            const playQueryResult = repository.query('play')
            expect(playQueryResult).toBe(playCommand)
        })

        it('should find commands by the alias', () => {
            const helpQueryResult = repository.query('h')
            expect(helpQueryResult).toBe(helpCommand)

            const playQueryResult = repository.query('p')
            expect(playQueryResult).toBe(playCommand)
        })

        it("should find commands that aren't listed in the repository", () => {
            const profileQueryResult = repository.query('profile')
            expect(profileQueryResult).toBe(undefined)

            const resumeQueryResult = repository.query('resume')
            expect(resumeQueryResult).toBe(undefined)
        })
    })
})
