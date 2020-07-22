/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { KamadoRequestParser, CommandRequest } from '../lib'

function test([prefix, query]: [string, string], expected: CommandRequest) {
    return () => {
        const parser = new KamadoRequestParser(prefix)
        const result = parser.parse(query)!

        expect(result).toStrictEqual(expected)
    }
}

/**
 * Tests for the request parser.
 */
describe('Request Parser <KamadoRequestParser>', () => {
    /**
     * The field `arguments` should always be an array.
     */
    it('arguments should always be present', () => {
        const parser = new KamadoRequestParser('?')
        const noArgumentsGiven = parser.parse('?profile')!

        expect(Array.isArray(noArgumentsGiven.arguments)).toBe(true)

        const argumentGiven = parser.parse('?profile 295604371465699329')!
        expect(Array.isArray(argumentGiven.arguments)).toBe(true)
    })

    /**
     * The request parser should not include the prefix into command request name.
     */
    it('prefix should be removed from command requests', () => {
        const parser = new KamadoRequestParser(':')

        const prefixRequest = parser.parse(':stop')!
        expect(prefixRequest.name.includes(':')).toBe(false)

        const doublePrefixRequest = parser.parse('::stop')!
        expect(doublePrefixRequest.name.lastIndexOf(':')).toBe(0)
    })

    /**
     * The request parser should not parse non-prefixed requests.
     */
    it('should not parse non-prefixed requests', () => {
        const parser = new KamadoRequestParser('+')
        const nonPrefixedRequest = parser.parse('hello')

        expect(nonPrefixedRequest).toBeUndefined()
    })

    /**
     * The request parser should be able to parse "!ping" as { name: 'ping', arguments: [] }
     */
    it(
        'can parse common requests <#1, !ping>',
        test(['!', '!ping'], {
            name: 'ping',
            arguments: []
        })
    )

    /**
     * The request parser should be able to parse ">play designed to end" as { name: 'play', arguments: ['designed', 'to', 'end'] }
     */
    it(
        'can parse common requests <#2, !play designed to end>',
        test(['>', '>play designed to end'], {
            name: 'play',
            arguments: ['designed', 'to', 'end']
        })
    )
})
