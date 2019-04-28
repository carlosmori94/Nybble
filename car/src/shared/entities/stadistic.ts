export class Stadistic {
    private title: string;
    private stadistic: string;
    private isTemperature? : boolean;
    constructor(title: string, stadistic: string, isTemperature?: boolean) {
        this.title = title;
        this.stadistic = stadistic;
        this.isTemperature = isTemperature;
    }
}
