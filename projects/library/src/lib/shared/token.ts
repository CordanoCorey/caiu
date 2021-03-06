export class Token {
    access_token = '';
    expiresIn = 0;
    expiresInDate: Date;

    get authenticated(): boolean {
        return !this.expired;
    }

    get expires_in(): number {
        return this.expiresIn;
    }

    set expires_in(value: number) {
        this.expiresIn = value;
        this.expiresInDate = new Date();
    }

    get expirationDate(): Date {
        const t = new Date(this.expiresInDate);
        t.setSeconds(t.getSeconds() + this.expiresIn);
        return t;
    }

    get expired(): boolean {
        const now = new Date();
        return this.access_token && this.expiresIn && this.expiresInDate ? now > this.expirationDate : true;
    }

    toString(): string {
        return this.expired ? '' : this.access_token;
    }

}
