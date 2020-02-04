const SIPrefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

export class NumberFormatter {

    static microToMoney(value: number): number {
        return Number(value) / 1000000;
    }

    static moneyToMicro(value: number): number {
        return Number(value) * 1000000;
    }

    static truncate(value: number, precision: number = 2): number {
        return Number(Number(value).toFixed(precision));
    }

    static shorten(number: number, precision: number = 2): string {
        // if you don't understand the following code, no worries, you fired !

        const tier = Math.log10(number) / 3 | 0;
        if (tier === 0) return `${number}`;

        const scale = Math.pow(10, tier * 3);
        return this.truncate(number / scale, precision) + SIPrefixes[tier];
    }
}
