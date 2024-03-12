class StringMatcher {
    private pattern: string;

    constructor(pattern: string) {
        this.pattern = pattern;
    }

    public KMP(text: string): number[] {
        const patternLength = this.pattern.length;
        const textLength = text.length;
        const lps = this.computeLPSArray();

        const matches: number[] = [];
        let i = 0;
        let j = 0;

        while (i < textLength) {
            if (this.pattern[j] === text[i]) {
                i++;
                j++;
            }

            if (j === patternLength) {
                matches.push(i - j);
                j = lps[j - 1];
            } else if (i < textLength && this.pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }

        return matches;
    }

    private computeLPSArray(): number[] {
        const patternLength = this.pattern.length;
        const lps: number[] = new Array(patternLength).fill(0);

        let len = 0;
        let i = 1;

        while (i < patternLength) {
            if (this.pattern[i] === this.pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = len;
                    i++;
                }
            }
        }

        return lps;
    }

    public bruteForce(text: string): number[] {
        const patternLength = this.pattern.length;
        const textLength = text.length;

        const matches: number[] = [];

        for (let i = 0; i <= textLength - patternLength; i++) {
            let j = 0;
            while (j < patternLength && text[i + j] === this.pattern[j]) {
                j++;
            }
            if (j === patternLength) {
                matches.push(i);
            }
        }

        return matches;
    }

    public boyerMoore(text: string): number[] {
        const patternLength = this.pattern.length;
        const textLength = text.length;

        const matches: number[] = [];

        const last = this.buildLastTable();

        let i = patternLength - 1;
        let j = patternLength - 1;

        while (i < textLength) {
            if (this.pattern[j] === text[i]) {
                if (j === 0) {
                    matches.push(i);
                    i += patternLength;
                    j = patternLength - 1;
                } else {
                    i--;
                    j--;
                }
            } else {
                i += patternLength - Math.min(j, 1 + last.get(text[i])! || 0);
                j = patternLength - 1;
            }
        }

        return matches;
    }

    private buildLastTable(): Map<string, number> {
        const last = new Map<string, number>();

        for (let i = 0; i < this.pattern.length; i++) {
            last.set(this.pattern[i], i);
        }

        return last;
    }

    public rabinKarp(text: string, prime: number): number[] {
        const patternLength = this.pattern.length;
        const textLength = text.length;

        const matches: number[] = [];

        const patternHash = this.hash(this.pattern, patternLength, prime);
        let textHash = this.hash(text, patternLength, prime);

        for (let i = 0; i <= textLength - patternLength; i++) {
            if (patternHash === textHash && this.areEqual(text, i, this.pattern, 0, patternLength)) {
                matches.push(i);
            }
            if (i < textLength - patternLength) {
                textHash = this.recalculateHash(text, i, i + patternLength, textHash, patternLength, prime);
            }
        }

        return matches;
    }

    private hash(str: string, length: number, prime: number): number {
        let hash = 0;

        for (let i = 0; i < length; i++) {
            hash += str.charCodeAt(i) * Math.pow(prime, i);
        }

        return hash;
    }

    private recalculateHash(str: string, oldIndex: number, newIndex: number, oldHash: number, patternLength: number, prime: number): number {
        let newHash = oldHash - str.charCodeAt(oldIndex);
        newHash /= prime;
        newHash += str.charCodeAt(newIndex) * Math.pow(prime, patternLength - 1);
        return newHash;
    }

    private areEqual(text: string, textStart: number, pattern: string, patternStart: number, length: number): boolean {
        for (let i = 0; i < length; i++) {
            if (pattern[patternStart + i] !== text[textStart + i]) {
                return false;
            }
        }
        return true;
    }
}

export default StringMatcher;