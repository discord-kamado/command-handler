import { KamadoRouter, KamadoRequestParser } from '../lib'

/**
 * Tests for the Kamado Router.
 */
describe('Kamado Router', () => {
    const commands = [{ name: 'say', alias: 's' }]

    /**
     * When the router is not initialized with any commands, an empty array should be passed to CommandRepository initialization.
     */
    it('new KamadoRouter({ parser: <...> }) should initialize the command repository without commands', () => {
        const router = new KamadoRouter({
            parser: new KamadoRequestParser('+')
        })

        expect(router.commands['commands']).toStrictEqual([])
    })

    /**
     * The repository should receive commands from Kamado Router initialization.
     */
    it('new KamadoRouter({ parser: <...>, commands: <...> }) should initialize the command repository with given commands', () => {
        const router = new KamadoRouter({
            parser: new KamadoRequestParser('!'),
            commands
        })

        expect(router.commands['commands']).toStrictEqual(commands)
    })

    /**
     * Tests for the KamadoRouter `query` function.
     */
    describe('new KamadoRouter(prefix: =, commands: say).query(<...>)', () => {
        const router = new KamadoRouter({
            parser: new KamadoRequestParser('='),
            commands
        })

        it('should return `undefined` for `say` since does not start with a prefix', () => {
            const sayQueryResult = router.query('say')
            expect(sayQueryResult).toBe(undefined)
        })

        it('should return command request for `=help`, `command` should not be returned. (`help` is not inside the command repository)', () => {
            const sayQueryResult = router.query('=help')
            expect(sayQueryResult).toStrictEqual({
                name: 'help',
                arguments: []
            })
        })

        it('should return `command` and command request results for `=say`', () => {
            const sayQueryResult = router.query('=say')
            expect(sayQueryResult).toStrictEqual({
                name: 'say',
                arguments: [],
                command: commands[0]
            })
        })
    })
})
